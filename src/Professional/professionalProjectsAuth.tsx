import { createApiAuthAdapter } from '../auth/createApiAuthAdapter';
import { createAuthModule } from '../auth/createAuthModule';
import { createFakeAuthAdapter } from '../auth/fakeAuthAdapter';
import { USE_FAKE_AUTH } from '../auth/authMode';
import { PROFESSIONAL_PROJECTS_FAKE_USERS } from '../mocks/professionalProjectsFakeUsers';

const adapter = USE_FAKE_AUTH
    ? createFakeAuthAdapter({
          users: PROFESSIONAL_PROJECTS_FAKE_USERS,
          storageKey: 'myportal.Professional.fake-user-id',
      })
    : createApiAuthAdapter('/api/Professional-projects/auth');

export const {
    AuthContext: ProfessionalProjectsAuthContext,
    AuthProvider: ProfessionalProjectsAuthProvider,
    useAuth: useProfessionalProjectsAuth,
    withAuthProvider: withProfessionalProjectsAuthProvider,
    withAuthentication: withProfessionalProjectsAuthentication,
    withPermissions: withProfessionalProjectsPermissions,
} = createAuthModule(adapter);
