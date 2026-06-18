import '../loadEnv.js';
import pg from 'pg';
import { authSections } from '../authConfig.js';
import { hashPassword } from '../passwords.js';
import {
    describePostgresConfig,
    maintenanceDatabase,
    postgresConfig,
    targetDatabase,
} from '../postgresConfig.js';
import { seedUsers } from '../seedUsers.js';

const { Client } = pg;

function quoteIdentifier(identifier) {
    return `"${identifier.replaceAll('"', '""')}"`;
}

async function ensureDatabase() {
    const client = new Client(postgresConfig(maintenanceDatabase));
    await client.connect();

    try {
        const result = await client.query(
            `
            SELECT 1
            FROM pg_database
            WHERE datname = $1
            `,
            [targetDatabase],
        );

        if (result.rowCount === 0) {
            await client.query(`CREATE DATABASE ${quoteIdentifier(targetDatabase)}`);
            console.log(`Created database ${targetDatabase}`);
        }
    } finally {
        await client.end();
    }
}

async function ensureSchema() {
    const client = new Client(postgresConfig(targetDatabase));
    await client.connect();

    try {
        await client.query('BEGIN');

        await client.query(`
            CREATE TABLE IF NOT EXISTS auth_sections (
                id BIGSERIAL PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                cookie_name TEXT NOT NULL UNIQUE,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                section_id BIGINT NOT NULL REFERENCES auth_sections(id) ON DELETE CASCADE,
                username TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                password_salt TEXT NOT NULL,
                display_name TEXT NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                UNIQUE (section_id, username)
            );

            CREATE TABLE IF NOT EXISTS user_permissions (
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                permission TEXT NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                PRIMARY KEY (user_id, permission)
            );

            CREATE TABLE IF NOT EXISTS auth_sessions (
                id TEXT PRIMARY KEY,
                section_id BIGINT NOT NULL REFERENCES auth_sections(id) ON DELETE CASCADE,
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                expires_at TIMESTAMPTZ NOT NULL
            );

            CREATE INDEX IF NOT EXISTS idx_auth_sessions_lookup
                ON auth_sessions (id, section_id, expires_at);
        `);

        for (const [sectionName, section] of Object.entries(authSections)) {
            await client.query(
                `
                INSERT INTO auth_sections (name, cookie_name, updated_at)
                VALUES ($1, $2, NOW())
                ON CONFLICT (name) DO UPDATE SET
                    cookie_name = EXCLUDED.cookie_name,
                    updated_at = NOW()
                `,
                [sectionName, section.cookieName],
            );
        }

        for (const user of seedUsers) {
            const sectionResult = await client.query(
                `
                SELECT id
                FROM auth_sections
                WHERE name = $1
                `,
                [user.sectionName],
            );
            const section = sectionResult.rows[0];

            if (!section) {
                throw new Error(`Missing auth section: ${user.sectionName}`);
            }

            const { hash, salt } = hashPassword(user.password);

            await client.query(
                `
                INSERT INTO users (
                    id,
                    section_id,
                    username,
                    password_hash,
                    password_salt,
                    display_name,
                    updated_at
                )
                VALUES ($1, $2, $3, $4, $5, $6, NOW())
                ON CONFLICT (id) DO UPDATE SET
                    section_id = EXCLUDED.section_id,
                    username = EXCLUDED.username,
                    password_hash = EXCLUDED.password_hash,
                    password_salt = EXCLUDED.password_salt,
                    display_name = EXCLUDED.display_name,
                    updated_at = NOW()
                `,
                [
                    user.id,
                    section.id,
                    user.username,
                    hash,
                    salt,
                    user.displayName,
                ],
            );

            await client.query(
                `
                DELETE FROM user_permissions
                WHERE user_id = $1
                `,
                [user.id],
            );

            for (const permission of user.permissions) {
                await client.query(
                    `
                    INSERT INTO user_permissions (user_id, permission)
                    VALUES ($1, $2)
                    ON CONFLICT (user_id, permission) DO NOTHING
                    `,
                    [user.id, permission],
                );
            }
        }

        await client.query(`
            DELETE FROM auth_sessions
            WHERE expires_at <= NOW()
        `);

        await client.query('COMMIT');
        console.log(`Database ready: ${targetDatabase}`);
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        await client.end();
    }
}

await ensureDatabase();
await ensureSchema();
console.log('Postgres connection:', describePostgresConfig(targetDatabase));
