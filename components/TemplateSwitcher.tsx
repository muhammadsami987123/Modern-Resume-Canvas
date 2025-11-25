'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useResumeStore } from '@/store/resumeStore';
import { templates } from '@/utils/templates';

export default function TemplateSwitcher() {
    const activeTemplate = useResumeStore((state) => state.activeTemplate);
    const setTemplate = useResumeStore((state) => state.setTemplate);
    const updateTheme = useResumeStore((state) => state.updateTheme);

    const handleSelect = (templateId: string) => {
        const template = templates.find((item) => item.id === templateId);
        if (!template) {
            return;
        }
        setTemplate(templateId);
        updateTheme(template.theme);
    };

    return (
        <div className="space-y-3">
            {templates.map((template) => (
                <Button
                    key={template.id}
                    variant={activeTemplate === template.id ? 'default' : 'outline'}
                    className="w-full justify-between"
                    onClick={() => handleSelect(template.id)}
                >
                    <div>
                        <p className="text-left text-sm font-semibold">{template.name}</p>
                        <p
                            className={cn(
                                'text-xs',
                                activeTemplate === template.id ? 'text-white/80' : 'text-gray-500'
                            )}
                        >
                            {template.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="h-6 w-6 rounded" style={{ backgroundColor: template.theme.accent }} />
                        <span className="h-6 w-6 rounded border border-gray-200" style={{ backgroundColor: template.theme.background }} />
                        <span className="h-6 w-6 rounded border border-gray-200" style={{ backgroundColor: template.theme.text }} />
                    </div>
                </Button>
            ))}
        </div>
    );
}

