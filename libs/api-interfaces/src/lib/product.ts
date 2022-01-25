export interface IProduct {
  _id: string;
  name: string;
  amountAvailable: number;
  cost: number;
  sellerId: string;
}

export interface ICreateEditProduct {
  name: string;
  amountAvailable: number;
  cost: number;
}

export type IProductListParams = {
  page: number;
  limit: number;
  userId?: string;
};

export enum SortByOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export type IProductListResponse = {
  page: number;
  limit: number;
  numPages: number;
  results: Array<IProduct>;
};
