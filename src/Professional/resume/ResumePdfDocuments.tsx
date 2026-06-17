import {
    Document,
    Link,
    Page,
    StyleSheet,
    Text,
    View,
} from '@react-pdf/renderer';
import {
    resumeExperiences,
    resumeProfile,
    resumeProjects,
    resumeSkillGroups,
} from './resumeData';

const colors = {
    navy: '#17324d',
    blue: '#245a8d',
    lightBlue: '#eaf2f8',
    text: '#25313c',
    muted: '#5f6b76',
    border: '#d6dee5',
    white: '#ffffff',
};

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 9,
        lineHeight: 1.45,
        color: colors.text,
        backgroundColor: colors.white,
    },

    header: {
        padding: 20,
        borderRadius: 8,
        backgroundColor: colors.navy,
        color: colors.white,
        marginBottom: 18,
    },

    identityBlock: {
        marginBottom: 12,
    },

    name: {
        fontSize: 25,
        fontFamily: 'Helvetica-Bold',
        lineHeight: 1.15,
        marginBottom: 10,
    },

    jobTitle: {
        fontSize: 13,
        lineHeight: 1.3,
        marginBottom: 10,
    },

    summary: {
        fontSize: 9.5,
        lineHeight: 1.45,
        color: '#e4edf4',
        marginBottom: 10,
    },

    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },

    contactText: {
        fontSize: 8.5,
        color: colors.white,
    },

    emailLink: {
        fontSize: 8.5,
        color: colors.white,
        textDecoration: 'none',
    },

    content: {
        flexDirection: 'row',
        gap: 18,
    },

    sidebar: {
        width: '30%',
    },

    main: {
        width: '70%',
    },

    section: {
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        color: colors.navy,
        paddingBottom: 5,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    skillGroup: {
        marginBottom: 9,
    },

    skillGroupTitle: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 3,
    },

    skillText: {
        color: colors.muted,
        fontSize: 8.5,
    },

    experience: {
        marginBottom: 15,
    },

    experienceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 2,
    },

    experienceTitle: {
        width: '72%',
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: colors.text,
    },

    dates: {
        width: '28%',
        fontSize: 8.5,
        textAlign: 'right',
        color: colors.muted,
    },

    company: {
        fontSize: 9.5,
        fontFamily: 'Helvetica-Bold',
        color: colors.blue,
        marginBottom: 5,
    },

    paragraph: {
        color: colors.muted,
        marginBottom: 5,
    },

    bulletRow: {
        flexDirection: 'row',
        marginBottom: 3,
        paddingRight: 4,
    },

    bullet: {
        width: 10,
        fontFamily: 'Helvetica-Bold',
    },

    bulletText: {
        flex: 1,
        color: colors.muted,
    },

    technologyRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        marginTop: 6,
    },

    technology: {
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 3,
        fontSize: 7,
        color: colors.blue,
        backgroundColor: colors.lightBlue,
    },

    project: {
        padding: 9,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 5,
    },

    projectTitle: {
        fontSize: 9.5,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 4,
    },

    footer: {
        position: 'absolute',
        bottom: 15,
        left: 30,
        right: 30,
        fontSize: 7,
        color: colors.muted,
        textAlign: 'center',
    },
});

function SkillSection() {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>
                Technical Skills
            </Text>

            {resumeSkillGroups.map((group) => (
                <View
                    key={group.title}
                    style={styles.skillGroup}
                >
                    <Text style={styles.skillGroupTitle}>
                        {group.title}
                    </Text>

                    <Text style={styles.skillText}>
                        {group.skills.join(' / ')}
                    </Text>
                </View>
            ))}
        </View>
    );
}

function ExperienceSection() {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>
                Professional Experience
            </Text>

            {resumeExperiences.map((experience) => (
                <View
                    key={`${experience.company}-${experience.title}`}
                    style={styles.experience}
                    wrap={false}
                >
                    <View style={styles.experienceHeader}>
                        <Text style={styles.experienceTitle}>
                            {experience.title}
                        </Text>

                        <Text style={styles.dates}>
                            {experience.dates}
                        </Text>
                    </View>

                    <Text style={styles.company}>
                        {experience.company}
                        {experience.location
                            ? ` - ${experience.location}`
                            : ''}
                    </Text>

                    <Text style={styles.paragraph}>
                        {experience.summary}
                    </Text>

                    {experience.accomplishments.map(
                        (accomplishment) => (
                            <View
                                key={accomplishment}
                                style={styles.bulletRow}
                            >
                                <Text style={styles.bullet}>
                                    -
                                </Text>

                                <Text style={styles.bulletText}>
                                    {accomplishment}
                                </Text>
                            </View>
                        ),
                    )}

                    <View style={styles.technologyRow}>
                        {experience.technologies.map(
                            (technology) => (
                                <Text
                                    key={technology}
                                    style={styles.technology}
                                >
                                    {technology}
                                </Text>
                            ),
                        )}
                    </View>
                </View>
            ))}
        </View>
    );
}

function ProjectsSection() {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>
                Featured Projects
            </Text>

            {resumeProjects.map((project) => (
                <View
                    key={project.name}
                    style={styles.project}
                    wrap={false}
                >
                    <Text style={styles.projectTitle}>
                        {project.name}
                    </Text>

                    <Text style={styles.paragraph}>
                        {project.description}
                    </Text>

                    <Text style={styles.skillText}>
                        {project.technologies.join(' / ')}
                    </Text>
                </View>
            ))}
        </View>
    );
}

export function ResumePdfDocument() {
    return (
        <Document
            title={`${resumeProfile.name} Resume`}
            author={resumeProfile.name}
            subject="Professional Resume"
            language="en-US"
        >
            <Page
                size="LETTER"
                style={styles.page}
                wrap
            >
                <View style={styles.header}>
                    <View style={styles.identityBlock}>
                        <Text style={styles.name}>
                            {resumeProfile.name}
                        </Text>

                        <Text style={styles.jobTitle}>
                            {resumeProfile.title}
                        </Text>
                    </View>

                    <Text style={styles.summary}>
                        {resumeProfile.summary}
                    </Text>

                    <View style={styles.contactRow}>
                        <Text style={styles.contactText}>
                            {resumeProfile.location}
                        </Text>

                        <Link
                            src={`mailto:${resumeProfile.email}`}
                            style={styles.emailLink}
                        >
                            {resumeProfile.email}
                        </Link>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.sidebar}>
                        <SkillSection />

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Strengths
                            </Text>

                            <Text style={styles.skillText}>
                                Technical Leadership
                                {'\n'}
                                System Design
                                {'\n'}
                                Problem Solving
                                {'\n'}
                                Documentation
                                {'\n'}
                                Stakeholder Communication
                                {'\n'}
                                Agile Delivery
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Education
                            </Text>

                            <Text style={styles.skillGroupTitle}>
                                Add degree or program
                            </Text>

                            <Text style={styles.skillText}>
                                Add university
                                {'\n'}
                                Add graduation details
                            </Text>
                        </View>
                    </View>

                    <View style={styles.main}>
                        <ExperienceSection />
                        <ProjectsSection />
                    </View>
                </View>

                <Text
                    fixed
                    style={styles.footer}
                    render={({ pageNumber, totalPages }) =>
                        `${resumeProfile.name} - Page ${pageNumber} of ${totalPages}`
                    }
                />
            </Page>
        </Document>
    );
}