'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
}

export const Select = ({ options, className, ...props }: SelectProps) => (
    <select
        className={cn(
            'h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100',
            className
        )}
        {...props}
    >
        {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);

