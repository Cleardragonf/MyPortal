import { Button, Stack } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import { SectionPage } from '../components/pages/SectionPage';
import { PersonalProjectsLayout } from './PersonalProjectsLayout';
import { PersonalProjectsLoginPage } from './PersonalProjectsLoginPage';
import {
    withPersonalProjectsAuthentication,
    withPersonalProjectsAuthProvider,
    withPersonalProjectsPermissions,
} from './personalProjectsAuth';
import { Page } from './page/c4ProjectPage';

function ProjectsHomePage() {
    return (
        <SectionPage
            title="Personal Projects home"
            description="Your private project dashboard is protected by the C4 authentication module."
        />
    );
}

function ProjectsListPage() {
    return (
        <SectionPage
            title="Projects"
            description="Browse projects available to the currently authenticated user."
        >
            <Page/>
            {/* <Stack direction="row">
                <Button
                    component={Link}
                    to="/C4/projects/example/edit"
                    variant="contained"
                >
                    Test protected edit page
                </Button>
            </Stack> */}
        </SectionPage>
    );
}

function ProjectEditPage() {
    return (
        <SectionPage
            title="Edit project"
            description="This page requires the c4:edit-projects permission."
        />
    );
}

function NotFoundPage() {
    return (
        <SectionPage
            title="Page not found"
            description="That Personal Projects page does not exist."
        >
            <Stack direction="row">
                <Button component={Link} to="/C4" variant="contained">
                    Return home
                </Button>
            </Stack>
        </SectionPage>
    );
}

const ProtectedPersonalProjectsLayout =
    withPersonalProjectsAuthentication(PersonalProjectsLayout, {
        loginPath: '/C4/login',
        loadingMessage: 'Checking your Personal Projects session…',
    });

const ProtectedProjectEditPage = withPersonalProjectsPermissions(
    ProjectEditPage,
    {
        loginPath: '/C4/login',
        requiredPermissions: ['c4:edit-projects'],
    },
);

function PersonalProjectsRouteTable() {
    return (
        <Routes>
            <Route
                path="login"
                element={<PersonalProjectsLoginPage />}
            />

            <Route element={<ProtectedPersonalProjectsLayout />}>
                <Route index element={<ProjectsHomePage />} />
                <Route path="projects" element={<ProjectsListPage />} />
                <Route
                    path="projects/:projectId/edit"
                    element={<ProtectedProjectEditPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

const PersonalProjectsRoutesWithProvider =
    withPersonalProjectsAuthProvider(PersonalProjectsRouteTable);

export function PersonalProjectsRoutes() {
    return <PersonalProjectsRoutesWithProvider />;
}
