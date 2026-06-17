import { Outlet, useNavigate } from 'react-router-dom';
import {
    SectionLayout,
    type SectionNavigationItem,
} from '../components/layout/SectionLayout';
import { usePersonalProjectsAuth } from './personalProjectsAuth';
import AdminPanelSettingsOutlinedIcon from
    '@mui/icons-material/AdminPanelSettingsOutlined';
import DashboardOutlinedIcon from
    '@mui/icons-material/DashboardOutlined';
import PeopleOutlinedIcon from
    '@mui/icons-material/PeopleOutlined';
import SettingsOutlinedIcon from
    '@mui/icons-material/SettingsOutlined';
import { House, Pets, CurrencyExchange } from '@mui/icons-material';

export const PERSONAL_PROJECTS_NAVIGATION:
    readonly SectionNavigationItem[] = [
        {
            label: 'Dashboard',
            to: '/C4',
            icon: <DashboardOutlinedIcon />,
            end: true,
        },
        {
            label: 'Household',
            icon: <House/>,
            children: [
                {
                    label: 'Travel Log',
                    to: '/C4/Adventure',
                    icon: <Pets/>
                },
                {
                    label: 'Finances',
                    to: '/C4/Finances',
                    icon: <CurrencyExchange />
                },
            ],
        },
        {
            label: 'Administration',
            icon:
                <AdminPanelSettingsOutlinedIcon />,
            requiredPermissions: [
                'c4:admin',
            ],
            children: [
                {
                    label: 'Users',
                    to: '/C4/admin/users',
                    icon: <PeopleOutlinedIcon />,
                },
                {
                    label: 'Settings',
                    to: '/C4/admin/settings',
                    icon: <SettingsOutlinedIcon />,
                },
            ],
        },
    ];

export function PersonalProjectsLayout() {
    const { user, logout } = usePersonalProjectsAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/C4/login', { replace: true });
    }

    return (
        <SectionLayout
            title="Personal Projects"
            userDisplayName={user?.displayName ?? 'User'}
            navigationItems={PERSONAL_PROJECTS_NAVIGATION}
            onLogout={handleLogout}
        >
            <Outlet />
        </SectionLayout>
    );
}
