import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
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

export const PERSONAL_PROJECTS_NAVIGATION:
    readonly SectionNavigationItem[] = [
        {
            label: 'Dashboard',
            to: '/C4',
            icon: <DashboardOutlinedIcon />,
            end: true,
        },
        {
            label: 'Projects',
            icon: <FolderOutlinedIcon />,
            children: [
                {
                    label: 'All Projects',
                    to: '/C4/projects',
                },
                {
                    label: 'Project Management',
                    children: [
                        {
                            label: 'Create Project',
                            to: '/C4/projects/create',
                            requiredPermissions: [
                                'c4:create-projects',
                            ],
                        },
                        {
                            label: 'Archived Projects',
                            to: '/C4/projects/archived',
                        },
                    ],
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
