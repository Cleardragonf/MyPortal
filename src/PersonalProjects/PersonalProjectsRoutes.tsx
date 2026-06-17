import { Button, Stack, Typography } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import { SectionPage } from '../components/pages/SectionPage';
import { PersonalProjectsLayout } from './PersonalProjectsLayout';
import { PersonalProjectsLoginPage } from './PersonalProjectsLoginPage';
import {
    withPersonalProjectsAuthentication,
    withPersonalProjectsAuthProvider,
} from './personalProjectsAuth';
import { Page } from './page/c4ProjectPage';
import { useEffect, useState } from 'react';

function ProjectsHomePage() {
    return (
        <SectionPage
            title="C4's Personal Page"
            description="Welcome to our personal page.  Here, you'll find all sorts of different projects.  Some restricted and others not."
        />
    );
}

type AdventureStatus = 'checking' | 'unavailable';

interface AdventureHealthResponse {
    service: string;
    status: string;
}

function AdventureRedirectPage() {
    const [status, setStatus] =
        useState<AdventureStatus>('checking');

    useEffect(() => {
        const abortController = new AbortController();

        const timeoutId = window.setTimeout(() => {
            abortController.abort();
        }, 5000);

        async function checkAdventureHealth() {
            try {
                const response = await fetch('/adventure-health', {
                    method: 'GET',
                    cache: 'no-store',
                    credentials: 'include',
                    headers: {
                        Accept: 'application/json',
                    },
                    signal: abortController.signal,
                });

                if (!response.ok) {
                    throw new Error(
                        `Health check returned HTTP ${response.status}`,
                    );
                }

                const contentType =
                    response.headers.get('content-type');

                if (!contentType?.includes('application/json')) {
                    throw new Error(
                        'Health check did not return JSON',
                    );
                }

                const health =
                    await response.json() as AdventureHealthResponse;

                const healthCheckPassed =
                    health.service === 'adventure' &&
                    health.status === 'UP';

                if (!healthCheckPassed) {
                    throw new Error(
                        'Adventure health check did not report UP',
                    );
                }

                window.clearTimeout(timeoutId);

                // This only executes after the exact health response passes.
                window.location.assign('/adventure/');
            } catch (error) {
                window.clearTimeout(timeoutId);

                console.error(
                    'Adventure App is unavailable:',
                    error,
                );

                setStatus('unavailable');
            }
        }

        void checkAdventureHealth();

        return () => {
            window.clearTimeout(timeoutId);
            abortController.abort();
        };
    }, []);

    if (status === 'unavailable') {
        return (
            <SectionPage
                title="Adventure App is currently unavailable"
                description="The Adventure application could not be reached. Please try again later."
            >
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </Button>

                    <Button
                        component={Link}
                        to="/C4"
                        variant="outlined"
                    >
                        Return Home
                    </Button>
                </Stack>
            </SectionPage>
        );
    }

    return (
        <SectionPage
            title="Opening Adventure"
            description="Checking whether the Adventure application is available."
        >
            <Typography>
                Connecting to the Adventure application…
            </Typography>
        </SectionPage>
    );
}

function ProjectsListPage() {
    return (
        <SectionPage title="Projects" description="Browse projects available to the currently authenticated user.">
            <Page/>
        </SectionPage>
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
                <Route path='Adventure' element={<AdventureRedirectPage />} />
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
