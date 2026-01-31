import React from 'react';

type IconBadgeColor =
    | 'pink'
    | 'purple'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'orange'
    | 'red'
    | 'gray'
    | 'teal';

type IconBadgeSize = 'sm' | 'md' | 'lg';

interface IconBadgeProps {
    icon: React.ReactNode;
    color?: IconBadgeColor;
    size?: IconBadgeSize;
    className?: string;
}

const colorClasses: Record<IconBadgeColor, string> = {
    pink: 'bg-pink-100 text-pink-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-700',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    gray: 'bg-gray-100 text-gray-600',
    teal: 'bg-teal-100 text-teal-600',
};

const sizeClasses: Record<IconBadgeSize, string> = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
};

export default function IconBadge({
    icon,
    color = 'gray',
    size = 'md',
    className = ''
}: IconBadgeProps) {
    return (
        <div
            className={`
        inline-flex items-center justify-center 
        rounded-xl
        ${colorClasses[color]}
        ${sizeClasses[size]}
        ${className}
      `}
        >
            {icon}
        </div>
    );
}
