import { Button, Stack } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import { SectionPage } from '../components/pages/SectionPage';
import { ProfessionalProjectsLayout } from './ProfessionalProjectLayout';
import { ResumePage } from './page/ResumePage';
import {
    withProfessionalProjectsAuthProvider,
} from './professionalProjectsAuth';
import { Page } from './page/ProfessionalPage';

function ProjectsHomePage() {
    return (
        <SectionPage
            title="Professional Projects home"
            description="Your private project dashboard is protected by the Professional authentication module."
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
                    to="/Professional/projects/example/edit"
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
            description="This page requires the Professional:edit-projects permission."
        />
    );
}

function NotFoundPage() {
    return (
        <SectionPage
            title="Page not found"
            description="That Professional Projects page does not exist."
        >
            <Stack direction="row">
                <Button component={Link} to="/Professional" variant="contained">
                    Return home
                </Button>
            </Stack>
        </SectionPage>
    );
}

function ProfessionalProjectsRouteTable() {
    return (
        <Routes>
            <Route element={<ProfessionalProjectsLayout />}>
                <Route index element={<ProjectsHomePage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="projects" element={<ProjectsListPage />} />
                <Route path="projects/:projectId/edit" element={<ProjectEditPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

const ProfessionalProjectsRoutesWithProvider =
    withProfessionalProjectsAuthProvider(ProfessionalProjectsRouteTable);

export function ProfessionalProjectsRoutes() {
    return <ProfessionalProjectsRoutesWithProvider />;
}
