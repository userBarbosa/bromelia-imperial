'use strict';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOCAL_STORAGE_STRINGS } from '../models/User';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(LOCAL_STORAGE_STRINGS.JWT);
    console.log("interceptor", token)
    if (token) {
      const authorizedRequest = req.clone({
        headers: req.headers.set('Authorization', token), //'Bearer ' + token),
      });

      return handler.handle(authorizedRequest);
    }
    return handler.handle(req);
  }
}
