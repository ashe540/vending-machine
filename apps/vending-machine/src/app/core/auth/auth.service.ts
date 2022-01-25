import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthTokenData } from '@vending-machine/api-interfaces';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable()
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private _data: AuthTokenData | null = null;
  private _token: string | null = null;

  public get data(): AuthTokenData | null {
    return this._data;
  }

  public set data(data: AuthTokenData | null) {
    this._data = data;
  }

  public get token(): string | null {
    return this._token;
  }

  public set token(token: string | null) {
    this._token = token;
  }

  public get isAuthenticated(): boolean {
    return Boolean(this._token);
  }

  constructor(private readonly localStorageService: LocalStorageService) {
    this.decodeToken();
  }

  public getUser(): AuthTokenData | null {
    if (typeof this.data === 'undefined') {
      this.decodeToken();
    }
    return this.data;
  }

  public getRole(): string {
    return this.data ? this.data.role : '';
  }

  public saveToken(token: string) {
    this.token = token;
    this.localStorageService.setToken(token);
    this.decodeToken();
  }

  public logout(): void {
    this.token = '';
    this.data = null;
    this.localStorageService.clearAll();
  }

  private decodeToken(): void {
    this.token = this.localStorageService.getToken();
    if (this.token) {
      this.data = this.jwtHelper.decodeToken(this.token);
    }
  }
}
