import { Button, Stack } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import { SectionPage } from '../components/pages/SectionPage';
import { OurServerLayout } from './OurServerLayout';
import { OurServerLoginPage } from './OurServerLoginPage';
import {
    withOurServerAuthentication,
    withOurServerAuthProvider,
    withOurServerPermissions,
} from './ourServerAuth';

function ServerHomePage() {
    return (
        <SectionPage
            title="Server home"
            description="View the private server dashboard and protected tools."
        />
    );
}

function WorldsPage() {
    return (
        <SectionPage
            title="Minecraft worlds"
            description="Manage world information and server resources."
        />
    );
}

function UserManagementPage() {
    return (
        <SectionPage
            title="User management"
            description="This page requires the ourserver:manage-users permission."
        />
    );
}

function NotFoundPage() {
    return (
        <SectionPage
            title="Page not found"
            description="That OurServer page does not exist."
        >
            <Stack direction="row">
                <Button component={Link} to="/OurServer" variant="contained">
                    Return home
                </Button>
            </Stack>
        </SectionPage>
    );
}

const ProtectedOurServerLayout = withOurServerAuthentication(
    OurServerLayout,
    {
        loginPath: '/OurServer/login',
        loadingMessage: 'Checking your OurServer session…',
    },
);

const ProtectedUserManagementPage = withOurServerPermissions(
    UserManagementPage,
    {
        loginPath: '/OurServer/login',
        requiredPermissions: ['ourserver:manage-users'],
    },
);

function OurServerRouteTable() {
    return (
        <Routes>
            <Route path="login" element={<OurServerLoginPage />} />

            <Route element={<ProtectedOurServerLayout />}>
                <Route index element={<ServerHomePage />} />
                <Route path="worlds" element={<WorldsPage />} />
                <Route
                    path="users"
                    element={<ProtectedUserManagementPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

const OurServerRoutesWithProvider =
    withOurServerAuthProvider(OurServerRouteTable);

export function OurServerRoutes() {
    return <OurServerRoutesWithProvider />;
}
