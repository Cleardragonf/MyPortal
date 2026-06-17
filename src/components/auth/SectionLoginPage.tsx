import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import {
    Alert,
    Avatar,
    Button,
    Chip,
    CircularProgress,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    useState,
    type FormEvent,
} from 'react';
import {
    Navigate,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import type { AuthContextValue } from '../../auth/authTypes';
import { AuthLoadingScreen } from './AuthFeedback';

interface LoginLocationState {
    from?: string;
}

interface DemoCredential {
    label: string;
    username: string;
    password: string;
}

type TitleAlignment =
    | 'left'
    | 'center'
    | 'right';

export interface SectionLoginPageProps {
    title: string;
    subtitle: string;
    authenticatedHomePath: string;
    useAuth: () => AuthContextValue;
    demoCredentials?: readonly DemoCredential[];

    /*
     * Controls the title, subtitle, and home icon alignment.
     */
    titleAlignment?: TitleAlignment;

    /*
     * Allows styled(SectionLoginPage) to attach its generated class.
     */
    className?: string;
}

interface LoginHeaderProps {
    titleAlignment: TitleAlignment;
}

const LoginCanvas = styled('main')(({ theme }) => ({
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    padding: theme.spacing(3),
    background: `linear-gradient(
        145deg,
        ${theme.palette.background.default} 20%,
        ${theme.palette.primary.light}22 100%
    )`,
}));

const LoginCard = styled(Paper)(({ theme }) => ({
    width: 'min(100%, 460px)',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2.5),
}));

const LoginHeader = styled(Stack, {
    shouldForwardProp: (property) =>
        property !== 'titleAlignment',
})<LoginHeaderProps>(({ titleAlignment }) => ({
    alignItems:
        titleAlignment === 'left'
            ? 'flex-start'
            : titleAlignment === 'right'
              ? 'flex-end'
              : 'center',

    textAlign: titleAlignment,
}));

const HomeButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(0.5),
}));

const LoginAvatar = styled(Avatar)(({ theme }) => ({
    width: 52,
    height: 52,
    backgroundColor: theme.palette.primary.main,
}));

const LoginTitle = styled('h1')(({ theme }) => ({
    ...theme.typography.h4,
    width: '100%',
    margin: 0,
    fontWeight: 700,
}));

const LoginSubtitle = styled(Typography)({
    width: '100%',
});

const LoginForm = styled('form')({
    width: '100%',
});

const DemoCredentials = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
}));

export function SectionLoginPage({
    title,
    subtitle,
    authenticatedHomePath,
    useAuth,
    demoCredentials = [],
    titleAlignment = 'center',
    className,
}: SectionLoginPageProps) {
    const { login, status } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] =
        useState('');

    const [password, setPassword] =
        useState('');

    const [error, setError] =
        useState('');

    const [submitting, setSubmitting] =
        useState(false);

    if (status === 'checking') {
        return <AuthLoadingScreen />;
    }

    if (status === 'authenticated') {
        return (
            <Navigate
                to={authenticatedHomePath}
                replace
            />
        );
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await login({
                username,
                password,
            });

            const state =
                location.state as
                    | LoginLocationState
                    | null;

            navigate(
                state?.from ??
                    authenticatedHomePath,
                {
                    replace: true,
                },
            );
        } catch (loginError) {
            setError(
                loginError instanceof Error
                    ? loginError.message
                    : 'Login failed.',
            );
        } finally {
            setSubmitting(false);
        }
    }

    function selectDemoCredential(
        credential: DemoCredential,
    ) {
        setUsername(credential.username);
        setPassword(credential.password);
        setError('');
    }

    return (
        <LoginCanvas className={className}>
            <LoginCard elevation={5}>
                <Stack spacing={3}>
                    <LoginHeader
                        spacing={1.5}
                        titleAlignment={
                            titleAlignment
                        }
                    >
                        <HomeButton
                            onClick={() =>
                                navigate('/')
                            }
                            aria-label="Back to Portal"
                        >
                            <LoginAvatar>
                                <HomeOutlinedIcon />
                            </LoginAvatar>
                        </HomeButton>

                        <LoginTitle>
                            {title}
                        </LoginTitle>

                        <LoginSubtitle
                            color="text.secondary"
                        >
                            {subtitle}
                        </LoginSubtitle>
                    </LoginHeader>

                    {error && (
                        <Alert
                            severity="error"
                            role="alert"
                        >
                            {error}
                        </Alert>
                    )}

                    <LoginForm
                        onSubmit={handleSubmit}
                    >
                        <Stack spacing={2.5}>
                            <TextField
                                label="Username"
                                value={username}
                                onChange={(event) =>
                                    setUsername(
                                        event.target
                                            .value,
                                    )
                                }
                                autoComplete="username"
                                required
                                fullWidth
                            />

                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target
                                            .value,
                                    )
                                }
                                autoComplete="current-password"
                                required
                                fullWidth
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={submitting}
                                startIcon={
                                    submitting ? (
                                        <CircularProgress
                                            size={18}
                                            color="inherit"
                                        />
                                    ) : (
                                        <LockOpenOutlinedIcon />
                                    )
                                }
                            >
                                {submitting
                                    ? 'Signing in…'
                                    : 'Sign in'}
                            </Button>
                        </Stack>
                    </LoginForm>

                    {demoCredentials.length >
                        0 && (
                        <Stack spacing={1}>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Local test
                                accounts
                            </Typography>

                            <DemoCredentials>
                                {demoCredentials.map(
                                    (
                                        credential,
                                    ) => (
                                        <Chip
                                            key={
                                                credential.username
                                            }
                                            label={
                                                credential.label
                                            }
                                            variant="outlined"
                                            onClick={() =>
                                                selectDemoCredential(
                                                    credential,
                                                )
                                            }
                                        />
                                    ),
                                )}
                            </DemoCredentials>
                        </Stack>
                    )}
                </Stack>
            </LoginCard>
        </LoginCanvas>
    );
}