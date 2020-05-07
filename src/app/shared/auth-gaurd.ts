import { ConnNotificationService } from 'src/app/shared/services/connNotification.service';
import { ApiService } from "../shared/services/api.service";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private apiService: ApiService, private router: Router, private connStatus: ConnNotificationService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    const isAuth = this.apiService.getisAuth();
    if (!isAuth) {
      this.connStatus.sendMessage(false);
      this.router.navigate(["/ac/login"]);
    }
    return isAuth;
  }
}
