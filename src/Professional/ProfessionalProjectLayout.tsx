import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    SectionLayout,
    type SectionNavigationItem,
} from '../components/layout/SectionLayout';
import { useProfessionalProjectsAuth } from './professionalProjectsAuth';
import AdminPanelSettingsOutlinedIcon from
    '@mui/icons-material/AdminPanelSettingsOutlined';
import DashboardOutlinedIcon from
    '@mui/icons-material/DashboardOutlined';
import PeopleOutlinedIcon from
    '@mui/icons-material/PeopleOutlined';
import SettingsOutlinedIcon from
    '@mui/icons-material/SettingsOutlined';
import { Article } from '@mui/icons-material';
import SignalWifiStatusbar4BarRounded from '@mui/icons-material/SignalWifiStatusbar4BarRounded';

export const Professional_PROJECTS_NAVIGATION:
    readonly SectionNavigationItem[] = [
        {
            label: 'Dashboard',
            to: '/Professional',
            icon: <DashboardOutlinedIcon />,
            end: true,
        },
        {
            label: 'Resume',
            to: '/Professional/resume',
            icon: <Article/>,
            end: true,
        },
        {
            label: 'Projects',
            icon: <FolderOutlinedIcon />,
            children: [
                
            ],
        },
        {
            label: 'Status',
            icon: <SignalWifiStatusbar4BarRounded/>,
            to: '/Professional/StatusPage',
        },
        {
            label: 'Administration',
            icon:
                <AdminPanelSettingsOutlinedIcon />,
            requiredPermissions: [
                'Professional:admin',
            ],
            children: [
                {
                    label: 'Users',
                    to: '/Professional/admin/users',
                    icon: <PeopleOutlinedIcon />,
                },
                {
                    label: 'Settings',
                    to: '/Professional/admin/settings',
                    icon: <SettingsOutlinedIcon />,
                },
            ],
        },
    ];

export function ProfessionalProjectsLayout() {
    const { user, logout } = useProfessionalProjectsAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/', { replace: true });
    }

    return (
        <SectionLayout
            title="Professional Projects"
            userDisplayName={user?.displayName ?? 'User'}
            navigationItems={Professional_PROJECTS_NAVIGATION}
            onLogout={handleLogout}
            userPermissions={user?.permissions ?? []}
        >
            <Outlet />
        </SectionLayout>
    );
}
