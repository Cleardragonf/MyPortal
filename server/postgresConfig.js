const defaultDatabase = 'myportal';
const defaultHost = 'localhost';
const defaultPort = 5432;
const defaultUser = 'postgres';

function requiredStringEnv(name) {
    const value = process.env[name];

    if (typeof value !== 'string' || value.length === 0) {
        throw new Error(
            `${name} must be set to your Postgres password before starting the API.`,
        );
    }

    return value;
}

export function postgresConfig(database = process.env.PGDATABASE ?? defaultDatabase) {
    return {
        host: process.env.PGHOST ?? defaultHost,
        port: Number(process.env.PGPORT ?? defaultPort),
        user: process.env.PGUSER ?? defaultUser,
        password: requiredStringEnv('PGPASSWORD'),
        database,
    };
}

export function describePostgresConfig(
    database = process.env.PGDATABASE ?? defaultDatabase,
) {
    const config = postgresConfig(database);

    return {
        host: config.host,
        port: config.port,
        user: config.user,
        database: config.database,
    };
}

export const targetDatabase = process.env.PGDATABASE ?? defaultDatabase;
export const maintenanceDatabase =
    process.env.PGMAINTENANCE_DATABASE ?? 'postgres';
