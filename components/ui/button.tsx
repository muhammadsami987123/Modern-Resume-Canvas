'use client';

import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

type Variant = 'default' | 'secondary' | 'ghost' | 'outline';
type Size = 'default' | 'sm' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50',
};

const sizeClasses: Record<Size, string> = {
    default: 'h-11 px-5 text-sm',
    sm: 'h-9 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', isLoading = false, children, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-70',
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {children}
        </button>
    )
);

Button.displayName = 'Button';

