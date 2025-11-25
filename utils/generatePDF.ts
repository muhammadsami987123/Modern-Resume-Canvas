import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import type { EducationItem, ExperienceItem, ProjectItem, ResumeState, Section, Theme } from '@/store/resumeStore';

const fontFallbacks: Record<string, string> = {
    Inter: 'Helvetica',
    Roboto: 'Helvetica',
    Outfit: 'Helvetica',
    Poppins: 'Helvetica',
    'Playfair Display': 'Times-Roman',
    Lora: 'Times-Roman',
    Montserrat: 'Helvetica',
};

const resolveFont = (theme: Theme) => fontFallbacks[theme.font] ?? 'Helvetica';

const stylesFromTheme = (theme: Theme) => {
    const radius = Number(theme.radius.replace('px', '')) || 0;
    return StyleSheet.create({
        page: {
            backgroundColor: '#ffffff',
            padding: 32,
            fontFamily: resolveFont(theme),
            color: theme.text,
            fontSize: theme.bodySize,
            lineHeight: theme.bodyLineHeight,
        },
        section: {
            marginBottom: theme.sectionSpacing,
            padding: theme.sectionPadding / 2,
            borderRadius: radius,
            borderColor: `${theme.accent}40`,
            borderWidth: 0.5,
        },
        title: {
            fontSize: theme.headingSize,
            color: theme.accent,
            marginBottom: 6,
            fontWeight: 600,
        },
        body: {
            fontSize: theme.bodySize,
            lineHeight: theme.bodyLineHeight,
        },
        subHeading: {
            fontSize: theme.bodySize + 2,
            fontWeight: 600,
            marginBottom: 2,
        },
        meta: {
            fontSize: theme.bodySize - 2,
            color: '#6b7280',
            marginBottom: 4,
        },
        listItem: {
            marginBottom: 4,
        },
        pillRow: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 6,
            marginTop: 8,
        },
        pill: {
            borderRadius: 6,
            paddingHorizontal: 6,
            paddingVertical: 2,
            fontSize: theme.bodySize - 2,
            color: theme.accent,
            borderColor: `${theme.accent}80`,
            borderWidth: 0.5,
        },
    });
};

const SectionBlock = ({
    section,
    theme,
    styles,
}: {
    section: Section;
    theme: Theme;
    styles: ReturnType<typeof stylesFromTheme>;
}) => {
    return (
        <View key={section.id} style={styles.section}>
            <Text style={styles.title}>{section.title}</Text>
            {section.content && <Text style={styles.body}>{section.content}</Text>}

            {section.type === 'skills' && Array.isArray(section.items) && (
                <View style={styles.pillRow}>
                    {(section.items as string[]).map((skill) => (
                        <Text key={skill} style={styles.pill}>
                            {skill}
                        </Text>
                    ))}
                </View>
            )}

            {section.type === 'experience' && Array.isArray(section.items) && (
                <View style={{ marginTop: 6 }}>
                    {(section.items as ExperienceItem[]).map((item) => (
                        <View key={`${item.company}-${item.role}`} style={{ marginBottom: 10 }}>
                            <Text style={styles.subHeading}>{item.role}</Text>
                            <Text style={styles.meta}>
                                {item.company} • {item.time}
                            </Text>
                            <Text style={styles.body}>{item.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {section.type === 'projects' && Array.isArray(section.items) && (
                <View style={{ marginTop: 6 }}>
                    {(section.items as ProjectItem[]).map((project) => (
                        <View key={project.title} style={{ marginBottom: 8 }}>
                            <Text style={styles.subHeading}>{project.title}</Text>
                            <Text style={styles.body}>{project.description}</Text>
                            {project.tech && (
                                <View style={styles.pillRow}>
                                    {project.tech.map((tech) => (
                                        <Text key={tech} style={styles.pill}>
                                            {tech}
                                        </Text>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            )}

            {section.type === 'education' && Array.isArray(section.items) && (
                <View style={{ marginTop: 6 }}>
                    {(section.items as EducationItem[]).map((item) => (
                        <View key={item.degree} style={{ marginBottom: 8 }}>
                            <Text style={styles.subHeading}>{item.degree}</Text>
                            <Text style={styles.meta}>
                                {item.institution} • {item.time}
                            </Text>
                            {item.description && <Text style={styles.body}>{item.description}</Text>}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const ResumeDocument = ({ resume }: { resume: ResumeState }) => {
    const styles = stylesFromTheme(resume.theme);
    const orderedSections = [...resume.sections].sort((a, b) => a.order - b.order);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {orderedSections.map((section) => (
                    <SectionBlock key={section.id} section={section} theme={resume.theme} styles={styles} />
                ))}
            </Page>
        </Document>
    );
};

export const generateResumePDF = async (resume: ResumeState) => {
    const instance = pdf(<ResumeDocument resume={resume} />);
    const buffer = await instance.toBuffer();
    return buffer;
};

