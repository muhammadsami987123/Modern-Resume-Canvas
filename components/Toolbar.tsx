'use client';

import { LayoutGrid, Plus, RotateCcw } from 'lucide-react';

import PdfExportButton from '@/components/PdfExportButton';
import { Button } from '@/components/ui/button';
import { buildDefaultSectionStyle, Section, useResumeStore } from '@/store/resumeStore';

const layouts: Array<{ id: Section['column']; label: string; value: 'one-column' | 'two-column' | 'three-column' }> = [
    { id: 'left', label: 'Single', value: 'one-column' },
    { id: 'main', label: 'Split', value: 'two-column' },
    { id: 'right', label: 'Tri-Column', value: 'three-column' },
];

export default function Toolbar() {
    const layout = useResumeStore((state) => state.layout);
    const setLayout = useResumeStore((state) => state.setLayout);
    const resetResume = useResumeStore((state) => state.resetResume);
    const addSection = useResumeStore((state) => state.addSection);
    const sections = useResumeStore((state) => state.sections);
    const setSelectedSection = useResumeStore((state) => state.setSelectedSection);

    const handleAddSection = () => {
        const targetColumn = layout === 'one-column' ? 'main' : layout === 'two-column' ? 'main' : 'right';
        const newSection: Section = {
            id: `section-${Date.now()}`,
            type: 'custom',
            title: 'New Section',
            content: 'Start typing your content...',
            column: targetColumn,
            order: sections.filter((section) => (section.column ?? 'main') === targetColumn).length + 1,
            style: buildDefaultSectionStyle(),
        };
        addSection(newSection);
        setSelectedSection(newSection.id);
    };

    return (
        <div className="border-b border-gray-100 bg-white/90 px-6 py-4 backdrop-blur">
            <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-900">Modern Resume Canvas</p>
                        <p className="text-xs text-gray-500">Design, customize, and export in seconds</p>
                    </div>
                    <div className="hidden h-10 w-px bg-gray-200 md:block" />
                    <div className="flex items-center gap-2">
                        <LayoutGrid className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600">Layout</span>
                        <div className="flex gap-2">
                            {layouts.map(({ value, label }) => (
                                <Button
                                    key={value}
                                    variant={layout === value ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setLayout(value)}
                                >
                                    {label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="secondary" size="sm" onClick={handleAddSection}>
                        <Plus className="h-4 w-4" />
                        Add Section
                    </Button>
                    <Button variant="ghost" size="sm" onClick={resetResume}>
                        <RotateCcw className="h-4 w-4" />
                        Reset
                    </Button>
                    <PdfExportButton />
                </div>
            </div>
        </div>
    );
}
