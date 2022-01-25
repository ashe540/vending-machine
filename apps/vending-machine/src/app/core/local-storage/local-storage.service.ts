import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthTokenData } from '@vending-machine/api-interfaces';

export const TOKEN_KEY = 'TOKEN';
const APP_PREFIX = 'vending-';

@Injectable()
export class LocalStorageService {
  private jwtHelper = new JwtHelperService();

  public setItem(key: string, value: any): void {
    localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  public getItem(key: string): any {
    const item = localStorage.getItem(`${APP_PREFIX}${key}`);
    return item ? JSON.parse(item) : '';
  }

  public getToken(): string {
    return this.getItem(TOKEN_KEY);
  }

  public setToken(value: string): void {
    this.setItem(TOKEN_KEY, value);
  }

  public getDecodedToken(): AuthTokenData {
    return this.jwtHelper.decodeToken(this.getToken());
  }

  public isTokenValid(): boolean {
    const token = this.getToken();
    return token != '' && !this.jwtHelper.isTokenExpired(token);
  }

  public clearAll(): void {
    localStorage.clear();
  }
}
