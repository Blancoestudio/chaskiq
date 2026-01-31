import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import I18n from '../shared/FakeI18n';

import Content from '@chaskiq/components/src/components/Content';
import SettingsCard from '@chaskiq/components/src/components/SettingsCard';

import {
  setCurrentPage,
  setCurrentSection,
} from '@chaskiq/store/src/actions/navigation';

import settingsItems from '../layout/settingsItems';

// Color mapping for different setting types
const iconColors: Record<string, 'pink' | 'purple' | 'yellow' | 'green' | 'blue' | 'orange' | 'teal' | 'gray'> = {
  app_settings: 'purple',
  security: 'yellow',
  team: 'blue',
  integrations: 'green',
  webhooks: 'orange',
  api: 'teal',
  billing: 'pink',
  messenger: 'blue',
};

function AppSettingsContainer({ app, dispatch }) {
  const items = settingsItems(app, () => false).filter((o) => o.allowed);

  React.useEffect(() => {
    dispatch(setCurrentPage('app_settings'));
    dispatch(setCurrentSection('Settings'));
  }, []);

  return (
    <Content>
      {app && (
        <div className="max-w-5xl mx-auto py-8 px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {I18n.t('settings.app.app_settings')}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your workspace settings
            </p>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <SettingsCard
                key={`settings-item-${item.url}`}
                title={item.label}
                description={item.description || ''}
                icon={item.icon}
                iconColor={iconColors[item.id] || 'gray'}
                href={item.url}
              />
            ))}
          </div>
        </div>
      )}
    </Content>
  );
}

function mapStateToProps(state) {
  const { app, navigation } = state;
  const { current_section } = navigation;
  return {
    app,
    current_section,
  };
}

export default withRouter(connect(mapStateToProps)(AppSettingsContainer));
