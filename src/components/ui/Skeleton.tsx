import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    className,
    variant = 'rectangular',
    width,
    height,
}) => {
    const baseClasses = 'animate-pulse bg-white/10 rounded';

    const variantClasses = {
        text: 'h-4 w-full',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    const style = {
        width: width,
        height: height,
    };

    return (
        <div
            className={cn(baseClasses, variantClasses[variant], className)}
            style={style}
        />
    );
};

// Predefined skeleton components
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
    lines = 1,
    className,
}) => (
    <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
                key={i}
                variant="text"
                className={i === lines - 1 ? 'w-3/4' : 'w-full'}
            />
        ))}
    </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('space-y-4', className)}>
        <Skeleton variant="rectangular" height={200} />
        <div className="space-y-2">
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-3/4" />
        </div>
    </div>
);

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({
    size = 40,
    className,
}) => (
    <Skeleton
        variant="circular"
        width={size}
        height={size}
        className={className}
    />
);

export const SkeletonButton: React.FC<{ className?: string }> = ({ className }) => (
    <Skeleton
        variant="rectangular"
        height={40}
        className={cn('w-24', className)}
    />
);

export const SkeletonTable: React.FC<{ rows?: number; columns?: number; className?: string }> = ({
    rows = 5,
    columns = 4,
    className,
}) => (
    <div className={cn('space-y-2', className)}>
        {/* Header */}
        <div className="flex space-x-4">
            {Array.from({ length: columns }).map((_, i) => (
                <Skeleton key={i} variant="text" className="flex-1" />
            ))}
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex space-x-4">
                {Array.from({ length: columns }).map((_, colIndex) => (
                    <Skeleton
                        key={colIndex}
                        variant="text"
                        className="flex-1"
                    />
                ))}
            </div>
        ))}
    </div>
); 