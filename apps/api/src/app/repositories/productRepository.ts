import { Product } from '../entities/Product';
import { IProductModel } from '../infra/mongoose/models/product';
import { IProduct, IProductListParams } from '@vending-machine/api-interfaces';
import { MongoRepository } from './base/MongoRepository';

export interface IProductRepository
  extends MongoRepository<IProductModel, IProduct> {
  getPaginatedProducts(
    filters: IProductListParams
  ): Promise<IProductModel[] | IProduct[] | []>;
  getProductById(productId: string): Promise<IProductModel | IProduct | null>;
  createProduct(product: Product): Promise<IProductModel>;
}

export default class ProductRepository
  extends MongoRepository<IProductModel, IProduct>
  implements IProductRepository
{
  constructor(model: IProductModel) {
    super(model);
  }

  public getPaginatedProducts(
    filters: IProductListParams
  ): Promise<IProduct[]> {
    const query: any = {};

    if (filters.userId) {
      query.sellerId = filters.userId;
    }

    return this.find(query, {
      lean: true,
      listOptions: {
        page: filters.page,
        limit: filters.limit,
        userId: filters.userId,
      },
    }) as Promise<IProduct[]>;
  }

  public getCount(filters: IProductListParams): Promise<number> {
    const query: any = {};

    if (filters.userId) {
      query.sellerId = filters.userId;
    }

    return this.count(query);
  }

  public getProductById(
    productId: string
  ): Promise<IProductModel | IProduct | null> {
    return this.findById(productId);
  }

  public createProduct(product: Product): Promise<IProductModel> {
    return this.create(product);
  }
}
