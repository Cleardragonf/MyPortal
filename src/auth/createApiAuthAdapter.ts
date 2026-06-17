import type {
    AuthAdapter,
    AuthUser,
    LoginCredentials,
} from './authTypes';

interface ErrorResponseBody {
    message?: string;
}

async function readError(response: Response): Promise<string> {
    const contentType = response.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
        const body = (await response.json()) as ErrorResponseBody;
        return body.message ?? `Request failed: ${response.status}`;
    }

    return `Request failed: ${response.status} ${response.statusText}`;
}

async function readUser(response: Response): Promise<AuthUser> {
    const contentType = response.headers.get('content-type') ?? '';

    if (!contentType.includes('application/json')) {
        throw new Error(
            'The authentication service returned a non-JSON response.',
        );
    }

    return response.json() as Promise<AuthUser>;
}

export function createApiAuthAdapter(
    baseUrl: string,
): AuthAdapter {
    return {
        async getCurrentUser(): Promise<AuthUser | null> {
            const response = await fetch(`${baseUrl}/session`, {
                credentials: 'include',
            });

            if (response.status === 401) {
                return null;
            }

            if (!response.ok) {
                throw new Error(await readError(response));
            }

            return readUser(response);
        },

        async login(
            credentials: LoginCredentials,
        ): Promise<AuthUser> {
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error(await readError(response));
            }

            return readUser(response);
        },

        async logout(): Promise<void> {
            const response = await fetch(`${baseUrl}/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(await readError(response));
            }
        },
    };
}
