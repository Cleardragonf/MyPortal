import type {
    AuthAdapter,
    AuthUser,
    LoginCredentials,
} from './authTypes';

export interface FakeUserRecord extends AuthUser {
    username: string;
    password: string;
}

interface FakeAuthAdapterOptions {
    users: readonly FakeUserRecord[];
    storageKey: string;
}

function toAuthUser(user: FakeUserRecord): AuthUser {
    return {
        id: user.id,
        displayName: user.displayName,
        permissions: [...user.permissions],
    };
}

export function createFakeAuthAdapter({
    users,
    storageKey,
}: FakeAuthAdapterOptions): AuthAdapter {
    return {
        async getCurrentUser(): Promise<AuthUser | null> {
            const storedUserId = localStorage.getItem(storageKey);

            if (!storedUserId) {
                return null;
            }

            const user = users.find(
                (candidate) => candidate.id === storedUserId,
            );

            if (!user) {
                localStorage.removeItem(storageKey);
                return null;
            }

            return toAuthUser(user);
        },

        async login(
            credentials: LoginCredentials,
        ): Promise<AuthUser> {
            const normalizedUsername = credentials.username
                .trim()
                .toLowerCase();

            const user = users.find(
                (candidate) =>
                    candidate.username.toLowerCase() ===
                        normalizedUsername &&
                    candidate.password === credentials.password,
            );

            if (!user) {
                throw new Error('Invalid username or password.');
            }

            localStorage.setItem(storageKey, user.id);
            return toAuthUser(user);
        },

        async logout(): Promise<void> {
            localStorage.removeItem(storageKey);
        },
    };
}
