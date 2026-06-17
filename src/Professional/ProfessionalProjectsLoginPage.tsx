import { USE_FAKE_AUTH } from '../auth/authMode';
import { SectionLoginPage } from '../components/auth/SectionLoginPage';
import { PROFESSIONAL_PROJECTS_FAKE_USERS } from '../mocks/professionalProjectsFakeUsers';
import { useProfessionalProjectsAuth } from './professionalProjectsAuth';

const demoCredentials = USE_FAKE_AUTH
    ? PROFESSIONAL_PROJECTS_FAKE_USERS.map((user) => ({
          label: user.displayName,
          username: user.username,
          password: user.password,
      }))
    : [];

export function ProfessionalProjectsLoginPage() {
    return (
        <SectionLoginPage
            title="Professional Projects Sign In"
            titleAlignment='center'
            subtitle="Sign in to access your private Professional projects and tools."
            authenticatedHomePath="/Professional"
            useAuth={useProfessionalProjectsAuth}
            demoCredentials={demoCredentials}
        />
    );
}
