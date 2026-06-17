
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
    link?: string;
    linkLabel?: string;
}

export interface ResumeSkillGroup {
    title: string;
    skills: readonly string[];
}

export interface ResumeEducation {
    program: string;
    institution: string;
    details: string;
}

export const resumeProfile = {
    name: 'Christopher Warner',
    initials: 'CW',
    title: 'Senior Full Stack Java & React Developer',
    location: 'Papillion, Nebraska',
    email: 'chrismwarner339@gmail.com',
    phone: '402-850-0547',
    linkedIn: 'https://www.linkedin.com/in/christopher-warner-86982a148/',
    github: 'https://github.com/Cleardragonf',
    availability: 'Open to professional opportunities',
    summary:
        'Senior full-stack developer with approximately 10 years of experience designing, modernizing, and supporting enterprise applications across government, healthcare, and financial-services environments. Strong experience with Java, Spring Boot, React, TypeScript, REST APIs, microservices, SQL Server, Azure DevOps, Docker, automated testing, and production support.',
};

export const resumeStrengths: readonly string[] = [
    'Technical Leadership',
    'Problem Solving',
    'System Design',
    'Mentoring',
    'Documentation',
    'Stakeholder Communication',
    'Agile Delivery',
];

export const resumeEducation: ResumeEducation = {
    program: 'Add degree or program',
    institution: 'Add university or institution',
    details: 'Add graduation date or relevant details',
};

