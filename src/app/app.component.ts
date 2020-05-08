import { LocalService } from './shared/services/local.service';
import { Component } from '@angular/core';
import { ConnNotificationService } from './shared/services/connNotification.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  connStatus: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _apiService: ApiService,
    private _localService: LocalService,
    private _connService: ConnNotificationService) {
    this._connService.getMessage().subscribe(val => {
      this.connStatus = val
      // console.log(val)
      if (this.connStatus == true) {
        this.router.navigate(['/home'])
      } else {
        this.router.navigate(['/ac/login'])
      }
    })
  }

  ngOnInit(): void { }

  onLogin() {
    this.router.navigate(['/ac/login']);
  }

  onLogout() {
    this._connService.sendMessage(false)
    this.router.navigate(['/ac/login']);
    localStorage.removeItem('userData')
    this._localService.localStorage = null;
  }

}
