import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Alert,
    Box,
    CircularProgress,
    Paper,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FullPage = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    padding: theme.spacing(3),
    background: theme.palette.background.default,
}));

const FeedbackCard = styled(Paper)(({ theme }) => ({
    width: 'min(100%, 460px)',
    padding: theme.spacing(4),
    textAlign: 'center',
    borderRadius: '20px',
}));

export function AuthLoadingScreen({
    message = 'Checking your session…',
}: {
    message?: string;
}) {
    return (
        <FullPage>
            <FeedbackCard elevation={2}>
                <CircularProgress size={36} />
                <Typography sx={{ mt: 2 }}>{message}</Typography>
            </FeedbackCard>
        </FullPage>
    );
}

export function AccessDeniedScreen() {
    return (
        <FullPage>
            <FeedbackCard elevation={2}>
                <LockOutlinedIcon color="error" sx={{ fontSize: 44 }} />
                <Typography variant="h5" component="h1" sx={{ mt: 1 }}>
                    Access denied
                </Typography>
                <Alert severity="error" sx={{ mt: 2, textAlign: 'left' }}>
                    You are signed in, but your account does not have the
                    required permission for this page.
                </Alert>
            </FeedbackCard>
        </FullPage>
    );
}
