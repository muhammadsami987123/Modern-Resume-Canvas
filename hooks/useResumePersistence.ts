'use client';

import { useEffect } from 'react';

import type { ResumeState } from '@/store/resumeStore';
import { useResumeStore } from '@/store/resumeStore';

const STORAGE_KEY = 'mrc-resume-state';

const debounce = <T extends (...args: unknown[]) => void>(fn: T, wait: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<T>) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            fn(...args);
        }, wait);
    };
};

const selectPersistableState = (state: ResumeState): ResumeState => ({
    layout: state.layout,
    theme: state.theme,
    sections: state.sections,
    activeTemplate: state.activeTemplate,
    selectedSection: state.selectedSection,
});

export const useResumePersistence = () => {
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as ResumeState;
                useResumeStore.setState(parsed);
            } catch (error) {
                console.warn('Failed to hydrate resume store from storage', error);
            }
        }

        const unsubscribe = useResumeStore.subscribe(
            debounce((state) => {
                const snapshot = selectPersistableState(state);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
            }, 500)
        );

        return () => {
            unsubscribe();
        };
    }, []);
};

