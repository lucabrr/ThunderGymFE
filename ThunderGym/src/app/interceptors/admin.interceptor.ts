import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    let admin = localStorage.getItem("userData")
    if(admin){
      let adminToken = JSON.parse(admin).accessToken;
      let myRequest = request.clone(
        {
          headers: request.headers.set('Authorization', 'Bearer ' + adminToken)
        }
      )


      return next.handle(myRequest)
    }
    else{return next.handle(request)}
  }
}
