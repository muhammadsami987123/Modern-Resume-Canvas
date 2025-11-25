'use client';

import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Section, useResumeStore } from '@/store/resumeStore';

const alignmentOptions = [
    { value: 'left', label: 'Left', icon: AlignLeft },
    { value: 'center', label: 'Center', icon: AlignCenter },
    { value: 'right', label: 'Right', icon: AlignRight },
    { value: 'justify', label: 'Justify', icon: AlignJustify },
] as const;

const sectionColumns = [
    { value: 'left', label: 'Sidebar' },
    { value: 'main', label: 'Main' },
    { value: 'right', label: 'Extra' },
];

const textEditableTypes: Section['type'][] = ['about', 'contact', 'custom'];

export default function EditorPanel() {
    const selectedSectionId = useResumeStore((state) => state.selectedSection);
    const sections = useResumeStore((state) => state.sections);
    const updateSection = useResumeStore((state) => state.updateSection);
    const updateSectionStyle = useResumeStore((state) => state.updateSectionStyle);
    
    const section = useMemo(
        () => sections.find((item) => item.id === selectedSectionId),
        [sections, selectedSectionId]
    );

    if (!selectedSectionId || !section) {
        return (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white/60 p-6 text-sm text-gray-500">
                Select a section on the canvas to edit typography, alignment, and column placement.
            </div>
        );
    }

    const style = section.style ?? {};

    return (
        <div className="space-y-5 rounded-2xl border border-gray-100 bg-white/70 p-5 shadow-sm">
            <div>
                <Label>Section Title</Label>
                <Input
                    value={section.title}
                    className="mt-2"
                    onChange={(event) => updateSection(section.id, { title: event.target.value })}
                />
            </div>

            {textEditableTypes.includes(section.type) && (
                <div>
                    <Label>Content</Label>
                    <Textarea
                        rows={4}
                        className="mt-2"
                        value={section.content ?? ''}
                        onChange={(event) => updateSection(section.id, { content: event.target.value })}
                    />
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Font Size</Label>
                    <Slider
                        className="mt-3"
                        value={style.fontSize ?? 16}
                        min={12}
                        max={28}
                        onChange={(value) => updateSectionStyle(section.id, { fontSize: value })}
                    />
                </div>
                <div>
                    <Label>Line Height</Label>
                    <Slider
                        className="mt-3"
                        value={style.lineHeight ?? 1.6}
                        min={1}
                        max={2}
                        step={0.05}
                        onChange={(value) => updateSectionStyle(section.id, { lineHeight: Number(value.toFixed(2)) })}
                    />
                </div>
            </div>

            <div>
                <Label>Alignment</Label>
                <div className="mt-2 flex items-center gap-2">
                    {alignmentOptions.map(({ value, icon: Icon }) => (
                        <Button
                            key={value}
                            variant={style.align === value ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => updateSectionStyle(section.id, { align: value as Section['style']['align'] })}
                        >
                            <Icon className="h-4 w-4" />
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <Label>Column Placement</Label>
                <Select
                    className="mt-2"
                    value={section.column ?? 'main'}
                    onChange={(event) => updateSection(section.id, { column: event.target.value as Section['column'] })}
                    options={sectionColumns}
                />
            </div>
        </div>
    );
}

