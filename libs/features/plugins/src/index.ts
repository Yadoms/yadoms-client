import * as PluginActions from './lib/+state/plugins/plugin.actions';

import * as PluginFeature from './lib/+state/plugins/plugin.reducer';

import * as PluginSelectors from './lib/+state/plugins/plugin.selectors';

export * from './lib/+state/plugins/plugin.models';

export { PluginActions as InformationActions, PluginFeature as InformationFeature, PluginSelectors };
export * from './lib/features-plugins.module';

export * from './lib/components/plugins-page/plugins-page.component';
