import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Inline chevron icons
const ChevronRightIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

interface MenuItem {
    id: string;
    label: string;
    href?: string;
    icon?: React.ReactNode;
    badge?: number;
    onClick?: () => void;
}

interface MenuSection {
    id: string;
    title: string;
    icon?: React.ReactNode;
    items: MenuItem[];
    collapsible?: boolean;
    defaultOpen?: boolean;
}

interface SidebarPanelProps {
    title: string;
    sections: MenuSection[];
    currentPage?: string;
    className?: string;
    appName?: string;
    currentUser?: any;
    appPath?: string;
    isAway?: boolean;
    onToggleAway?: () => void;
}

export default function SidebarPanel({
    title,
    sections,
    currentPage,
    className = '',
    appName,
    currentUser,
    appPath,
    isAway = false,
    onToggleAway,
}: SidebarPanelProps) {
    return (
        <div className={`flex flex-col h-full ${className}`}>
            {/* App Name Header - only show if appName provided */}
            {appName && (
                <div
                    className="flex-none flex items-center px-4 py-3 text-sm text-gray-500"
                    style={{ borderBottom: '1px solid #e9eae6' }}
                >
                    {appName}
                </div>
            )}

            {/* Submenu Header - matches Intercom's .submenu__header */}
            <div
                className="submenu__header flex-none flex items-center px-4 py-4"
                style={{ borderBottom: '1px solid #e9eae6' }}
            >
                <div className="flex-auto min-w-0 text-lg font-semibold text-gray-900">
                    {title}
                </div>
            </div>

            {/* Submenu Sections - matches Intercom's .submenu__sections */}
            <div className="submenu__sections flex-auto flex flex-col overflow-y-auto overflow-x-hidden py-2">
                {sections.map((section) => (
                    <div key={section.id} className="submenu__sections__section min-h-0 flex-none px-2">
                        {section.collapsible ? (
                            <CollapsibleMenuSection
                                section={section}
                                currentPage={currentPage}
                            />
                        ) : (
                            <>
                                {section.title && (
                                    <div className="submenu__sections__section__title flex-none py-2 px-3">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            {section.title}
                                        </span>
                                    </div>
                                )}
                                <div className="submenu__sections__section__items">
                                    {section.items.map((item) => (
                                        <MenuItemComponent
                                            key={item.id}
                                            item={item}
                                            isActive={currentPage === item.id}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* User Profile Footer */}
            {currentUser && appPath && (
                <div
                    className="flex-none px-3 py-3"
                    style={{ borderTop: '1px solid #e9eae6' }}
                >
                    <div className="flex items-center gap-3 px-2 py-2">
                        <Link
                            to={`${appPath}/agents/${currentUser.id}`}
                            className="flex-shrink-0"
                        >
                            <img
                                src={currentUser.avatarUrl}
                                alt={currentUser.email}
                                className="w-8 h-8 rounded-full object-cover bg-gray-200 hover:ring-2 hover:ring-gray-300 transition-all"
                            />
                        </Link>
                        <div className="flex-1 min-w-0">
                            <Link
                                to={`${appPath}/agents/${currentUser.id}`}
                                className="text-sm text-gray-900 truncate block hover:text-gray-600"
                            >
                                {currentUser.email?.split('@')[0] || 'User'}@...
                            </Link>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>Modo Ausente</span>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onToggleAway?.();
                                    }}
                                    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${isAway ? 'bg-green-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                                    role="switch"
                                    aria-checked={isAway}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAway ? 'translate-x-4' : 'translate-x-0'}`}
                                    />
                                </button>
                            </div>
                        </div>
                        <button
                            className="p-1 text-gray-400 hover:text-gray-600"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // TODO: Show user menu
                                console.log('Show user menu');
                            }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function CollapsibleMenuSection({
    section,
    currentPage
}: {
    section: MenuSection;
    currentPage?: string;
}) {
    const [isOpen, setIsOpen] = useState(section.defaultOpen ?? true);

    return (
        <div className="submenu__sections__section">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="submenu__sections__section__title flex-none flex items-center cursor-pointer"
            >
                <a className="submenu__sections__section__title__link flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <span className="flex-auto flex items-center">
                        {section.icon && <span className="mr-2">{section.icon}</span>}
                        {section.title}
                    </span>
                    <span className={`section__title__arrow flex-none mb-px transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.64906 3.89886C5.31711 4.23081 5.31711 4.769 5.64906 5.10094L8.54802 7.9999L5.64906 10.8989C5.31711 11.2308 5.31711 11.769 5.64906 12.1009C5.981 12.4329 6.51919 12.4329 6.85114 12.1009L10.3511 8.60094C10.6831 8.269 10.6831 7.73081 10.3511 7.39886L6.85114 3.89886C6.51919 3.56692 5.981 3.56692 5.64906 3.89886Z"></path>
                        </svg>
                    </span>
                </a>
            </div>
            {isOpen && (
                <div className="submenu__sections__section__items ml-2 mt-1">
                    {section.items.map((item) => (
                        <MenuItemComponent
                            key={item.id}
                            item={item}
                            isActive={currentPage === item.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function MenuItemComponent({ item, isActive }: { item: MenuItem; isActive: boolean }) {
    // Matches Intercom's menu item styling
    const baseClasses = `
        flex items-center px-3 py-2 text-sm rounded-lg transition-colors
        ${isActive
            ? 'bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white font-medium active-nav-item'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
        }
    `;

    const content = (
        <>
            {item.icon && <span className="mr-3 text-gray-400 w-4 h-4 flex-shrink-0">{item.icon}</span>}
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded">
                    {item.badge}
                </span>
            )}
        </>
    );

    if (item.href) {
        return (
            <Link to={item.href} className={baseClasses}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={item.onClick} className={`w-full ${baseClasses}`}>
            {content}
        </button>
    );
}
