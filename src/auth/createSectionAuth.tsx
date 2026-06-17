import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type PropsWithChildren,
} from 'react';

import type {
    AuthAdapter,
    AuthContextValue,
    AuthStatus,
    AuthUser,
    LoginCredentials,
} from './authTypes';

export function createSectionAuth(adapter: AuthAdapter) {
    const AuthContext = createContext<AuthContextValue | undefined>(
        undefined,
    );

    function AuthProvider({ children }: PropsWithChildren) {
        const [user, setUser] = useState<AuthUser | null>(null);
        const [status, setStatus] =
            useState<AuthStatus>('checking');

        useEffect(() => {
            let active = true;

            async function restoreSession() {
                try {
                    const currentUser =
                        await adapter.getCurrentUser();

                    if (!active) {
                        return;
                    }

                    setUser(currentUser);
                    setStatus(
                        currentUser
                            ? 'authenticated'
                            : 'anonymous',
                    );
                } catch (error) {
                    console.error(
                        'Unable to restore authentication session.',
                        error,
                    );

                    if (active) {
                        setUser(null);
                        setStatus('anonymous');
                    }
                }
            }

            void restoreSession();

            return () => {
                active = false;
            };
        }, []);

        async function login(
            credentials: LoginCredentials,
        ): Promise<void> {
            const authenticatedUser =
                await adapter.login(credentials);

            setUser(authenticatedUser);
            setStatus('authenticated');
        }

        async function logout(): Promise<void> {
            try {
                await adapter.logout();
            } finally {
                setUser(null);
                setStatus('anonymous');
            }
        }

        const value = useMemo<AuthContextValue>(
            () => ({
                user,
                status,
                login,
                logout,
            }),
            [user, status],
        );

        return (
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        );
    }

    function useSectionAuth(): AuthContextValue {
        const context = useContext(AuthContext);

        if (!context) {
            throw new Error(
                'useSectionAuth must be used inside its AuthProvider.',
            );
        }

        return context;
    }

    return {
        AuthContext,
        AuthProvider,
        useSectionAuth,
    };
}