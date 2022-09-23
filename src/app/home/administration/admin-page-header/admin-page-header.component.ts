import {Component, Input, OnInit} from '@angular/core';
import {SystemService} from '../../../core/system.service';

@Component({
  selector: 'yd-admin-page-header',
  templateUrl: './admin-page-header.component.html',
  styleUrls: ['./admin-page-header.component.css']
})
export class AdminPageHeaderComponent implements OnInit {

  @Input() title: string = "";
  protected developerMode: boolean = false;

  constructor(private systemService: SystemService) {
    systemService.getInformation()
      .then(systemInformation => {
        this.developerMode = systemInformation.developerMode??false;
      });
  }

  ngOnInit() {
  }

}
