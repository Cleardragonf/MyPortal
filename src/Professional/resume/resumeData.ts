export interface ResumeExperience {
    company: string;
    title: string;
    dates: string;
    location?: string;
    summary: string;
    accomplishments: readonly string[];
    technologies: readonly string[];
}

export interface ResumeProject {
    name: string;
    description: string;
    technologies: readonly string[];
}

export interface ResumeSkillGroup {
    title: string;
    skills: readonly string[];
}

export const resumeProfile = {
    name: 'Christopher Warner',
    title: 'Senior Full Stack Java & React Developer',
    location: 'Nebraska',
    email: 'chrismwarner339@gmail.com',
    summary:
        'Full-stack software developer experienced in building reliable enterprise applications, modernizing development workflows, and turning complex requirements into practical, maintainable solutions.',
};

export const resumeExperiences:
    readonly ResumeExperience[] = [
        {
            company: 'State of Nebraska',
            title: 'Senior Full Stack Java & React Developer',
            dates: 'Present',
            location: 'Nebraska',
            summary:
                'Develop and maintain public-service applications using Java, Spring Boot, React, TypeScript, and cloud-connected infrastructure.',
            accomplishments: [
                'Build accessible and responsive interfaces with React, TypeScript, and Material UI.',
                'Develop and maintain REST services with Java 17 and Spring Boot.',
                'Improve local development workflows using Docker, PowerShell, and automated environment setup.',
                'Support CI/CD pipelines, package feeds, code-quality checks, and release processes through Azure DevOps.',
                'Collaborate with developers, analysts, and business stakeholders to deliver reliable government services.',
            ],
            technologies: [
                'Java 17',
                'Spring Boot',
                'React',
                'TypeScript',
                'Material UI',
                'Gradle',
                'Azure DevOps',
                'Docker',
                'SQL Server',
                'Cosmos DB',
            ],
        },
        {
            company: 'Previous Organization',
            title: 'Senior Application Analyst / Developer',
            dates: 'Add dates',
            summary:
                'Designed, enhanced, and supported enterprise software solutions while working with technical and business teams.',
            accomplishments: [
                'Translated business requirements into maintainable technical solutions.',
                'Investigated production issues and implemented long-term improvements.',
                'Contributed to architecture, documentation, testing, and deployment activities.',
            ],
            technologies: [
                'Java',
                'JavaScript',
                'SQL',
                'REST APIs',
                'Git',
            ],
        },
        {
            company: 'United States Military',
            title: 'Intelligence Officer',
            dates: 'Add dates',
            summary:
                'Led analytical activities, communicated complex findings, and supported decisions in high-responsibility environments.',
            accomplishments: [
                'Synthesized complex information into actionable recommendations.',
                'Led teams and coordinated work across multiple stakeholders.',
                'Worked in environments requiring accuracy, discretion, and accountability.',
            ],
            technologies: [
                'Leadership',
                'Analysis',
                'Communication',
                'Operations',
            ],
        },
    ];

export const resumeProjects:
    readonly ResumeProject[] = [
        {
            name: 'iServe Benefit Application',
            description:
                'A full-stack public benefits application built with Java, Spring Boot, React, TypeScript, SQL Server, Cosmos DB, and Azure DevOps.',
            technologies: [
                'Java 17',
                'Spring Boot',
                'React',
                'TypeScript',
                'Cosmos DB',
                'Azure DevOps',
            ],
        },
        {
            name: 'Developer Portal',
            description:
                'A modular React portal with authentication HOCs, permission-aware routes, reusable layouts, and responsive navigation.',
            technologies: [
                'React',
                'TypeScript',
                'Vite',
                'React Router',
                'Material UI',
            ],
        },
        {
            name: 'Local Development Automation',
            description:
                'PowerShell and terminal automation for starting services, configuring environments, managing certificates, and improving onboarding.',
            technologies: [
                'PowerShell',
                'Docker',
                'Cosmos DB',
                'Gradle',
            ],
        },
    ];

export const resumeSkillGroups:
    readonly ResumeSkillGroup[] = [
        {
            title: 'Backend',
            skills: [
                'Java 17',
                'Spring Boot',
                'REST APIs',
                'Gradle',
                'JUnit',
            ],
        },
        {
            title: 'Frontend',
            skills: [
                'React',
                'TypeScript',
                'Material UI',
                'Vite',
                'Jest',
            ],
        },
        {
            title: 'Data',
            skills: [
                'SQL Server',
                'Cosmos DB',
                'Redis',
            ],
        },
        {
            title: 'DevOps',
            skills: [
                'Azure DevOps',
                'Docker',
                'CI/CD',
                'SonarQube',
                'Azure Artifacts',
            ],
        },
        {
            title: 'Tools',
            skills: [
                'IntelliJ IDEA',
                'Visual Studio Code',
                'Git',
                'Confluence',
                'PowerShell',
            ],
        },
    ];