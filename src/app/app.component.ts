import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './common/services/loader.service';
import { fromEvent, of, merge, Observable } from 'rxjs';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isLoading = this.loaderServce.isHttpServiceLoading;
  constructor(public router: Router, private loaderServce: LoaderService) {
    window.deviceOnline = true;
  }
  title = 'vidyavahini';
  offline = false;
  online$: Observable<any>;

  ngOnInit() {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    );
    this.online$.subscribe((x: any) => {
      console.log('sub', x);
      let self = this;
      if (x === true || x.type === 'online') {
        this.offline = false;
        window.isDeviceOnline = true;
        if (localStorage.getItem('offlineExists') === 'yes') {
          localStorage.setItem('offlineExists', 'no');
        }
      } else if (x.type === 'offline') {
        window.isDeviceOnline = false;
        this.offline = true;
      }
    });
  }
}
