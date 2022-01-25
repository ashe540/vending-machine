export interface IPurchaseProduct {
  productId: string;
  productName: string;
  quantity: number;
  cost: number;
}

export interface IPurchase {
  _id: string;
  products: IPurchaseProduct[];
  total: number;
  userId: string;
  timestamp: Date;
}

export interface IPurchaseResult {
  message?: string;
  totalSpent: number;
  purchasedProducts: any[];
  change: number[];
}

export interface IGetPurchasesResponse {
  purchases: IPurchase[];
}