export const resumeExperiences:
    readonly ResumeExperience[] = [
        {
            company: 'State of Nebraska',
            title: 'Senior Full Stack Java & React Developer',
            dates: 'August 2020 – Present',
            location: 'Nebraska',
            summary:
                'Design, develop, modernize, and support public-service and healthcare applications using Java, Spring Boot, React, TypeScript, REST APIs, databases, and cloud-connected infrastructure.',
            accomplishments: [
                'Develop and maintain Java 17 and Spring Boot services supporting enterprise business processes, application integrations, authentication, and data access.',
                'Build responsive and accessible frontend applications using React, TypeScript, Material UI, React Router, reusable components, and role-based navigation.',
                'Design and integrate REST APIs using structured request and response models, validation, exception handling, authentication, and Swagger/OpenAPI documentation.',
                'Develop secure authentication and authorization workflows using JSON Web Tokens, OAuth2 concepts, and role-based access control.',
                'Build full-stack features connecting React applications to Spring Boot services, SQL Server, Cosmos DB, Redis, and external enterprise systems.',
                'Develop reusable UI components for forms, tables, filtering, sorting, pagination, validation, loading states, error handling, and responsive layouts.',
                'Support microservice-based applications, API routing, proxy configuration, health checks, distributed logging, and production troubleshooting.',
                'Create automated development environments using Docker, PowerShell, Gradle, npm, environment files, and local service orchestration.',
                'Support Azure DevOps repositories, pull requests, CI/CD pipelines, Azure Artifacts, SonarQube quality gates, automated tests, and deployment processes.',
                'Collaborate with developers, business analysts, QA teams, infrastructure teams, and stakeholders to translate business requirements into maintainable technical solutions.',
                'Conduct code reviews, resolve production defects, document technical designs, and mentor team members on development and support practices.',
            ],
            technologies: [
                'Java 17',
                'Spring Boot',
                'Spring Data JPA',
                'Hibernate',
                'React',
                'TypeScript',
                'JavaScript',
                'Material UI',
                'React Router',
                'REST APIs',
                'Microservices',
                'Swagger / OpenAPI',
                'JWT',
                'OAuth2',
                'SQL Server',
                'Cosmos DB',
                'Redis',
                'Docker',
                'Gradle',
                'npm',
                'Azure DevOps',
                'Azure Artifacts',
                'SonarQube',
                'Git',
                'JUnit',
                'Jest',
            ],
        },
        {
            company: 'State of Nebraska',
            title: 'Senior Application Analyst / Developer',
            dates: 'August 2020 – Present',
            location: 'Nebraska',
            summary:
                'Developed internal enterprise applications, automation tools, monitoring platforms, and healthcare integrations using Java, React, Node.js, .NET, SQL, EDI, and FHIR technologies.',
            accomplishments: [
                'Developed a task-management application using Java, Spring Boot, React, Node.js, MySQL, REST APIs, JWT authentication, and role-based access control.',
                'Implemented user registration, login, CRUD operations, search, sorting, categories, labels, task sharing, validation, logging, and API documentation.',
                'Built Java backend services and React interfaces for an enterprise automation and monitoring portal.',
                'Implemented WebSocket-based communication to deliver real-time status updates between frontend, proxy, and backend application components.',
                'Created Java services that replaced legacy VBScript processes with maintainable, testable, and reusable application workflows.',
                'Designed SQL tables, constraints, triggers, stored procedures, and application data-access patterns.',
                'Integrated backend applications with healthcare middleware, EDI processing, FHIR services, and operational support tools.',
                'Developed application logging, health monitoring, server status checks, process scheduling, and automated notifications.',
            ],
            technologies: [
                'Java',
                'Spring Boot',
                'React',
                'TypeScript',
                'Node.js',
                'Express',
                'WebSockets',
                'REST APIs',
                'JWT',
                'Swagger',
                'SQL Server',
                'MySQL',
                'PostgreSQL',
                'MongoDB',
                'Spring Data JPA',
                'Hibernate',
                'EDI',
                'FHIR',
                'Edifecs',
            ],
        },
        {
            company: 'DatamanUSA, LLC',
            title: 'Systems Integration Architect',
            dates: 'March 2022 – November 2023',
            location: 'Remote / Client Engagement',
            summary:
                'Provided technical leadership and systems-integration architecture for healthcare modernization, APIs, microservices, middleware, and secure data-transfer initiatives.',
            accomplishments: [
                'Designed scalable integration architectures supporting communication between enterprise applications, APIs, vendors, middleware, and external systems.',
                'Collaborated with development teams to define API contracts, integration patterns, data mappings, security requirements, and deployment standards.',
                'Supported healthcare MMIS modularity initiatives involving distributed applications, microservices, and enterprise integrations.',
                'Led technical reviews focused on performance, reliability, security, maintainability, and production readiness.',
                'Created architecture documentation, technical specifications, support procedures, and knowledge-transfer materials.',
                'Troubleshot integration failures, data-flow issues, performance bottlenecks, and production incidents across interconnected systems.',
            ],
            technologies: [
                'Java',
                'REST APIs',
                'Microservices',
                'Systems Integration',
                'API Management',
                'SQL',
                'EDI',
                'MoveIT',
                'SFTP',
                '.NET MVC',
                'Windows Server',
                'IIS',
                'Architecture',
            ],
        },
        {
            company: 'Fiserv',
            title: 'Application Developer / Technical Lead',
            dates: 'March 2019 – August 2020',
            summary:
                'Designed, developed, tested, and supported enterprise monitoring, reporting, automation, and operational-support applications.',
            accomplishments: [
                'Gathered business requirements and translated them into application designs, technical specifications, and maintainable software solutions.',
                'Developed and tested enterprise applications integrating REST services, SQL data, monitoring systems, and operational workflows.',
                'Used Postman to test REST APIs and verify service availability and response accuracy across multiple servers.',
                'Created technical design documents, architecture documentation, test cases, deployment plans, and support procedures.',
                'Performed code reviews, defect resolution, production troubleshooting, deployment support, and team training.',
                'Led application design and delivery activities while coordinating with development teams, production support, and management.',
            ],
            technologies: [
                'C#',
                '.NET Framework',
                'REST APIs',
                'SQL',
                'Postman',
                'PowerShell',
                'Visual Studio',
                'Unit Testing',
                'Application Monitoring',
            ],
        },
        {
            company: 'First Data',
            title: 'Associate Application Developer',
            dates: 'March 2016 – March 2019',
            summary:
                'Modernized legacy scripts and desktop applications into maintainable web applications and automated enterprise solutions.',
            accomplishments: [
                'Converted legacy WinForms and script-based workflows into web applications using MVC, JavaScript, HTML, Bootstrap, Angular, and React.',
                'Developed and tested application features based on business and operational requirements.',
                'Created reusable frontend functionality and integrated web interfaces with backend application logic.',
                'Consolidated large collections of DOS and PowerShell scripts into maintainable applications and automated workflows.',
                'Created application design documents, developer guides, support procedures, and deployment documentation.',
                'Collaborated with local and offshore developers to explain technical designs and frontend behavior.',
            ],
            technologies: [
                'JavaScript',
                'React',
                'Angular',
                'jQuery',
                'HTML5',
                'CSS',
                'Bootstrap',
                '.NET MVC',
                'WinForms',
                'PowerShell',
                'SQL',
                'Visual Studio',
            ],
        },
    ];

