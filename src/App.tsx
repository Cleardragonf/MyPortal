import { Button, Container, Stack } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import { SectionPage } from './components/pages/SectionPage';
import { PortalPage } from './MainPortal/Portal';
import { OurServerRoutes } from './OurServer/OurServerRoutes';
import { PersonalProjectsRoutes } from './PersonalProjects/PersonalProjectsRoutes';
import { ProfessionalProjectsRoutes } from './Professional/ProfessionalProjectsRoutes';

function ApplicationNotFoundPage() {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <SectionPage
                title="Page not found"
                description="The requested portal page does not exist."
            >
                <Stack direction="row">
                    <Button component={Link} to="/" variant="contained">
                        Return to portal
                    </Button>
                </Stack>
            </SectionPage>
        </Container>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<PortalPage />} />
            <Route
                path="/Professional/*"
                element={<ProfessionalProjectsRoutes />}
            />
            <Route
                path="/OurServer/*"
                element={<OurServerRoutes />}
            />
            <Route path="/C4/*" element={<PersonalProjectsRoutes />} />
            <Route path="*" element={<ApplicationNotFoundPage />} />
        </Routes>
    );
}

export default App;
