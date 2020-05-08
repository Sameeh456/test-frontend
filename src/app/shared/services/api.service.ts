import { LocalService } from './local.service';
import { ConnNotificationService } from './connNotification.service';
import { Injectable } from '@angular/core';
import { environment } from "./../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router,
    private connNotificationService: ConnNotificationService,
    private localService: LocalService
  ) {
    // console.log(localService.localStorage)
    if (localService.localStorage) {
      this.token = localService.localStorage['token'];
      // console.log(this.token, "hello")
      const time_now = (new Date()).getTime();
      // console.log((time_now - +localService.localStorage['logTime']), 'in Time')
      if ((time_now - +localService.localStorage['logTime']) > 1000 * 60 * 60) {
        localStorage.removeItem('userData')
        this.localService.localStorage = null;
      } else {
        if (this.token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(["/home"]);
          this.connNotificationService.sendMessage(true);
        }
      }

    }
  }

  signupUser(email: string, password: string, name: string, ) {
    const signupData = {
      email: email,
      password: password,
      name: name,
    };
    return this.http
      .put(`${environment.apiUrl}signup`, signupData)
  }

  loginUser(email: string, password: string, ) {
    const loginData = {
      email: email,
      password: password,
    };
    return this.http
      .post<{ token: string }>(`${environment.apiUrl}login`, loginData)
      .subscribe((res) => {
        // console.log(res);
        const time_now = (new Date()).getTime();
        const userData = res
        userData['logTime'] = time_now
        localStorage.setItem('userData', JSON.stringify(res))
        const token = res.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(["/home"]);
          this.connNotificationService.sendMessage(true);
        }
      }, (err) => {
        alert(err.error.message)
      });
  }

  getToken() {
    return this.token;
  }

  getisAuth() {
    if (this.localService.localStorage) {
      const time_now = (new Date()).getTime();
      if ((time_now - +this.localService.localStorage['logTime']) > 1000 * 60 * 60) {
        localStorage.removeItem('userData')
        this.localService.localStorage = null;
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.connNotificationService.sendMessage(false);
        this.router.navigate(["/ac/home"]);
      }
    }
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  saveData(data: any) {
    return this.http.post(`${environment.apiUrl}save/data`, data);
  }

}
