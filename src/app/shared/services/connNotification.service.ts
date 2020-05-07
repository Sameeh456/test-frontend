import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnNotificationService {

  private subject = new BehaviorSubject<any>(false);
  constructor() {
  }

  sendMessage(message: boolean) {
    this.subject.next(message); //all subscribers get the new value
  }

  getMessage() {
    return this.subject.asObservable();
  }

}
