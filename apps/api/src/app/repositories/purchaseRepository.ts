import { Purchase } from '../entities/Purchase';
import { IPurchaseModel } from '../infra/mongoose/models/purchase';
import { IPurchase } from '@vending-machine/api-interfaces';
import { MongoRepository } from './base/MongoRepository';

export interface IPurchaseRepository
  extends MongoRepository<IPurchaseModel, IPurchase> {
  createPurchase(purchase: Purchase): Promise<IPurchaseModel>;
  getPurchasesByUser(userId: string): Promise<IPurchaseModel[]| IPurchase[]>;
}

export default class PurchaseRepository
  extends MongoRepository<IPurchaseModel, IPurchase>
  implements IPurchaseRepository
{
  constructor(model: IPurchaseModel) {
    super(model);
  }

  public createPurchase(purchase: Purchase): Promise<IPurchaseModel> {
    return this.create(purchase);
  }

  public getPurchasesByUser(
    userId: string
  ): Promise<IPurchaseModel[] | IPurchase[]> {
    return this.find({ userId }, {});
  }
}
