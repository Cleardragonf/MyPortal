import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ComponentType,
    type PropsWithChildren,
} from 'react';
import {
    Navigate,
    useLocation,
} from 'react-router-dom';
import {
    AccessDeniedScreen,
    AuthLoadingScreen,
} from '../components/auth/AuthFeedback';
import type {
    AuthAdapter,
    AuthContextValue,
    AuthStatus,
    AuthUser,
    LoginCredentials,
    PermissionMode,
} from './authTypes';

interface AuthenticationOptions {
    loginPath: string;
    loadingMessage?: string;
}

interface PermissionOptions extends AuthenticationOptions {
    requiredPermissions: readonly string[];
    permissionMode?: PermissionMode;
}

function componentName<P extends object>(
    component: ComponentType<P>,
): string {
    return component.displayName ?? component.name ?? 'Component';
}

export function createAuthModule(adapter: AuthAdapter) {
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

        const login = useCallback(
            async (credentials: LoginCredentials): Promise<void> => {
                const authenticatedUser =
                    await adapter.login(credentials);

                setUser(authenticatedUser);
                setStatus('authenticated');
            },
            [],
        );

        const logout = useCallback(async (): Promise<void> => {
            try {
                await adapter.logout();
            } finally {
                setUser(null);
                setStatus('anonymous');
            }
        }, []);

        const value = useMemo<AuthContextValue>(
            () => ({
                user,
                status,
                login,
                logout,
            }),
            [login, logout, status, user],
        );

        return (
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        );
    }

    function useAuth(): AuthContextValue {
        const context = useContext(AuthContext);

        if (!context) {
            throw new Error(
                'This authentication hook must be used inside its provider.',
            );
        }

        return context;
    }

    function withAuthProvider<P extends object>(
        WrappedComponent: ComponentType<P>,
    ) {
        function WithAuthProvider(props: P) {
            return (
                <AuthProvider>
                    <WrappedComponent {...props} />
                </AuthProvider>
            );
        }

        WithAuthProvider.displayName =
            `withAuthProvider(${componentName(WrappedComponent)})`;

        return WithAuthProvider;
    }

    function withAuthentication<P extends object>(
        WrappedComponent: ComponentType<P>,
        options: AuthenticationOptions,
    ) {
        function WithAuthentication(props: P) {
            const auth = useAuth();
            const location = useLocation();

            if (auth.status === 'checking') {
                return (
                    <AuthLoadingScreen
                        message={options.loadingMessage}
                    />
                );
            }

            if (auth.status !== 'authenticated' || !auth.user) {
                const requestedPath =
                    location.pathname +
                    location.search +
                    location.hash;

                return (
                    <Navigate
                        to={options.loginPath}
                        replace
                        state={{ from: requestedPath }}
                    />
                );
            }

            return <WrappedComponent {...props} />;
        }

        WithAuthentication.displayName =
            `withAuthentication(${componentName(WrappedComponent)})`;

        return WithAuthentication;
    }

    function withPermissions<P extends object>(
        WrappedComponent: ComponentType<P>,
        options: PermissionOptions,
    ) {
        function WithPermissions(props: P) {
            const auth = useAuth();
            const location = useLocation();

            if (auth.status === 'checking') {
                return (
                    <AuthLoadingScreen
                        message={options.loadingMessage}
                    />
                );
            }

            if (auth.status !== 'authenticated' || !auth.user) {
                const requestedPath =
                    location.pathname +
                    location.search +
                    location.hash;

                return (
                    <Navigate
                        to={options.loginPath}
                        replace
                        state={{ from: requestedPath }}
                    />
                );
            }

            const permissionMode =
                options.permissionMode ?? 'all';

            const isAllowed =
                options.requiredPermissions.length === 0 ||
                (permissionMode === 'all'
                    ? options.requiredPermissions.every((permission) =>
                          auth.user?.permissions.includes(permission),
                      )
                    : options.requiredPermissions.some((permission) =>
                          auth.user?.permissions.includes(permission),
                      ));

            if (!isAllowed) {
                return <AccessDeniedScreen />;
            }

            return <WrappedComponent {...props} />;
        }

        WithPermissions.displayName =
            `withPermissions(${componentName(WrappedComponent)})`;

        return WithPermissions;
    }

    return {
        AuthContext,
        AuthProvider,
        useAuth,
        withAuthProvider,
        withAuthentication,
        withPermissions,
    };
}
