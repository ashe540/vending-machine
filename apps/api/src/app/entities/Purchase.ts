import { IPurchaseProduct } from "@vending-machine/api-interfaces";

export class Purchase {
  private products: IPurchaseProduct[];
  private total: number;
  private userId: string;
  private timestamp: Date;

  constructor(
    products: IPurchaseProduct[],
    total: number,
    userId: string,
    timestamp: Date
  ) {
    this.products = products;
    this.total = total;
    this.userId = userId;
    this.timestamp = timestamp;
  }
}
