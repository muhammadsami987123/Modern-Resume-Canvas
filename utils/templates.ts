import { Theme } from '@/store/resumeStore';

export interface Template {
    id: string;
    name: string;
    description: string;
    theme: Theme;
    preview?: string;
}

export const templates: Template[] = [
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Clean spacing with single accent color and thin dividers',
        theme: {
            accent: '#4F46E5',
            text: '#1F2937',
            background: '#ffffff',
            font: 'Inter',
            radius: '4px',
            headingSize: 26,
            bodySize: 16,
            bodyLineHeight: 1.6,
            sectionSpacing: 24,
            sectionPadding: 24,
        },
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'Left sidebar with background and bold section headers',
        theme: {
            accent: '#2563EB',
            text: '#111827',
            background: '#F9FAFB',
            font: 'Roboto',
            radius: '0px',
            headingSize: 28,
            bodySize: 15,
            bodyLineHeight: 1.5,
            sectionSpacing: 20,
            sectionPadding: 20,
        },
    },
    {
        id: 'gradient-accent',
        name: 'Gradient Accent',
        description: 'Gradient bar on top with accent bullets',
        theme: {
            accent: '#8B5CF6',
            text: '#1F2937',
            background: '#ffffff',
            font: 'Outfit',
            radius: '8px',
            headingSize: 30,
            bodySize: 16,
            bodyLineHeight: 1.65,
            sectionSpacing: 28,
            sectionPadding: 26,
        },
    },
    {
        id: 'rounded-cards',
        name: 'Rounded Cards',
        description: 'Each section wrapped in card with soft shadows',
        theme: {
            accent: '#10B981',
            text: '#374151',
            background: '#F3F4F6',
            font: 'Inter',
            radius: '16px',
            headingSize: 25,
            bodySize: 15,
            bodyLineHeight: 1.7,
            sectionSpacing: 32,
            sectionPadding: 28,
        },
    },
    {
        id: 'sidebar-highlight',
        name: 'Sidebar Highlight',
        description: 'Highlighted sidebar with modern typography',
        theme: {
            accent: '#F59E0B',
            text: '#1F2937',
            background: '#ffffff',
            font: 'Poppins',
            radius: '12px',
            headingSize: 27,
            bodySize: 15,
            bodyLineHeight: 1.55,
            sectionSpacing: 24,
            sectionPadding: 22,
        },
    },
];

export const getTemplateById = (id: string): Template | undefined => {
    return templates.find((template) => template.id === id);
};

export const applyTemplate = (templateId: string): Theme => {
    const template = getTemplateById(templateId);
    if (!template) {
        return templates[0].theme; // Default to minimal
    }
    return template.theme;
};
