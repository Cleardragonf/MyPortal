import { SectionLoginPage } from '../components/auth/SectionLoginPage';
import { USE_FAKE_AUTH } from '../auth/authMode';
import { OUR_SERVER_FAKE_USERS } from '../mocks/ourServerFakeUsers';
import { useOurServerAuth } from './ourServerAuth';

const demoCredentials = USE_FAKE_AUTH
    ? OUR_SERVER_FAKE_USERS.map((user) => ({
          label: user.displayName,
          username: user.username,
          password: user.password,
      }))
    : [];

export function OurServerLoginPage() {
    return (
        <SectionLoginPage
            title="OurServer sign in"
            subtitle="Sign in to manage server resources and protected tools."
            authenticatedHomePath="/OurServer"
            useAuth={useOurServerAuth}
            demoCredentials={demoCredentials}
        />
    );
}
