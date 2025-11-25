'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: number) => void;
}

export const Slider = ({ value, min = 0, max = 100, step = 1, onChange, className, ...props }: SliderProps) => (
    <div className="flex items-center gap-3">
        <input
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(event) => onChange(Number(event.target.value))}
            className={cn('h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-indigo-600', className)}
            {...props}
        />
        <span className="w-10 text-right text-xs font-medium text-gray-500">{value}</span>
    </div>
);

