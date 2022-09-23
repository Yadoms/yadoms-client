
import { Component, OnInit } from '@angular/core';
import { RestServerService } from '../core/restserver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'yd-check-server',
  templateUrl: './check-server.component.html',
  styleUrls: ['./check-server.component.css']
})
export class CheckServerComponent implements OnInit {
    public loading = false;
    public hasFailed = false;

    constructor(private router: Router) {
    }

    public ngOnInit() {
      this.checkServerIsAlive();
    }

    public checkServerIsAlive(): void {
        console.log('Check for server is alive');
        this.loading = false;
        this.hasFailed = false;
        this.router.navigate(['home']);
    }
}
