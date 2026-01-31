import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from 'rc-tooltip';

interface SidebarIconButtonProps {
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
    badge?: number;
    className?: string;
}

export default function SidebarIconButton({
    icon,
    label,
    href,
    onClick,
    isActive = false,
    badge,
    className = '',
}: SidebarIconButtonProps) {
    const baseClasses = `
    relative flex items-center justify-center
    w-10 h-10 mx-auto my-1
    rounded-xl
    text-gray-500 dark:text-gray-400
    hover:bg-gray-100 dark:hover:bg-gray-800
    hover:text-gray-700 dark:hover:text-gray-200
    transition-all duration-150
    ${isActive ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : ''}
    ${className}
  `;

    const content = (
        <>
            <span className="text-lg">{icon}</span>
            {badge !== undefined && badge > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-medium text-white bg-red-500 rounded-full">
                    {badge > 99 ? '99+' : badge}
                </span>
            )}
        </>
    );

    const button = href ? (
        <Link to={href} className={baseClasses} aria-label={label}>
            {content}
        </Link>
    ) : (
        <button onClick={onClick} className={baseClasses} aria-label={label}>
            {content}
        </button>
    );

    return (
        <Tooltip placement="right" overlay={label}>
            {button}
        </Tooltip>
    );
}
