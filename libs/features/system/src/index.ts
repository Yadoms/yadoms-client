import * as SystemActions from './lib/+state/system/system.actions';

import * as SystemFeature from './lib/+state/system/system.reducer';

import * as SystemSelectors from './lib/+state/system/system.selectors';

export * from './lib/+state/system/system.models';

export { SystemActions, SystemFeature, SystemSelectors };
export * from './lib/features-system.module';

export * from './lib/component/system-page/system-page.component';
