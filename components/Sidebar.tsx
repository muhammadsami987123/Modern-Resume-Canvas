'use client';

import { Palette, LayoutGrid, Type } from 'lucide-react';
import { useState } from 'react';

import EditorPanel from '@/components/EditorPanel';
import TemplateSwitcher from '@/components/TemplateSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import type { Theme } from '@/store/resumeStore';
import { useResumeStore } from '@/store/resumeStore';

type Tab = 'theme' | 'templates' | 'typography';

const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Outfit', label: 'Outfit' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Playfair Display', label: 'Playfair Display' },
    { value: 'Lora', label: 'Lora' },
    { value: 'Montserrat', label: 'Montserrat' },
];

const tabs: Array<{ id: Tab; label: string; icon: React.ElementType }> = [
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'templates', label: 'Templates', icon: LayoutGrid },
    { id: 'typography', label: 'Typography', icon: Type },
];

export default function Sidebar() {
    const [activeTab, setActiveTab] = useState<Tab>('theme');
    const theme = useResumeStore((state) => state.theme);
    const updateTheme = useResumeStore((state) => state.updateTheme);

    return (
        <div className="w-96 border-l border-gray-100 bg-white/90 backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
                {tabs.map(({ id, label, icon: Icon }) => (
                    <Button
                        key={id}
                        variant={activeTab === id ? 'default' : 'ghost'}
                        size="sm"
                        className="flex-1"
                        onClick={() => setActiveTab(id)}
                    >
                        <Icon className="mr-2 h-4 w-4" />
                        {label}
                    </Button>
                ))}
            </div>

            <div className="space-y-6 overflow-y-auto px-6 py-6">
                {activeTab === 'theme' && <ThemeControls theme={theme} updateTheme={updateTheme} />}
                {activeTab === 'templates' && <TemplateSwitcher />}
                {activeTab === 'typography' && <TypographyControls theme={theme} updateTheme={updateTheme} />}

                <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Section Editor</p>
                    <EditorPanel />
                </div>
            </div>
        </div>
    );
}

const ThemeControls = ({
    theme,
    updateTheme,
}: {
    theme: Theme;
    updateTheme: (theme: Partial<Theme>) => void;
}) => (
    <div className="space-y-5">
        <ColorControl
            label="Accent Color"
            value={theme.accent}
            onChange={(value) => updateTheme({ accent: value })}
        />
        <ColorControl label="Text Color" value={theme.text} onChange={(value) => updateTheme({ text: value })} />
        <ColorControl
            label="Background Color"
            value={theme.background}
            onChange={(value) => updateTheme({ background: value })}
        />
        <div>
            <Label>Border Radius</Label>
            <Slider
                className="mt-2"
                value={parseInt(theme.radius, 10)}
                min={0}
                max={32}
                onChange={(value) => updateTheme({ radius: `${value}px` })}
            />
        </div>
        <div>
            <Label>Section Padding</Label>
            <Slider
                className="mt-2"
                value={theme.sectionPadding}
                min={12}
                max={48}
                onChange={(value) => updateTheme({ sectionPadding: value })}
            />
        </div>
        <div>
            <Label>Section Spacing</Label>
            <Slider
                className="mt-2"
                value={theme.sectionSpacing}
                min={8}
                max={48}
                onChange={(value) => updateTheme({ sectionSpacing: value })}
            />
        </div>
    </div>
);

const TypographyControls = ({
    theme,
    updateTheme,
}: {
    theme: Theme;
    updateTheme: (theme: Partial<Theme>) => void;
}) => (
    <div className="space-y-5">
        <div>
            <Label>Font Family</Label>
            <Select
                className="mt-2"
                value={theme.font}
                onChange={(event) => updateTheme({ font: event.target.value })}
                options={fontOptions}
            />
        </div>
        <div>
            <Label>Heading Size</Label>
            <Slider
                className="mt-2"
                value={theme.headingSize}
                min={20}
                max={42}
                onChange={(value) => updateTheme({ headingSize: value })}
            />
        </div>
        <div>
            <Label>Body Size</Label>
            <Slider
                className="mt-2"
                value={theme.bodySize}
                min={12}
                max={24}
                onChange={(value) => updateTheme({ bodySize: value })}
            />
        </div>
        <div>
            <Label>Body Line Height</Label>
            <Slider
                className="mt-2"
                value={theme.bodyLineHeight}
                min={1}
                max={2}
                step={0.05}
                onChange={(value) => updateTheme({ bodyLineHeight: Number(value.toFixed(2)) })}
            />
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
            <p className="text-xs uppercase text-gray-500">Preview</p>
            <p className="mt-2 text-base text-gray-800" style={{ fontFamily: theme.font }}>
                The quick brown fox jumps over the lazy dog.
            </p>
        </div>
    </div>
);

const ColorControl = ({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) => (
    <div>
        <Label>{label}</Label>
        <div className="mt-2 flex items-center gap-3">
            <input
                type="color"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-11 w-11 cursor-pointer rounded-lg border border-gray-200"
            />
            <Input value={value} onChange={(event) => onChange(event.target.value)} className="flex-1" />
        </div>
    </div>
);
