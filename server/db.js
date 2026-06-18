import pg from 'pg';
import { postgresConfig } from './postgresConfig.js';

const { Pool } = pg;

export const pool = new Pool(postgresConfig());

function mapUser(row, permissions) {
    return {
        id: row.id,
        username: row.username,
        passwordHash: row.password_hash,
        passwordSalt: row.password_salt,
        displayName: row.display_name,
        permissions,
    };
}

async function getPermissions(userId) {
    const result = await pool.query(
        `
        SELECT permission
        FROM user_permissions
        WHERE user_id = $1
        ORDER BY permission
        `,
        [userId],
    );

    return result.rows.map((row) => row.permission);
}

export async function getUserByCredentials(sectionName, username) {
    const result = await pool.query(
        `
        SELECT
            users.id,
            users.username,
            users.password_hash,
            users.password_salt,
            users.display_name
        FROM users
        INNER JOIN auth_sections
            ON auth_sections.id = users.section_id
        WHERE auth_sections.name = $1
            AND users.username = $2
        `,
        [sectionName, username],
    );
    const user = result.rows[0];

    if (!user) {
        return null;
    }

    return mapUser(user, await getPermissions(user.id));
}

export async function createSession(sessionId, sectionName, userId) {
    await pool.query(
        `
        INSERT INTO auth_sessions (
            id,
            section_id,
            user_id,
            expires_at
        )
        SELECT
            $1,
            auth_sections.id,
            $3,
            NOW() + INTERVAL '8 hours'
        FROM auth_sections
        WHERE auth_sections.name = $2
        `,
        [sessionId, sectionName, userId],
    );
}

export async function getSessionUser(sessionId, sectionName) {
    const result = await pool.query(
        `
        SELECT
            users.id,
            users.username,
            users.password_hash,
            users.password_salt,
            users.display_name
        FROM auth_sessions
        INNER JOIN auth_sections
            ON auth_sections.id = auth_sessions.section_id
        INNER JOIN users
            ON users.id = auth_sessions.user_id
        WHERE auth_sessions.id = $1
            AND auth_sections.name = $2
            AND auth_sessions.expires_at > NOW()
        `,
        [sessionId, sectionName],
    );
    const user = result.rows[0];

    if (!user) {
        return null;
    }

    return mapUser(user, await getPermissions(user.id));
}

export async function deleteSession(sessionId) {
    await pool.query(
        `
        DELETE FROM auth_sessions
        WHERE id = $1
        `,
        [sessionId],
    );
}
