import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    SectionLayout,
    type SectionNavigationItem,
} from '../components/layout/SectionLayout';
import { useOurServerAuth } from './ourServerAuth';

const navigationItems: readonly SectionNavigationItem[] = [
    {
        label: 'Home',
        to: '/OurServer',
        icon: <HomeOutlinedIcon fontSize="small" />,
        end: true,
    },
    {
        label: 'Worlds',
        to: '/OurServer/worlds',
        icon: <DnsOutlinedIcon fontSize="small" />,
    },
    {
        label: 'Users',
        to: '/OurServer/users',
        icon: <GroupOutlinedIcon fontSize="small" />,
    },
];

export function OurServerLayout() {
    const { user, logout } = useOurServerAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate('/OurServer/login', { replace: true });
    }

    return (
        <SectionLayout
            title="OurServer"
            userDisplayName={user?.displayName ?? 'User'}
            navigationItems={navigationItems}
            onLogout={handleLogout}
        >
            <Outlet />
        </SectionLayout>
    );
}
