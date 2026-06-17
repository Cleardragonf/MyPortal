import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import {
    ResumePdfDownloadButton,
} from '../resume/ResumePdfDownloadButton';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';
import {
    resumeEducation,
    resumeExperiences,
    resumeProfile,
    resumeProjects,
    resumeSkillGroups,
    resumeStrengths,
} from '../resume/resumeData';

const ResumeCanvas = styled('main')(({ theme }) => ({
    minHeight: '100%',
    paddingBottom: theme.spacing(8),

    '@media print': {
        padding: 0,
        background: '#ffffff',

        '& .screen-only': {
            display: 'none',
        },

        '& .resume-card': {
            boxShadow: 'none',
            border: `1px solid ${theme.palette.divider}`,
            breakInside: 'avoid',
        },
    },
}));

const HeroSection = styled('section')(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.spacing(3),
    padding: theme.spacing(5),
    color: theme.palette.primary.contrastText,
    background: `
        linear-gradient(
            135deg,
            ${theme.palette.primary.dark} 0%,
            ${theme.palette.primary.main} 58%,
            ${theme.palette.secondary.main} 140%
        )
    `,

    '&::after': {
        content: '""',
        position: 'absolute',
        width: 320,
        height: 320,
        right: -110,
        top: -150,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },

    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
    },

    '@media print': {
        color: '#000000',
        background: '#ffffff',
        border: `1px solid ${theme.palette.divider}`,

        '&::after': {
            display: 'none',
        },
    },
}));

const HeroContent = styled('div')(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr)',
    gap: theme.spacing(3),
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        textAlign: 'center',
        justifyItems: 'center',
    },
}));

const ResumeAvatar = styled(Avatar)(({ theme }) => ({
    width: 112,
    height: 112,
    fontSize: '2.5rem',
    fontWeight: 800,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    border: '4px solid rgba(255, 255, 255, 0.28)',
}));

const HeroTitle = styled('h1')(({ theme }) => ({
    ...theme.typography.h3,
    margin: 0,
    fontWeight: 800,
    letterSpacing: '-0.04em',

    [theme.breakpoints.down('sm')]: {
        ...theme.typography.h4,
        fontWeight: 800,
    },
}));

const HeroRole = styled('p')(({ theme }) => ({
    ...theme.typography.h6,
    margin: theme.spacing(0.75, 0, 0),
    fontWeight: 500,
    opacity: 0.94,
}));

const ContentGrid = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'minmax(250px, 0.34fr) minmax(0, 1fr)',
    gap: theme.spacing(3),
    marginTop: theme.spacing(3),

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
    },

    '@media print': {
        gridTemplateColumns: '0.34fr 0.66fr',
        gap: theme.spacing(2),
    },
}));

const Sidebar = styled('aside')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

const MainColumn = styled('section')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

const ResumeCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2.5),
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[2],
}));

const CardHeading = styled('h2')(({ theme }) => ({
    ...theme.typography.h6,
    margin: 0,
    fontWeight: 800,
}));

const SkillGroupHeading = styled('h3')(({ theme }) => ({
    ...theme.typography.subtitle2,
    margin: 0,
    fontWeight: 800,
    color: theme.palette.text.primary,
}));

const ExperienceList = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(4),

    '&::before': {
        content: '""',
        position: 'absolute',
        top: 8,
        bottom: 8,
        left: 7,
        width: 2,
        backgroundColor: theme.palette.divider,
    },
}));

const ExperienceEntry = styled('article')(({ theme }) => ({
    position: 'relative',

    '&::before': {
        content: '""',
        position: 'absolute',
        top: 6,
        left: -32,
        width: 14,
        height: 14,
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.main,
        border: `3px solid ${theme.palette.background.paper}`,
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    },

    '@media print': {
        breakInside: 'avoid',
    },
}));

const ExperienceTitle = styled('h3')(({ theme }) => ({
    ...theme.typography.h6,
    margin: 0,
    fontWeight: 800,
}));

const CompanyName = styled('p')(({ theme }) => ({
    ...theme.typography.subtitle1,
    margin: theme.spacing(0.25, 0, 0),
    color: theme.palette.primary.main,
    fontWeight: 700,
}));

