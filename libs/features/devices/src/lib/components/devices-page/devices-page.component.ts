import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DeviceEntity } from '../../+state/devices/devices.models';
import { Store } from '@ngrx/store';
import { DevicesActions, DevicesSelectors } from '../../../index';

@Component({
  selector: 'yadoms-devices-page',
  templateUrl: './devices-page.component.html',
  styleUrls: ['./devices-page.component.scss'],
})
export class DevicesPageComponent implements OnInit {
  devices: Observable<DeviceEntity[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(DevicesActions.initDevices());
    this.devices = this.store.select(
      DevicesSelectors.getAllDevices
    );

  }
}
