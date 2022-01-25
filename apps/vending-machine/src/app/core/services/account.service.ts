import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IDepositRequestBody,
  IDepositResponse,
  IGetPurchasesResponse,
  ResponseMessage,
} from '@vending-machine/api-interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {
  depositUrl = '/api/v1/users/deposit';
  purchasesUrl = '/api/v1/users/purchases';

  constructor(private httpClient: HttpClient) {}

  public getDeposit(): Observable<IDepositResponse> {
    return this.httpClient.get<IDepositResponse>(this.depositUrl);
  }

  public deposit(amount: number): Observable<ResponseMessage> {
    const body: IDepositRequestBody = {
      amount,
    };
    return this.httpClient.post<ResponseMessage>(this.depositUrl, body);
  }

  resetDeposit(): Observable<ResponseMessage> {
    return this.httpClient.post<ResponseMessage>(
      `${this.depositUrl}/reset`,
      {}
    );
  }

  getPurchases() {
    return this.httpClient.get<IGetPurchasesResponse>(this.purchasesUrl);
  }
}
