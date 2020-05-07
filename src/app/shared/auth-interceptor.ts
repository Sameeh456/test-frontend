import { Observable } from "rxjs";
import { ApiService } from "../shared/services/api.service";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpEvent,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _apiService: ApiService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this._apiService.getToken();
    req = req.clone({
      headers: new HttpHeaders({ Authorization: `Bearer ${authToken}` }),
    });
    // console.log("In interceptor", authToken);
    return next.handle(req);
  }
}
