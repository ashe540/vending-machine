import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ICreateEditProduct,
  IProduct,
  IProductListResponse,
  IPurchaseResult,
  ResponseMessage,
} from '@vending-machine/api-interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public getAll(
    page: number = 1,
    limit: number = 10
  ): Observable<IProductListResponse> {
    return this.httpClient.get<IProductListResponse>('/api/v1/products', {
      params: {
        page,
        limit,
      },
    });
  }

  public getAllBySeller(
    page: number = 1,
    limit: number = 10
  ): Observable<IProductListResponse> {
    return this.httpClient.get<IProductListResponse>(
      '/api/v1/products/seller',
      {
        params: {
          page,
          limit,
        },
      }
    );
  }

  public getById(productId: string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`/api/v1/products/${productId}`);
  }

  public updateProductById(
    productId: string,
    product: ICreateEditProduct
  ): Observable<ResponseMessage> {
    return this.httpClient.put<ResponseMessage>(
      `/api/v1/products/${productId}`,
      product
    );
  }

  public deleteProductById(productId: string): Observable<ResponseMessage> {
    return this.httpClient.delete<ResponseMessage>(
      `/api/v1/products/${productId}`
    );
  }

  public createProduct(
    product: ICreateEditProduct
  ): Observable<ResponseMessage> {
    return this.httpClient.post<ResponseMessage>(`/api/v1/products`, product);
  }

  public purchaseById(productId: string): Observable<IPurchaseResult> {
    return this.httpClient.post<IPurchaseResult>(
      `/api/v1/products/${productId}/buy`,
      {}
    );
  }
}
