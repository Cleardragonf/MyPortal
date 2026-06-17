import { USE_FAKE_AUTH } from '../auth/authMode';
import { SectionLoginPage } from '../components/auth/SectionLoginPage';
import { PERSONAL_PROJECTS_FAKE_USERS } from '../mocks/personalProjectsFakeUsers';
import { usePersonalProjectsAuth } from './personalProjectsAuth';

const demoCredentials = USE_FAKE_AUTH
    ? PERSONAL_PROJECTS_FAKE_USERS.map((user) => ({
          label: user.displayName,
          username: user.username,
          password: user.password,
      }))
    : [];

export function PersonalProjectsLoginPage() {
    return (
        <SectionLoginPage
            title="Personal Projects sign in"
            subtitle="Sign in to access your private C4 projects and tools."
            authenticatedHomePath="/C4"
            useAuth={usePersonalProjectsAuth}
            demoCredentials={demoCredentials}
        />
    );
}
