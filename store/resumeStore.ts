import { create } from 'zustand';

export type LayoutOption = 'one-column' | 'two-column' | 'three-column';

export interface Theme {
    accent: string;
    text: string;
    background: string;
    font: string;
    radius: string;
    headingSize: number;
    bodySize: number;
    bodyLineHeight: number;
    sectionSpacing: number;
    sectionPadding: number;
}

export interface ExperienceItem {
    role: string;
    company: string;
    time: string;
    description: string;
}

export interface ProjectItem {
    title: string;
    description: string;
    tech: string[];
    link?: string;
}

export interface EducationItem {
    degree: string;
    institution: string;
    time: string;
    description?: string;
}

export type SectionType =
    | 'about'
    | 'experience'
    | 'projects'
    | 'skills'
    | 'education'
    | 'certifications'
    | 'contact'
    | 'custom';

export interface SectionStyle {
    fontSize: number;
    lineHeight: number;
    fontWeight: number;
    align: 'left' | 'center' | 'right' | 'justify';
}

export interface Section {
    id: string;
    type: SectionType;
    title: string;
    content?: string;
    items?: ExperienceItem[] | ProjectItem[] | EducationItem[] | string[];
    column?: 'left' | 'right' | 'main';
    order: number;
    style?: SectionStyle;
}

export interface ResumeState {
    layout: LayoutOption;
    theme: Theme;
    sections: Section[];
    activeTemplate: string;
    selectedSection: string | null;
}

interface ResumeStore extends ResumeState {
    setLayout: (layout: LayoutOption) => void;
    updateTheme: (theme: Partial<Theme>) => void;
    addSection: (section: Section) => void;
    updateSection: (id: string, updates: Partial<Section>) => void;
    updateSectionStyle: (id: string, updates: Partial<SectionStyle>) => void;
    deleteSection: (id: string) => void;
    reorderSections: (sections: Section[]) => void;
    setTemplate: (templateId: string) => void;
    setSelectedSection: (id: string | null) => void;
    resetResume: () => void;
}

const defaultSectionStyle = (): SectionStyle => ({
    fontSize: 16,
    lineHeight: 1.6,
    fontWeight: 500,
    align: 'left',
});

const createInitialSections = (): Section[] => [
    {
        id: 'about',
        type: 'about',
        title: 'About Me',
        content:
            'AI Engineer specializing in building intelligent systems and agentic workflows. Passionate about creating innovative solutions that leverage cutting-edge AI technologies.',
        column: 'left',
        order: 1,
        style: defaultSectionStyle(),
    },
    {
        id: 'contact',
        type: 'contact',
        title: 'Contact',
        content: 'email@example.com\n+1 (555) 123-4567\nLinkedIn: linkedin.com/in/yourprofile',
        column: 'left',
        order: 2,
        style: defaultSectionStyle(),
    },
    {
        id: 'skills',
        type: 'skills',
        title: 'Skills',
        items: ['Python', 'TypeScript', 'React', 'Next.js', 'AI/ML', 'LangChain', 'Vector Databases'],
        column: 'left',
        order: 3,
        style: defaultSectionStyle(),
    },
    {
        id: 'experience',
        type: 'experience',
        title: 'Experience',
        items: [
            {
                role: 'AI Engineer',
                company: 'Tech Company XYZ',
                time: '2023–Present',
                description:
                    'Built agentic workflows and intelligent automation systems. Developed AI-powered tools that improved productivity by 40%.',
            },
            {
                role: 'Software Developer',
                company: 'StartUp ABC',
                time: '2021–2023',
                description:
                    'Created full-stack applications using React and Node.js. Implemented CI/CD pipelines and automated testing.',
            },
        ] as ExperienceItem[],
        column: 'main',
        order: 1,
        style: defaultSectionStyle(),
    },
    {
        id: 'projects',
        type: 'projects',
        title: 'Projects',
        items: [
            {
                title: 'AI Resume Builder',
                description: 'A modern drag-and-drop resume builder with AI-powered suggestions',
                tech: ['Next.js', 'React', 'Tailwind CSS', 'Zustand'],
            },
            {
                title: 'Workflow Automation Platform',
                description: 'Built an intelligent workflow automation system using LangChain',
                tech: ['Python', 'LangChain', 'FastAPI', 'PostgreSQL'],
            },
        ] as ProjectItem[],
        column: 'main',
        order: 2,
        style: defaultSectionStyle(),
    },
    {
        id: 'education',
        type: 'education',
        title: 'Education',
        items: [
            {
                degree: 'Bachelor of Science in Computer Science',
                institution: 'University Name',
                time: '2017–2021',
                description: 'Focus on AI and Machine Learning',
            },
        ] as EducationItem[],
        column: 'main',
        order: 3,
        style: defaultSectionStyle(),
    },
];

export const buildDefaultSectionStyle = defaultSectionStyle;
export const buildInitialResumeState = (): ResumeState => ({
    layout: 'two-column',
    theme: {
        accent: '#4F46E5',
        text: '#1F2937',
        background: '#ffffff',
        font: 'Inter',
        radius: '10px',
        headingSize: 24,
        bodySize: 16,
        bodyLineHeight: 1.6,
        sectionSpacing: 24,
        sectionPadding: 24,
    },
    activeTemplate: 'minimal',
    selectedSection: null,
    sections: createInitialSections(),
});

export const useResumeStore = create<ResumeStore>((set) => ({
    ...buildInitialResumeState(),

    setLayout: (layout) => set({ layout }),

    updateTheme: (themeUpdates) =>
        set((state) => ({
            theme: { ...state.theme, ...themeUpdates },
        })),

    addSection: (section) =>
        set((state) => ({
            sections: [
                ...state.sections,
                {
                    ...section,
                    style: section.style ?? defaultSectionStyle(),
                    order:
                        section.order ??
                        state.sections.filter((item) => item.column === (section.column ?? 'main')).length + 1,
                },
            ],
        })),

    updateSection: (id, updates) =>
        set((state) => ({
            sections: state.sections.map((section) =>
                section.id === id
                    ? {
                        ...section,
                        ...updates,
                        style: updates.style
                            ? { ...defaultSectionStyle(), ...section.style, ...updates.style }
                            : section.style,
                    }
                    : section
            ),
        })),

    updateSectionStyle: (id, styleUpdates) =>
        set((state) => ({
            sections: state.sections.map((section) =>
                section.id === id
                    ? { ...section, style: { ...defaultSectionStyle(), ...section.style, ...styleUpdates } }
                    : section
            ),
        })),

    deleteSection: (id) =>
        set((state) => ({
            sections: state.sections.filter((section) => section.id !== id),
            selectedSection: state.selectedSection === id ? null : state.selectedSection,
        })),

    reorderSections: (sections) => set({ sections }),

    setTemplate: (templateId) => set({ activeTemplate: templateId }),

    setSelectedSection: (id) => set({ selectedSection: id }),

    resetResume: () => set(buildInitialResumeState()),
}));
