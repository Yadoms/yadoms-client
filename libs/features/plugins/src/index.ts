import * as PluginActions from './lib/+state/plugins/plugins.actions';

import * as PluginFeature from './lib/+state/plugins/plugins.reducer';

import * as PluginSelectors from './lib/+state/plugins/plugins.selectors';

import * as PluginsInstancesActions from './lib/+state/plugins-instances/plugins-instances.actions';

import * as PluginsInstancesFeature from './lib/+state/plugins-instances/plugins-instances.reducer';

import * as PluginsInstancesSelectors from './lib/+state/plugins-instances/plugins-instances.selectors';

export * from './lib/+state/plugins-instances/plugins-instances.models';

export {
  PluginsInstancesActions,
  PluginsInstancesFeature,
  PluginsInstancesSelectors,
};

export * from './lib/+state/plugins/plugins.models';

export { PluginActions, PluginFeature, PluginSelectors };
export * from './lib/features-plugins.module';

export * from './lib/components/plugins-page/plugins-page.component';
