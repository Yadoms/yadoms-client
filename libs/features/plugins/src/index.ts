import * as InformationActions from './lib/+state/system/information/information.actions';

import * as InformationFeature from './lib/+state/system/information/information.reducer';

import * as InformationSelectors from './lib/+state/system/information/information.selectors';

export * from './lib/+state/system/information/information.models';

export { InformationActions, InformationFeature, InformationSelectors };
export * from './lib/features-plugins.module';

export * from './lib/components/plugins-page/plugins-page.component';
