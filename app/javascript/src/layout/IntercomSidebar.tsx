import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SidebarIconRail from './SidebarIconRail';
import SidebarPanel from './SidebarPanel';
import LangChooser from '@chaskiq/components/src/components/LangChooser';

import {
    ConversationChatIcon,
    AssignmentIcon,
    WriteIcon,
    MailingIcon,
    AutoMessages,
    BannersIcon,
    ToursIcon,
    OutboundIcon,
    NewconversationIcon,
    SettingsIcon,
    ArticlesIcon,
    CollectionsIcon,
    PlatformIcon,
} from '@chaskiq/components/src/components/icons';

import I18n from '../shared/FakeI18n';
import { allowedAccessTo } from '@chaskiq/components/src/components/AccessDenied';
import app_settings_items from './settingsItems';

function mapStateToProps(state) {
    const { drawer, app, current_user, navigation } = state;
    return {
        current_user,
        app,
        navigation,
        drawer,
    };
}

function IntercomSidebar({ app, navigation, current_user, drawer, location }) {
    const { current_page, current_section } = navigation;
    const [langChooser, setLangChooser] = useState(false);
    const [isAway, setIsAway] = useState(false);

    const appPath = `/apps/${app.key}`;

    // Build sections based on current_section
    const getSectionsForSection = () => {
        switch (current_section) {
            case 'Conversations':
                return [
                    {
                        id: 'inbox',
                        title: '',
                        items: [
                            { id: 'NewConversation', label: I18n.t('navigator.childs.conversations_new'), href: `${appPath}/conversations/new`, icon: <WriteIcon /> },
                            { id: 'Conversations', label: I18n.t('navigator.childs.conversations'), href: `${appPath}/conversations`, icon: <ConversationChatIcon /> },
                            { id: 'AssignmentRules', label: I18n.t('navigator.childs.assignment_rules'), href: `${appPath}/conversations/assignment_rules`, icon: <AssignmentIcon /> },
                        ],
                    },
                    {
                        id: 'conversations-filters',
                        title: 'Conversaciones',
                        collapsible: true,
                        defaultOpen: true,
                        items: [
                            { id: 'all-conversations', label: 'Todas las conve...', href: `${appPath}/conversations`, badge: 0 },
                            { id: 'not-assigned', label: 'No Asignado', href: `${appPath}/conversations?filter=unassigned`, badge: 0 },
                            { id: 'assigned-to-me', label: 'Assigned to me', href: `${appPath}/conversations?filter=mine`, badge: 0 },
                            { id: 'bot', label: 'chaskiq bot', href: `${appPath}/conversations?filter=bot`, badge: 0 },
                        ],
                    },
                    {
                        id: 'channels',
                        title: 'Channels',
                        collapsible: true,
                        defaultOpen: false,
                        items: [],
                    },
                    {
                        id: 'tags',
                        title: 'Etiquetas',
                        collapsible: true,
                        defaultOpen: false,
                        items: [],
                    },
                ];

            case 'Platform':
                const segmentItems = (app.segments || [])
                    .filter((s: any) => s.name !== 'All Users')
                    .map((segment: any) => ({
                        id: `segment-${segment.id}`,
                        label: segment.name,
                        href: `${appPath}/segments/${segment.id}`,
                        badge: 0
                    }));

                return [
                    {
                        id: 'platform',
                        title: '',
                        items: [
                            { id: 'all-users', label: 'All Users', href: `${appPath}/segments`, badge: 0 },
                            ...segmentItems,
                            { id: 'companies', label: 'Empresas', href: `${appPath}/companies`, icon: <PlatformIcon /> },
                            { id: 'imports', label: 'Importar', href: `${appPath}/imports`, icon: <WriteIcon /> },
                        ],
                    },
                ];

            case 'Campaigns':
                return [
                    {
                        id: 'campaigns',
                        title: '',
                        items: [
                            { id: 'campaigns', label: I18n.t('navigator.childs.mailing_campaigns'), href: `${appPath}/messages/campaigns`, icon: <MailingIcon /> },
                            { id: 'user_auto_messages', label: I18n.t('navigator.childs.in_app_messages'), href: `${appPath}/messages/user_auto_messages`, icon: <AutoMessages /> },
                            { id: 'banners', label: I18n.t('navigator.childs.banners'), href: `${appPath}/messages/banners`, icon: <BannersIcon /> },
                            { id: 'tours', label: I18n.t('navigator.childs.guided_tours'), href: `${appPath}/messages/tours`, icon: <ToursIcon /> },
                        ],
                    },
                ];

            case 'Bot':
                return [
                    {
                        id: 'bots',
                        title: '',
                        items: [
                            { id: 'outbound', label: I18n.t('navigator.childs.outbound'), href: `${appPath}/bots/outbound`, icon: <OutboundIcon /> },
                            { id: 'user_conversations', label: I18n.t('navigator.childs.new_conversations'), href: `${appPath}/bots/new_conversations`, icon: <NewconversationIcon /> },
                            { id: 'Settings', label: I18n.t('navigator.childs.bot_settings'), href: `${appPath}/bots/settings`, icon: <SettingsIcon /> },
                        ],
                    },
                ];

            case 'HelpCenter':
                return [
                    {
                        id: 'articles',
                        title: '',
                        items: [
                            { id: 'Articles', label: I18n.t('navigator.childs.articles'), href: `${appPath}/articles`, icon: <ArticlesIcon /> },
                            { id: 'Collections', label: I18n.t('navigator.childs.collections'), href: `${appPath}/articles/collections`, icon: <CollectionsIcon /> },
                            { id: 'Settings', label: I18n.t('navigator.childs.article_settings'), href: `${appPath}/articles/settings`, icon: <SettingsIcon /> },
                        ],
                    },
                ];

            case 'Settings':
                const settingsItems = app_settings_items(app, (page) => current_page === page);
                return [
                    {
                        id: 'settings',
                        title: '',
                        items: settingsItems.filter(item => item.allowed !== false).map(item => ({
                            id: item.id,
                            label: item.label,
                            href: item.url,
                            icon: item.icon,
                        })),
                    },
                ];

            default:
                return [];
        }
    };

    const getSectionTitle = () => {
        switch (current_section) {
            case 'Dashboard': return 'Dashboard';
            case 'Platform': return I18n.t('navigator.platform');
            case 'Conversations': return 'Inbox';
            case 'Campaigns': return I18n.t('navigator.campaigns');
            case 'Bot': return I18n.t('navigator.routing_bots');
            case 'HelpCenter': return I18n.t('navigator.help_center');
            case 'Reports': return 'Reports';
            case 'Settings': return I18n.t('navigator.settings');
            default: return app.name;
        }
    };

    const drawerClass = !drawer.open ? 'hidden' : 'fixed flex md:flex-shrink-0 z-50 h-full';

    // Check if we are on a profile page where we want maximum space
    const isProfilePage = location?.pathname?.includes('/agents/') || location?.pathname?.includes('/users/');

    const hasPanelContent = !isProfilePage && current_section && getSectionsForSection().length > 0;

    return (
        <div className="flex h-full">
            {/* Nav Container - Icon Rail (matching Intercom's .nav__container) */}
            <div className="nav__container relative h-full flex-shrink-0" style={{ width: '48px', zIndex: 50 }}>
                <div className="nav__module absolute left-0 overflow-visible"
                    style={{
                        top: '12px',
                        bottom: '12px'
                    }}
                >
                    <SidebarIconRail
                        app={app}
                        currentSection={current_section}
                        currentUser={current_user}
                        onSearch={() => console.log('Search clicked')}
                    />
                </div>
            </div>

            {/* Layout Module Left Slot - Panel (matching Intercom's layout__module__left-slot) */}
            {hasPanelContent && (
                <div className="layout__module__left-slot flex items-stretch flex-shrink-0"
                    style={{ padding: '12px', paddingLeft: '12px' }}
                >
                    <div
                        className="layout__module__left-slot-item flex-shrink-0 overflow-hidden"
                        style={{
                            width: '230px',
                            height: '100%',
                            backgroundColor: '#fbfbf9',
                            borderRadius: '16px',
                            boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.08), 0px 0px 0px 1px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        <SidebarPanel
                            title={getSectionTitle()}
                            sections={getSectionsForSection()}
                            currentPage={current_page}
                            appName={app.name}
                            currentUser={current_user}
                            appPath={appPath}
                            isAway={isAway}
                            onToggleAway={() => setIsAway(!isAway)}
                        />
                    </div>
                </div>
            )}

            {langChooser && (
                <LangChooser open={langChooser} handleClose={setLangChooser} />
            )}
        </div>
    );
}

export default withRouter(connect(mapStateToProps)(IntercomSidebar));
