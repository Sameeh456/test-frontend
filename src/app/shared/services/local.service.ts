import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  localStorage: any = null;

  constructor() {
    this.localStorage = JSON.parse(localStorage.getItem('userData'));
  }

}
