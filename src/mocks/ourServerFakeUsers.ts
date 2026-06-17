import type { FakeUserRecord } from '../auth/fakeAuthAdapter';

export const OUR_SERVER_FAKE_USERS: readonly FakeUserRecord[] = [
    {
        id: 'ourserver-admin',
        username: 'server-admin',
        password: 'test123',
        displayName: 'OurServer Administrator',
        permissions: [
            'ourserver:view',
            'ourserver:manage-worlds',
            'ourserver:manage-users',
        ],
    },
    {
        id: 'ourserver-viewer',
        username: 'server-viewer',
        password: 'viewer123',
        displayName: 'OurServer Viewer',
        permissions: ['ourserver:view'],
    },
];
