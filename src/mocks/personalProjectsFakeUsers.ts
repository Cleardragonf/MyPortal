import type { FakeUserRecord } from '../auth/fakeAuthAdapter';

export const PERSONAL_PROJECTS_FAKE_USERS: readonly FakeUserRecord[] = [
    {
        id: 'c4-admin',
        username: 'c4-admin',
        password: 'a',
        displayName: 'Personal Projects Administrator',
        permissions: [
            'c4:view-projects',
            'c4:create-projects',
            'c4:edit-projects',
            'c4:delete-projects',
        ],
    },
    {
        id: 'c4-reader',
        username: 'c4-reader',
        password: 'reader123',
        displayName: 'Personal Projects Reader',
        permissions: ['c4:view-projects'],
    },
];
