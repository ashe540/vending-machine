import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from '../../core/services/login.service';
import { AuthService } from '../auth/auth.service';

export const HTTP_UNAUTHORIZED_CODE = 401;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly injector: Injector,
    private readonly authService: AuthService,
    private readonly loginService: LoginService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const domainsNoAuthToken: string[] = [];
    const needsAuth = !this.checkElementContained(
      request.url,
      domainsNoAuthToken
    );

    if (!needsAuth) {
      return next.handle(request);
    } else {
      const token = this.authService.token;
      const isLoggedIn = this.authService.isAuthenticated;
      if (isLoggedIn) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // return next.handle(request).pipe(
      //   map((event: HttpEvent<any>) => {
      //     return event;
      //   })
      // );

      return next.handle(request).pipe(
        tap({
          next: (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              next.handle(request);
            }
          },
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === HTTP_UNAUTHORIZED_CODE) {
                this.loginService.signOut();
              }
            }
          },
        })
      );
    }
  }

  private checkElementContained(search: string, arr: string[]): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      if (search.indexOf(arr[i]) > -1) {
        return true;
      }
    }
    return false;
  }
}
