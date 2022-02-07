import { ICreateEditProduct, IProduct } from '@vending-machine/api-interfaces';

export const demoProduct: IProduct = {
  _id: '61edad390309665f312a6c4b',
  name: 'Test product',
  amountAvailable: 10,
  cost: 100,
  sellerId: '',
};

export const demoCreateProduct: ICreateEditProduct = {
  name: 'Test product',
  amountAvailable: 10,
  cost: 100,
};

export const SELLER_AUTH = 'seller';
export const BUYER_AUTH = 'buyer';
export const API_URL = '/api/v1';