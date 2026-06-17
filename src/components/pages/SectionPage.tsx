import {
    Paper,
    Stack,
    Typography,
    type PaperProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

const PagePaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '20px',
}));

interface SectionPageProps extends PaperProps {
    title: string;
    description: string;
    children?: ReactNode;
}

export function SectionPage({
    title,
    description,
    children,
    ...paperProps
}: SectionPageProps) {
    return (
        <PagePaper elevation={1} {...paperProps}>
            <Stack spacing={2}>
                <Typography variant="h4" component="h1">
                    {title}
                </Typography>
                <Typography color="text.secondary">
                    {description}
                </Typography>
                {children}
            </Stack>
        </PagePaper>
    );
}
