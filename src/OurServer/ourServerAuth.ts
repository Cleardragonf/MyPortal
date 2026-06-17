import { createApiAuthAdapter } from '../auth/createApiAuthAdapter';
import { createAuthModule } from '../auth/createAuthModule';
import { createFakeAuthAdapter } from '../auth/fakeAuthAdapter';
import { USE_FAKE_AUTH } from '../auth/authMode';
import { OUR_SERVER_FAKE_USERS } from '../mocks/ourServerFakeUsers';

const adapter = USE_FAKE_AUTH
    ? createFakeAuthAdapter({
          users: OUR_SERVER_FAKE_USERS,
          storageKey: 'myportal.ourserver.fake-user-id',
      })
    : createApiAuthAdapter('/api/our-server/auth');

export const {
    AuthContext: OurServerAuthContext,
    AuthProvider: OurServerAuthProvider,
    useAuth: useOurServerAuth,
    withAuthProvider: withOurServerAuthProvider,
    withAuthentication: withOurServerAuthentication,
    withPermissions: withOurServerPermissions,
} = createAuthModule(adapter);
