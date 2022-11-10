import { Component, OnInit } from '@angular/core';
import { SystemService } from "../../services/system.service";
import { SystemInformationEntity } from "../../+state/system/system-information.models";
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-plugins-page',
  templateUrl: './plugins-page.component.html',
  styleUrls: ['./plugins-page.component.css'],
})
export class PluginsPageComponent implements OnInit {
  systemInformation$: Observable<SystemInformationEntity> = of();
  constructor(private systemService: SystemService) {}

  ngOnInit(): void {
    this.systemInformation$ = this.systemService.getInformation();
  }
}
