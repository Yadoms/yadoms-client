import * as PluginActions from './lib/+state/plugins/plugins.actions';

import * as PluginFeature from './lib/+state/plugins/plugins.reducer';

import * as PluginSelectors from './lib/+state/plugins/plugins.selectors';

export * from './lib/+state/plugins/plugins.models';

export { PluginActions, PluginFeature, PluginSelectors };
export * from './lib/features-plugins.module';

export * from './lib/components/plugins-page/plugins-page.component';