const ProjectGrid = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
    },

    '@media print': {
        gridTemplateColumns: '1fr',
    },
}));

const ProjectCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',

    '&:hover': {
        borderColor: theme.palette.primary.main,
        boxShadow: theme.shadows[3],
    },
}));

const BulletList = styled('ul')(({ theme }) => ({
    margin: theme.spacing(1.5, 0, 0),
    paddingLeft: theme.spacing(2.5),

    '& li': {
        marginBottom: theme.spacing(0.75),
        color: theme.palette.text.secondary,
    },
}));

function SectionCard({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <ResumeCard className="resume-card">
            <CardContent>
                <CardHeading>{title}</CardHeading>
                <Divider sx={{ my: 2 }} />
                {children}
            </CardContent>
        </ResumeCard>
    );
}

export function ResumePage() {
    return (
        <ResumeCanvas>
            <HeroSection>
                <HeroContent>
                    <ResumeAvatar>
                        {resumeProfile.initials}
                    </ResumeAvatar>

                    <Box>
                        <HeroTitle>
                            {resumeProfile.name}
                        </HeroTitle>

                        <HeroRole>
                            {resumeProfile.title}
                        </HeroRole>

                        <Typography
                            sx={{
                                maxWidth: 760,
                                mt: 2,
                                opacity: 0.9,
                            }}
                        >
                            {resumeProfile.summary}
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            useFlexGap
                            sx={{
                                flexWrap: 'wrap',
                                mt: 2.5,
                                justifyContent: {
                                    xs: 'center',
                                    sm: 'flex-start',
                                },
                            }}
                        >
                            <Chip
                                icon={<LocationOnOutlinedIcon />}
                                label={resumeProfile.location}
                                variant="outlined"
                                sx={{
                                    color: 'inherit',
                                    borderColor: 'rgba(255,255,255,0.35)',
                                    '& .MuiChip-icon': {
                                        color: 'inherit',
                                    },
                                }}
                            />

                            <Chip
                                icon={<WorkOutlineOutlinedIcon />}
                                label={resumeProfile.availability}
                                variant="outlined"
                                sx={{
                                    color: 'inherit',
                                    borderColor: 'rgba(255,255,255,0.35)',
                                    '& .MuiChip-icon': {
                                        color: 'inherit',
                                    },
                                }}
                            />
                        </Stack>

                        <Stack
                            className="screen-only"
                            direction="row"
                            spacing={1.25}
                            useFlexGap
                            sx={{
                                flexWrap: 'wrap',
                                mt: 3,
                                justifyContent: {
                                    xs: 'center',
                                    sm: 'flex-start',
                                },
                            }}
                        >
                            <ResumePdfDownloadButton />

                            <Button
                                variant="outlined"
                                startIcon={<PrintOutlinedIcon />}
                                onClick={() => window.print()}
                                sx={{
                                    color: 'inherit',
                                    borderColor: 'rgba(255,255,255,0.5)',
                                }}
                            >
                                Print
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<EmailOutlinedIcon />}
                                href={`mailto:${resumeProfile.email}`}
                                sx={{
                                    color: 'inherit',
                                    borderColor: 'rgba(255,255,255,0.5)',
                                }}
                            >
                                Email
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<LinkedInIcon />}
                                href={resumeProfile.linkedIn}
                                target="_blank"
                                rel="noreferrer"
                                sx={{
                                    color: 'inherit',
                                    borderColor: 'rgba(255,255,255,0.5)',
                                }}
                            >
                                LinkedIn
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<GitHubIcon />}
                                href={resumeProfile.github}
                                target="_blank"
                                rel="noreferrer"
                                sx={{
                                    color: 'inherit',
                                    borderColor: 'rgba(255,255,255,0.5)',
                                }}
                            >
                                GitHub
                            </Button>
                        </Stack>
                    </Box>
                </HeroContent>
            </HeroSection>

            <ContentGrid>
                <Sidebar>
                    <SectionCard title="Technical Skills">
                        <Stack spacing={2.5}>
                            {resumeSkillGroups.map((group) => (
                                <Stack
                                    key={group.title}
                                    spacing={1}
                                >
                                    <SkillGroupHeading>
                                        {group.title}
                                    </SkillGroupHeading>

                                    <Stack
                                        direction="row"
                                        useFlexGap
                                        sx={{
                                            flexWrap: 'wrap',
                                            gap: 0.75,
                                        }}
                                    >
                                        {group.skills.map((skill) => (
                                            <Chip
                                                key={skill}
                                                label={skill}
                                                size="small"
                                                variant="outlined"
                                            />
                                        ))}
                                    </Stack>
                                </Stack>
                            ))}
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Education">
                        <Stack spacing={0.5}>
                            <Typography sx={{ fontWeight: 800 }}>
                                {resumeEducation.program}
                            </Typography>

                            <Typography color="text.secondary">
                                {resumeEducation.institution}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {resumeEducation.details}
                            </Typography>
                        </Stack>
                    </SectionCard>

                    <SectionCard title="Professional Strengths">
                        <Stack
                            direction="row"
                            useFlexGap
                            sx={{
                                flexWrap: 'wrap',
                                gap: 1,
                            }}
                        >
                            {resumeStrengths.map((strength) => (
                                <Chip
                                    key={strength}
                                    label={strength}
                                    color="primary"
                                    variant="outlined"
                                />
                            ))}
                        </Stack>
                    </SectionCard>
                </Sidebar>

                <MainColumn>
                    <SectionCard title="Professional Experience">
                        <ExperienceList>
                            {resumeExperiences.map((experience) => (
                                <ExperienceEntry
                                    key={`${experience.company}-${experience.title}`}
                                >
                                    <ExperienceTitle>
                                        {experience.title}
                                    </ExperienceTitle>

                                    <CompanyName>
                                        {experience.company}
                                    </CompanyName>

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        useFlexGap
                                        sx={{
                                            flexWrap: 'wrap',
                                            mt: 0.5,
                                        }}
                                    >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        {experience.dates}
                                    </Typography>
                                        {experience.location && (
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {' - '}
                                                {experience.location}
                                            </Typography>
                                        )}
                                    </Stack>

                                    <Typography
                                        color="text.secondary"
                                        sx={{ mt: 1.5 }}
                                    >
                                        {experience.summary}
                                    </Typography>

                                    <BulletList>
                                        {experience.accomplishments.map(
                                            (accomplishment) => (
                                                <li key={accomplishment}>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {accomplishment}
                                                    </Typography>
                                                </li>
                                            ),
                                        )}
                                    </BulletList>

                                    <Stack
                                        direction="row"
                                        useFlexGap
                                        sx={{
                                            flexWrap: 'wrap',
                                            gap: 0.75,
                                            mt: 2,
                                        }}
                                    >
                                        {experience.technologies.map(
                                            (technology) => (
                                                <Chip
                                                    key={technology}
                                                    label={technology}
                                                    size="small"
                                                />
                                            ),
                                        )}
                                    </Stack>
                                </ExperienceEntry>
                            ))}
                        </ExperienceList>
                    </SectionCard>

                    <SectionCard title="Featured Projects">
                        <ProjectGrid>
                            {resumeProjects.map((project) => (
                                <ProjectCard
                                    key={project.name}
                                    className="resume-card"
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 800 }}
                                    >
                                        {project.name}
                                    </Typography>
                                        <Typography
                                            color="text.secondary"
                                            sx={{ mt: 1 }}
                                        >
                                            {project.description}
                                        </Typography>

                                        <Stack
                                            direction="row"
                                            useFlexGap
                                            sx={{
                                                flexWrap: 'wrap',
                                                gap: 0.75,
                                                mt: 2,
                                            }}
                                        >
                                            {project.technologies.map(
                                                (technology) => (
                                                    <Chip
                                                        key={technology}
                                                        label={technology}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                ),
                                            )}
                                        </Stack>
                                    </CardContent>

                                    {project.link && (
                                        <CardActions>
                                            <Button
                                                href={project.link}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {project.linkLabel ??
                                                    'View project'}
                                            </Button>
                                        </CardActions>
                                    )}
                                </ProjectCard>
                            ))}
                        </ProjectGrid>
                    </SectionCard>
                </MainColumn>
            </ContentGrid>
        </ResumeCanvas>
    );
}
