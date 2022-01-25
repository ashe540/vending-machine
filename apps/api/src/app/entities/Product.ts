export class Product {
  private name: string;
  private amountAvailable: number;
  private cost: number;
  private sellerId: string;

  constructor(
    name: string,
    amountAvailable: number,
    cost: number,
    sellerId: string
  ) {
    this.name = name;
    this.amountAvailable = amountAvailable;
    this.cost = cost;
    this.sellerId = sellerId;
  }
}
