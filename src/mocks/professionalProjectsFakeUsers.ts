import type { FakeUserRecord } from '../auth/fakeAuthAdapter';

export const PROFESSIONAL_PROJECTS_FAKE_USERS: readonly FakeUserRecord[] = [
    {
        id: 'prof-admin',
        username: 'prof-admin',
        password: 'test123',
        displayName: 'prof Administrator',
        permissions: [
            'Professional:view',
            'Professional:manage-worlds',
            'Professional:manage-users',
            'Professional:admin',
        ],
    },
    {
        id: 'prof-viewer',
        username: 'prof-viewer',
        password: 'viewer123',
        displayName: 'prof Viewer',
        permissions: ['Professional:view'],
    },
];
