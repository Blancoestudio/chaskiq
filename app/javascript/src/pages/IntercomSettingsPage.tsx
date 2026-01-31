import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import SettingsCard from '@chaskiq/components/src/components/SettingsCard';
import Content from '@chaskiq/components/src/components/Content';
import I18n from '../shared/FakeI18n';

import {
    SettingsIcon,
    KeyIcon,
    PlatformIcon,
    TagIcon,
    WriteIcon,
    ChatIcon,
    MailingIcon,
} from '@chaskiq/components/src/components/icons';

import {
    setCurrentPage,
    setCurrentSection,
} from '@chaskiq/store/src/actions/navigation';

import { allowedAccessTo } from '@chaskiq/components/src/components/AccessDenied';

function IntercomSettingsPage({ app, dispatch }) {
    const history = useHistory();
    const appPath = `/apps/${app.key}`;

    useEffect(() => {
        dispatch(setCurrentPage('app_settings'));
        dispatch(setCurrentSection('Settings'));
    }, []);

    const settingsGroups = [
        {
            title: 'Workspace',
            items: [
                {
                    id: 'app_settings',
                    title: I18n.t('settings.app.app_settings'),
                    description: 'Configure app name, logo, timezone and language settings',
                    icon: <SettingsIcon />,
                    iconColor: 'purple' as const,
                    href: `${appPath}/settings`,
                    allowed: allowedAccessTo(app, 'app_settings'),
                },
                {
                    id: 'team',
                    title: I18n.t('settings.team.title'),
                    description: 'Manage team members and their roles',
                    icon: <PlatformIcon />,
                    iconColor: 'blue' as const,
                    href: `${appPath}/team`,
                    allowed: allowedAccessTo(app, 'team'),
                },
                {
                    id: 'security',
                    title: 'Security',
                    description: 'Encryption keys and security settings',
                    icon: <KeyIcon />,
                    iconColor: 'yellow' as const,
                    href: `${appPath}/settings#security`,
                    allowed: allowedAccessTo(app, 'app_settings'),
                },
            ],
        },
        {
            title: 'Data',
            items: [
                {
                    id: 'tags',
                    title: I18n.t('settings.app.tags'),
                    description: 'Manage conversation and user tags',
                    icon: <TagIcon />,
                    iconColor: 'pink' as const,
                    href: `${appPath}/settings#tags`,
                    allowed: allowedAccessTo(app, 'app_settings'),
                },
                {
                    id: 'quick_replies',
                    title: I18n.t('settings.app.quick_replies'),
                    description: 'Create reusable message templates',
                    icon: <WriteIcon />,
                    iconColor: 'green' as const,
                    href: `${appPath}/settings#quick_replies`,
                    allowed: allowedAccessTo(app, 'app_settings'),
                },
            ],
        },
        {
            title: 'Channels',
            items: [
                {
                    id: 'messenger',
                    title: I18n.t('settings.messenger.title'),
                    description: 'Customize your messenger appearance and behavior',
                    icon: <ChatIcon />,
                    iconColor: 'teal' as const,
                    href: `${appPath}/messenger`,
                    allowed: allowedAccessTo(app, 'messenger_settings'),
                },
                {
                    id: 'email',
                    title: I18n.t('settings.app.email_forwarding'),
                    description: 'Configure email forwarding settings',
                    icon: <MailingIcon />,
                    iconColor: 'orange' as const,
                    href: `${appPath}/settings#email`,
                    allowed: allowedAccessTo(app, 'app_settings'),
                },
            ],
        },
    ];

    return (
        <Content>
            <div className="max-w-5xl mx-auto py-8 px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {I18n.t('navigator.settings')}
                    </h1>
                </div>

                {/* Settings Groups */}
                <div className="space-y-10">
                    {settingsGroups.map((group) => (
                        <div key={group.title}>
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                {group.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {group.items
                                    .filter((item) => item.allowed !== false)
                                    .map((item) => (
                                        <SettingsCard
                                            key={item.id}
                                            title={item.title}
                                            description={item.description}
                                            icon={item.icon}
                                            iconColor={item.iconColor}
                                            href={item.href}
                                        />
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Content>
    );
}

function mapStateToProps(state) {
    const { app } = state;
    return { app };
}

export default withRouter(connect(mapStateToProps)(IntercomSettingsPage));
