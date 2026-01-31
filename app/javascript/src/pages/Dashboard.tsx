import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import WebSetup from '@chaskiq/components/src/components/webSetup';
import Badge from '@chaskiq/components/src/components/Badge';
import { useHistory } from 'react-router-dom';
import I18n from '../shared/FakeI18n';

import Content from '@chaskiq/components/src/components/Content';
import IconBadge from '@chaskiq/components/src/components/IconBadge';
import SettingsCard from '@chaskiq/components/src/components/SettingsCard';

import { escapeHTML } from '@chaskiq/components/src/utils/htmlSanitize';

import {
  ConversationChatIcon,
  CampaignsIcon,
  SettingsIcon,
  HelpCenterIcon,
  AppSettingsIcon,
  ChartsIcons,
  ChatIcon,
  MailingIcon,
  PlatformIcon,
} from '@chaskiq/components/src/components/icons';

import {
  setCurrentSection,
  setCurrentPage,
} from '@chaskiq/store/src/actions/navigation';
import { LinkButton } from '@chaskiq/components/src/components/RouterLink';

import { allowedAccessTo } from '@chaskiq/components/src/components/AccessDenied';

export function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
    </div>
  );
}

function Dashboard(props) {
  const { app, dispatch } = props;

  React.useEffect(() => {
    dispatch(setCurrentSection('Dashboard'));
    dispatch(setCurrentPage(null));
  }, []);

  const history = useHistory();
  const appPath = `/apps/${app.key}`;

  // Onboarding steps like Intercom
  const onboardingSteps = [
    {
      id: 'channels',
      title: 'Configure channels to communicate with your customers',
      description: 'Manage conversations on all channels: Messenger, email, WhatsApp, SMS, and social networks.',
      action: 'Configure channels',
      actionHref: `${appPath}/messenger`,
      completed: app.activeMessenger,
    },
    {
      id: 'team',
      title: 'Invite your team members to collaborate faster',
      description: 'Add team members to help respond to customers and manage conversations.',
      action: 'Invite team',
      actionHref: `${appPath}/team`,
      completed: false,
    },
    {
      id: 'content',
      title: 'Add content to power your AI and help center',
      description: 'Create articles and knowledge base content to help customers self-serve.',
      action: 'Create content',
      actionHref: `${appPath}/articles`,
      completed: false,
    },
  ];

  // "Go further" cards
  // "Go further" cards
  const furtherCards = [
    {
      id: 'conversations',
      title: I18n.t('conversations.title'),
      description: I18n.t('dashboard.incoming_messages'),
      icon: <ConversationChatIcon />,
      iconColor: 'green' as const,
      href: `${appPath}/conversations`,
      allowed: allowedAccessTo(app, 'conversations'),
    },
    {
      id: 'messenger',
      title: I18n.t('settings.active_messenger.label'), // "Activate messenger" or similar
      description: 'Configure your chat widget',
      icon: <PlatformIcon />,
      iconColor: 'blue' as const,
      href: `${appPath}/messenger`,
      allowed: allowedAccessTo(app, 'messenger_settings'),
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      description: 'Track metrics and understand how your team is performing.',
      icon: <ChartsIcons />,
      iconColor: 'purple' as const,
      href: `${appPath}/reports`,
      allowed: allowedAccessTo(app, 'reports'),
    },
    {
      id: 'campaigns',
      title: 'Campaigns',
      description: 'Send targeted messages to your customers.',
      icon: <MailingIcon />,
      iconColor: 'blue' as const,
      href: `${appPath}/campaigns`,
      allowed: allowedAccessTo(app, 'campaigns'),
    },
    {
      id: 'settings',
      title: 'App Settings',
      description: 'Configure your workspace settings.',
      icon: <SettingsIcon />,
      iconColor: 'gray' as const,
      href: `${appPath}/settings`,
      allowed: allowedAccessTo(app, 'app_settings'),
    },
    {
      id: 'guides',
      title: I18n.t('dashboard.guides'),
      description: I18n.t('articles.help_center'),
      icon: <HelpCenterIcon />,
      iconColor: 'yellow' as const,
      href: `${appPath}/articles`,
      allowed: allowedAccessTo(app, 'help_center'),
    },
  ];

  const completedCount = onboardingSteps.filter(s => s.completed).length;

  return (
    <Content>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Welcome Header */}
        {/* Welcome Header */}
        <div className="flex justify-between items-center mb-8">
          <h1
            className="text-3xl font-bold text-gray-900 dark:text-gray-100"
            dangerouslySetInnerHTML={{
              __html: I18n.t('dashboard.hey', {
                name: escapeHTML(app.name),
              }),
            }}
          />
          <div className="flex space-x-2">
            <WebSetup />
            <a
              href={`/tester/${app.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Chat tester
            </a>
            <Link
              to="/playground"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Playground
            </Link>
          </div>
        </div>

        {/* Onboarding Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-sm font-medium text-gray-500">
              Configure • {completedCount}/{onboardingSteps.length} steps
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            {onboardingSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start p-5 ${index !== onboardingSteps.length - 1
                  ? 'border-b border-gray-100 dark:border-gray-700'
                  : ''
                  }`}
              >
                {/* Status Circle */}
                <div className="flex-shrink-0 mr-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${step.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 dark:border-gray-600'
                    }`}>
                    {step.completed && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {step.description}
                  </p>
                  {!step.completed && (
                    <Link
                      to={step.actionHref}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      {step.action}
                    </Link>
                  )}
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 ml-4">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Go Further Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Go further
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {furtherCards
              .filter((card) => card.allowed !== false)
              .map((card) => (
                <SettingsCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  iconColor={card.iconColor}
                  href={card.href}
                />
              ))}
          </div>
        </div>
      </div>
    </Content>
  );
}

function mapStateToProps(state) {
  const { auth, app } = state;
  const { loading, isAuthenticated } = auth;

  return {
    app,
    loading,
    isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(Dashboard));
