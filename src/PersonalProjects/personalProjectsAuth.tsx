import { createApiAuthAdapter } from '../auth/createApiAuthAdapter';
import { createAuthModule } from '../auth/createAuthModule';
import { createFakeAuthAdapter } from '../auth/fakeAuthAdapter';
import { USE_FAKE_AUTH } from '../auth/authMode';
import { PERSONAL_PROJECTS_FAKE_USERS } from '../mocks/personalProjectsFakeUsers';

const adapter = USE_FAKE_AUTH
    ? createFakeAuthAdapter({
          users: PERSONAL_PROJECTS_FAKE_USERS,
          storageKey: 'myportal.c4.fake-user-id',
      })
    : createApiAuthAdapter('/api/personal-projects/auth');

export const {
    AuthContext: PersonalProjectsAuthContext,
    AuthProvider: PersonalProjectsAuthProvider,
    useAuth: usePersonalProjectsAuth,
    withAuthProvider: withPersonalProjectsAuthProvider,
    withAuthentication: withPersonalProjectsAuthentication,
    withPermissions: withPersonalProjectsPermissions,
} = createAuthModule(adapter);
