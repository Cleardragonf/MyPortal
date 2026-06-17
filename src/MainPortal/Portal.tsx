import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const PortalCanvas = styled('main')(({ theme }) => ({
    minHeight: '100vh',
    padding: theme.spacing(8, 0),
    background: `linear-gradient(145deg, ${theme.palette.background.default}, ${theme.palette.primary.light}1f)`,
}));

const PortalCard = styled(Card)(({ theme }) => ({
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '20px',
    transition: theme.transitions.create(['transform', 'box-shadow']),
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[6],
    },
}));

interface PortalOption {
    title: string;
    description: string;
    path: string;
    icon: ReactNode;
}

const options: readonly PortalOption[] = [
    {
        title: 'Professional',
        description: 'Professional experience, résumé, and portfolio content.',
        path: '/Professional',
        icon: <WorkOutlineOutlinedIcon fontSize="large" />,
    },
    {
        title: 'OurServer',
        description: 'Private server tools protected by their own login.',
        path: '/OurServer',
        icon: <DnsOutlinedIcon fontSize="large" />,
    },
    {
        title: 'Personal Projects',
        description: 'Private C4 projects protected by separate credentials.',
        path: '/C4',
        icon: <CodeOutlinedIcon fontSize="large" />,
    },
];

export function PortalPage() {
    return (
        <PortalCanvas>
            <Container maxWidth="lg">
                <Stack spacing={5}>
                    <Box>
                        <Typography variant="h2" component="h1" align='center' sx={{ fontWeight: 900 }}>
                            My Portal
                        </Typography>
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            align='center'
                            sx={{ mt: 1}}
                        >
                            A reusable React portal with independent authentication
                            boundaries for private application sections.
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {options.map((option) => (
                            <Grid key={option.path} size={{ xs: 12, md: 4 }}>
                                <PortalCard elevation={2}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Stack spacing={2}>
                                            <Box color="primary.main">
                                                {option.icon}
                                            </Box>
                                            <Typography variant="h5" component="h2">
                                                {option.title}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                {option.description}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                    <CardActions sx={{ p: 2 }}>
                                        <Button
                                            component={Link}
                                            to={option.path}
                                            variant="contained"
                                            fullWidth
                                        >
                                            Open
                                        </Button>
                                    </CardActions>
                                </PortalCard>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Container>
        </PortalCanvas>
    );
}
