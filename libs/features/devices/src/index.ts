import * as DevicesActions from './lib/+state/devices/devices.actions';

import * as DevicesFeature from './lib/+state/devices/devices.reducer';

import * as DevicesSelectors from './lib/+state/devices/devices.selectors';

export * from './lib/+state/devices/devices.models';

export { DevicesActions, DevicesFeature, DevicesSelectors };
export * from './lib/features-devices.module';

export * from './lib/components/devices-page/devices-page.component';
