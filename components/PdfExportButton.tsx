'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ResumeState, useResumeStore } from '@/store/resumeStore';

export default function PdfExportButton() {
    const snapshot = useResumeStore((state) => ({
        layout: state.layout,
        theme: state.theme,
        sections: state.sections,
        activeTemplate: state.activeTemplate,
        selectedSection: state.selectedSection,
    }));
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

    const handleExport = async () => {
        setStatus('loading');
        try {
            const payload: ResumeState = snapshot;
            const response = await fetch('/api/export', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to export PDF');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'resume.pdf';
            link.click();
            URL.revokeObjectURL(url);
            setStatus('idle');
        } catch (error) {
            console.error(error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 2500);
        }
    };

    return (
        <Button onClick={handleExport} size="sm" isLoading={status === 'loading'}>
            <Download className="h-4 w-4" />
            {status === 'error' ? 'Retry Export' : 'Export PDF'}
        </Button>
    );
}

