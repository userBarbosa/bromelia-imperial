/* 'use strict';

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
    if (token) {
      const authorizedRequest = req.clone({
        headers: req.headers.set('Authorization', token), //'Bearer ' + token),
      });

      return handler.handle(authorizedRequest);
    }
    return handler.handle(req);
  }
}
 */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_STRINGS } from '../models/User';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(LOCAL_STORAGE_STRINGS.JWT);
    const isAuthPage = this.isAuthenticationPage(req.url);

    if (token && !isAuthPage) {
      const authorizedRequest = req.clone({
        headers: req.headers.set('Authorization', token),
      });

      return next.handle(authorizedRequest).pipe(
        catchError((error) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
    }

    if (!token && !isAuthPage) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('No token available'));
    }

    return next.handle(req);
  }

  private isAuthenticationPage(url: string): boolean {
    const authPages = ['/login', '/signup'];
    return authPages.some((page) => url.includes(page));
  }
}
