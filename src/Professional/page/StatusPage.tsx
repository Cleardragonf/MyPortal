import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Typography,
} from '@mui/material';

type ServiceStatus = 'Operational' | 'Degraded' | 'Offline';

interface ServiceHealth {
    name: string;
    description: string;
    status: ServiceStatus;
}

const services: ServiceHealth[] = [
    {
        name: 'Website',
        description: 'Main public website and routing',
        status: 'Operational',
    },
    {
        name: 'React Portal',
        description: 'Frontend application',
        status: 'Operational',
    },
    {
        name: 'API Gateway',
        description: 'Routes requests to backend services',
        status: 'Operational',
    },
    {
        name: 'Auth Service',
        description: 'Authentication and authorization',
        status: 'Operational',
    },
    {
        name: 'Adventure Service',
        description: 'Node.js adventure backend',
        status: 'Operational',
    },
    {
        name: 'Database',
        description: 'Application persistence layer',
        status: 'Operational',
    },
    {
        name: 'Redis',
        description: 'Caching and temporary data',
        status: 'Operational',
    },
];

const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
        case 'Operational':
            return 'success';
        case 'Degraded':
            return 'warning';
        case 'Offline':
            return 'error';
        default:
            return 'default';
    }
};

export const StatusPage: React.FC = () => {
    const allOperational = services.every(
        service => service.status === 'Operational'
    );

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
            <Typography variant="h4" sx={{fontWeight: 700}} gutterBottom>
                System Status
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
                Live status overview for the deployed microservices platform.
            </Typography>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{fontWeight: 600}}>
                        {allOperational
                            ? 'All systems operational'
                            : 'Some systems need attention'}
                    </Typography>

                    <Typography color="text.secondary">
                        Last checked: {new Date().toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    {services.map((service, index) => (
                        <Box key={service.name}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    py: 2,
                                    gap: 2,
                                }}
                            >
                                <Box>
                                    <Typography sx={{fontWeight: 600}}>
                                        {service.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {service.description}
                                    </Typography>
                                </Box>

                                <Chip
                                    label={service.status}
                                    color={getStatusColor(service.status)}
                                    variant="outlined"
                                />
                            </Box>

                            {index < services.length - 1 && <Divider />}
                        </Box>
                    ))}
                </CardContent>
            </Card>
        </Box>
    );
};