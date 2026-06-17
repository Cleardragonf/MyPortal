export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthUser {
    id: string;
    displayName: string;
    permissions: string[];
}

export type AuthStatus =
    | 'checking'
    | 'authenticated'
    | 'anonymous';

export type PermissionMode = 'all' | 'any';

export interface AuthContextValue {
    user: AuthUser | null;
    status: AuthStatus;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
}

export interface AuthAdapter {
    getCurrentUser: () => Promise<AuthUser | null>;
    login: (credentials: LoginCredentials) => Promise<AuthUser>;
    logout: () => Promise<void>;
}
