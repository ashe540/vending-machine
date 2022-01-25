import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  ResponseMessage,
} from '@vending-machine/api-interfaces';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LoginService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public login(username: string, password: string): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>('/api/v1/users/login', {
      username,
      password,
    });
  }

  public register(data: IRegisterRequest): Observable<IRegisterResponse> {
    return this.httpClient.post<IRegisterResponse>(
      '/api/v1/users/register',
      data
    );
  }

  public signOut(): void {
    this.authService.logout();
    window.location.href = 'login';
  }

  public signOutAllUsers(): Observable<ResponseMessage> {
    return this.httpClient.post<ResponseMessage>(
      '/api/v1/users/logout-all',
      {}
    );
  }
}
