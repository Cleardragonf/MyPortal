import './loadEnv.js';
import crypto from 'node:crypto';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authSections } from './authConfig.js';
import {
    createSession,
    deleteSession,
    getSessionUser,
    getUserByCredentials,
} from './db.js';
import { verifyPassword } from './passwords.js';

const app = express();
const port = Number(process.env.PORT ?? 3001);
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: clientOrigin,
        credentials: true,
    }),
);

function publicUser(user) {
    return {
        id: user.id,
        displayName: user.displayName,
        permissions: user.permissions,
    };
}

function sessionOptions() {
    return {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 8,
        path: '/',
    };
}

function registerAuthRoutes(sectionName, section) {
    const basePath = `/api/${sectionName}/auth`;

    app.get(`${basePath}/session`, async (req, res, next) => {
        const sessionId = req.cookies[section.cookieName];

        try {
            const user = sessionId
                ? await getSessionUser(sessionId, sectionName)
                : null;

            if (!user) {
                return res.status(401).json({ message: 'Not authenticated.' });
            }

            return res.json(publicUser(user));
        } catch (error) {
            return next(error);
        }
    });

    app.post(`${basePath}/login`, async (req, res, next) => {
        const { username, password } = req.body ?? {};

        try {
            const user =
                typeof username === 'string'
                    ? await getUserByCredentials(sectionName, username)
                    : null;

            if (
                !user ||
                typeof password !== 'string' ||
                !verifyPassword(password, user.passwordHash, user.passwordSalt)
            ) {
                return res
                    .status(401)
                    .json({ message: 'Invalid username or password.' });
            }

            const sessionId = crypto.randomUUID();
            await createSession(sessionId, sectionName, user.id);

            return res
                .cookie(section.cookieName, sessionId, sessionOptions())
                .json(publicUser(user));
        } catch (error) {
            return next(error);
        }
    });

    app.post(`${basePath}/logout`, async (req, res, next) => {
        const sessionId = req.cookies[section.cookieName];

        try {
            if (sessionId) {
                await deleteSession(sessionId);
            }

            return res
                .clearCookie(section.cookieName, sessionOptions())
                .status(204)
                .send();
        } catch (error) {
            return next(error);
        }
    });
}

Object.entries(authSections).forEach(([sectionName, section]) => {
    registerAuthRoutes(sectionName, section);
});

app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});

app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
});

app.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
});