export const resumeProjects:
    readonly ResumeProject[] = [
        {
            name: 'iServe Benefit Application',
            description:
                'Enterprise public-benefits platform built with Java 17, Spring Boot, React, TypeScript, REST APIs, SQL Server, Cosmos DB, Redis, Docker, and Azure DevOps.',
            technologies: [
                'Java 17',
                'Spring Boot',
                'Spring Data JPA',
                'React',
                'TypeScript',
                'Material UI',
                'REST APIs',
                'SQL Server',
                'Cosmos DB',
                'Redis',
                'Docker',
                'Azure DevOps',
            ],
        },
        {
            name: 'Task Management System',
            description:
                'Full-stack task-management application with authentication, role-based authorization, CRUD operations, task sharing, search, sorting, logging, monitoring, and Swagger API documentation.',
            technologies: [
                'Java',
                'Spring Boot',
                'React',
                'Node.js',
                'Express',
                'JWT',
                'REST APIs',
                'Swagger',
                'MySQL',
            ],
        },
        {
            name: 'Enterprise Automation Portal',
            description:
                'React and Java-based operational portal providing real-time server monitoring, process execution, deployment controls, logging, and WebSocket-driven updates.',
            technologies: [
                'Java',
                'Spring Boot',
                'React',
                'TypeScript',
                'Node.js',
                'Express',
                'WebSockets',
                'SQL Server',
                'REST APIs',
            ],
        },
        {
            name: 'Developer Portal',
            description:
                'Modular React portal with authentication providers, permission-aware routes, reusable layouts, health-check-based navigation, and responsive Material UI components.',
            technologies: [
                'React',
                'TypeScript',
                'Vite',
                'React Router',
                'Material UI',
                'REST APIs',
            ],
        },
        {
            name: 'Local Development Automation',
            description:
                'Automated local development setup for Java and React applications, including service startup, environment configuration, Docker dependencies, certificates, and Gradle workflows.',
            technologies: [
                'PowerShell',
                'Docker',
                'Gradle',
                'Java',
                'React',
                'Cosmos DB',
                'Redis',
            ],
        },
    ];

export const resumeSkillGroups:
    readonly ResumeSkillGroup[] = [
        {
            title: 'Java & Backend Development',
            skills: [
                'Java 17',
                'Spring Boot',
                'Spring MVC',
                'Spring Data JPA',
                'Hibernate',
                'REST APIs',
                'Microservices',
                'Swagger / OpenAPI',
                'JWT',
                'OAuth2',
                'Gradle',
                'JUnit',
            ],
        },
        {
            title: 'React & Frontend Development',
            skills: [
                'React',
                'TypeScript',
                'JavaScript',
                'Material UI',
                'React Router',
                'HTML5',
                'CSS',
                'Responsive Design',
                'Accessibility',
                'Jest',
                'Vite',
            ],
        },
        {
            title: 'Databases & Data Access',
            skills: [
                'SQL Server',
                'Cosmos DB',
                'MySQL',
                'PostgreSQL',
                'MongoDB',
                'Redis',
                'Stored Procedures',
                'Database Design',
                'Query Optimization',
            ],
        },
        {
            title: 'Cloud, DevOps & Delivery',
            skills: [
                'Azure DevOps',
                'Azure App Service',
                'Azure Artifacts',
                'Docker',
                'CI/CD',
                'Git',
                'GitHub',
                'SonarQube',
                'npm',
                'PowerShell',
                'Environment Configuration',
            ],
        },
        {
            title: 'Architecture & Engineering',
            skills: [
                'Full-Stack Development',
                'Object-Oriented Programming',
                'API Design',
                'Distributed Systems',
                'Design Patterns',
                'Code Reviews',
                'Technical Documentation',
                'Application Modernization',
                'Performance Troubleshooting',
                'Production Support',
            ],
        },
        {
            title: 'Enterprise Tools',
            skills: [
                'IntelliJ IDEA',
                'Visual Studio Code',
                'Visual Studio',
                'Postman',
                'Jira',
                'Confluence',
                'Swagger',
                'Azure Repos',
            ],
        },
    ];
