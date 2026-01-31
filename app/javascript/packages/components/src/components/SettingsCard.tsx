import React from 'react';
import { Link } from 'react-router-dom';
import IconBadge from './IconBadge';

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

interface SettingsCardProps {
    title: string;
    description?: string;
    icon: React.ReactNode;
    iconColor?: IconBadgeColor;
    href?: string;
    onClick?: () => void;
    className?: string;
}

export default function SettingsCard({
    title,
    description,
    icon,
    iconColor = 'gray',
    href,
    onClick,
    className = '',
}: SettingsCardProps) {
    const cardContent = (
        <>
            <div className="flex-shrink-0">
                <IconBadge icon={icon} color={iconColor} size="md" />
            </div>
            <div className="ml-4 flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {title}
                </h3>
                {description && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
        </>
    );

    const baseClasses = `
    flex items-start p-4 
    bg-white dark:bg-gray-800 
    rounded-xl 
    border border-gray-100 dark:border-gray-700
    hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600
    transition-all duration-200
    cursor-pointer
    ${className}
  `;

    if (href) {
        return (
            <Link to={href} className={baseClasses}>
                {cardContent}
            </Link>
        );
    }

    return (
        <div onClick={onClick} className={baseClasses}>
            {cardContent}
        </div>
    );
}
