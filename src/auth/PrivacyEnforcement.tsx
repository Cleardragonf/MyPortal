import {
    useContext,
    type Context,
    type ReactNode,
} from 'react';

import {
    Navigate,
    Outlet,
    useLocation,
} from 'react-router-dom';

import type { AuthContextValue } from './authTypes';

interface PrivacyEnforcementProps {
    authContext: Context<AuthContextValue | undefined>;
    loginPath: string;

    requiredPermissions?: readonly string[];
    permissionMode?: 'all' | 'any';

    loadingElement?: ReactNode;
    deniedElement?: ReactNode;
}

export function PrivacyEnforcement({
    authContext,
    loginPath,
    requiredPermissions = [],
    permissionMode = 'all',
    loadingElement = <div>Checking your session...</div>,
    deniedElement = <div>You do not have permission to view this page.</div>,
}: PrivacyEnforcementProps) {
    const auth = useContext(authContext);
    const location = useLocation();

    if (!auth) {
        throw new Error(
            'PrivacyEnforcement must be rendered inside the correct AuthProvider.',
        );
    }

    if (auth.status === 'checking') {
        return <>{loadingElement}</>;
    }

    if (
        auth.status === 'anonymous' ||
        !auth.user
    ) {
        const requestedPath =
            location.pathname +
            location.search +
            location.hash;

        return (
            <Navigate
                to={loginPath}
                replace
                state={{ from: requestedPath }}
            />
        );
    }

    const userPermissions = auth.user.permissions;

    const hasRequiredPermissions =
        requiredPermissions.length === 0 ||
        (permissionMode === 'all'
            ? requiredPermissions.every((permission) =>
                  userPermissions.includes(permission),
              )
            : requiredPermissions.some((permission) =>
                  userPermissions.includes(permission),
              ));

    if (!hasRequiredPermissions) {
        return <>{deniedElement}</>;
    }

    return <Outlet />;
}