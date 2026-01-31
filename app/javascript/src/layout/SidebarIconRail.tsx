import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import layoutDefinitions from './layoutDefinitions';

import {
    DashboardIcon,
    PlatformIcon,
    ChatIcon,
    CampaignsIcon,
    BotIcon,
    HelpCenterIcon,
    ChartsIcons,
    SettingsIcon,
    SeachIcon as SearchIcon,
} from '@chaskiq/components/src/components/icons';

interface SidebarIconRailProps {
    app: any;
    currentSection: string;
    onSearch?: () => void;
    onSettings?: () => void;
    currentUser?: any;
}

interface NavItem {
    id: string;
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    badge?: number;
}

export default function SidebarIconRail({
    app,
    currentSection,
    onSearch,
    onSettings,
    currentUser,
}: SidebarIconRailProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const appPath = `/apps/${app.key}`;

    const mainNavItems: NavItem[] = [
        { id: 'Dashboard', icon: <DashboardIcon />, label: 'Dashboard', href: appPath },
        { id: 'Platform', icon: <PlatformIcon />, label: 'Contactos', href: `${appPath}/segments` },
        { id: 'Conversations', icon: <ChatIcon />, label: 'Inbox', href: `${appPath}/conversations`, badge: 4 },
        { id: 'Bot', icon: <BotIcon />, label: 'Bot', href: `${appPath}/bots/settings` },
        { id: 'HelpCenter', icon: <HelpCenterIcon />, label: 'Conocimiento', href: `${appPath}/articles` },
        { id: 'Reports', icon: <ChartsIcons />, label: 'Informes', href: `${appPath}/reports` },
        { id: 'Campaigns', icon: <CampaignsIcon />, label: 'Canales salientes', href: `${appPath}/campaigns` },
    ];

    const bottomNavItems: NavItem[] = [
        { id: 'Search', icon: <SearchIcon />, label: 'Buscar', onClick: onSearch },
        { id: 'Settings', icon: <SettingsIcon />, label: 'Ajustes', href: `${appPath}/settings` },
    ];

    const NavItemComponent = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
        const baseClasses = `
            flex items-center gap-3 px-3 py-2 my-0.5 rounded-lg cursor-pointer
            transition-all duration-200 ease-in-out
            ${isActive
                ? 'bg-orange-100 text-orange-600 font-medium'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }
        `;

        const content = (
            <>
                <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    {item.icon}
                </span>
                <span
                    className={`whitespace-nowrap text-sm transition-all duration-200 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                        }`}
                >
                    {item.label}
                </span>
                {item.badge !== undefined && item.badge > 0 && (
                    <span className={`
                        ml-auto px-1.5 py-0.5 text-xs font-medium rounded-full
                        ${isActive ? 'bg-orange-200 text-orange-700' : 'bg-blue-100 text-blue-600'}
                        ${isExpanded ? 'opacity-100' : 'opacity-0'}
                        transition-opacity duration-200
                    `}>
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
    };

    return (
        <div
            className="flex flex-col h-full py-3 transition-all duration-300 ease-in-out"
            style={{
                width: isExpanded ? '200px' : '48px',
                backgroundColor: isExpanded ? '#fbfbf9' : 'transparent',
                borderRadius: isExpanded ? '0 16px 16px 0' : '0',
                boxShadow: isExpanded ? '0px 4px 16px rgba(0, 0, 0, 0.12)' : 'none',
            }}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            {/* Logo */}
            <div className={`flex items-center gap-3 px-3 mb-4 ${isExpanded ? '' : 'justify-center'}`}>
                <Link to="/apps" className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={layoutDefinitions().companyLogo} alt="Logo" className="w-full h-full object-cover" />
                </Link>
                {isExpanded && (
                    <button className="ml-auto text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h14M5 12h14M5 19h14" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 flex flex-col gap-0.5 px-1.5 overflow-y-auto">
                {mainNavItems.map((item) => (
                    <NavItemComponent
                        key={item.id}
                        item={item}
                        isActive={currentSection === item.id}
                    />
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-0.5 px-1.5 pt-3 mt-2" style={{ borderTop: '1px solid #e9eae6' }}>
                {bottomNavItems.map((item) => (
                    <NavItemComponent
                        key={item.id}
                        item={item}
                        isActive={currentSection === item.id}
                    />
                ))}

                {/* User Avatar */}
                {currentUser && (
                    <Link
                        to={`${appPath}/agents/${currentUser.id}`}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${isExpanded ? '' : 'justify-center'}`}
                    >
                        <img
                            src={currentUser.avatarUrl}
                            alt={currentUser.email}
                            className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                        />
                        {isExpanded && (
                            <span className="text-sm text-gray-600 truncate">Perfil</span>
                        )}
                    </Link>
                )}
            </div>
        </div>
    );
}
