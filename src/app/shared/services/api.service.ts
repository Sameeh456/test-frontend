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
    console.log(localService.localStorage)
    if (localService.localStorage) {
      this.token = localService.localStorage['token'];
      console.log(this.token, "hello")
      if (this.token) {
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(["/home"]);
        this.connNotificationService.sendMessage(true);
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
        console.log(res);
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
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  saveData(data: any) {
    return this.http.post(`${environment.apiUrl}save/data`, data);
  }

}
