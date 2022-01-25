import Boom from '@hapi/boom';
import { RequestHandler } from 'express';
import { ProductRepository } from '../../repositories';
import { Product } from '../../entities/Product';
import {
  IProductListParams,
  IProductListResponse,
  UserRoles,
} from '@vending-machine/api-interfaces';

export const getAll = async (req, res) => {
  const params = getDefaultParams(req.query);

  const filters: IProductListParams = {
    page: params.page,
    limit: params.limit,
  };

  if (req.user && req.user.role === UserRoles.SELLER) {
    filters.userId = req.user.id;
  }

  const [products, totalProducts] = await Promise.all([
    ProductRepository.getPaginatedProducts(filters),
    ProductRepository.getCount(filters),
  ]);

  const result: IProductListResponse = {
    page: params.page,
    limit: params.limit,
    numPages: Math.ceil(totalProducts / params.limit),
    results: products,
  };

  res.json(result);
};

export const get: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw Boom.badRequest('Missing product ID');
  }

  const product = await ProductRepository.getProductById(id);

  res.json(product);
};

export const create: RequestHandler = async (req, res) => {
  const { body, user } = req;

  // Validate cost, as it must be a multiply of 5 so that buyers can pay with the available coins
  const costInCents = body.cost;
  const isAllowedCost = costInCents % 5 === 0;

  if (!isAllowedCost) {
    throw Boom.badRequest(
      'Cost of product must be a multiple of five since it needs to be payable with coins: 5, 10, 20, 50, or 100'
    );
  }

  const product = new Product(
    body.name,
    body.amountAvailable,
    costInCents,
    user.id
  );

  const productModel = await ProductRepository.createProduct(product);
  const productObj = productModel.toObject();

  res
    .status(201)
    .json({ message: 'Product created successfully', id: productObj._id });
};

export const updateById: RequestHandler = async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  const allowedUpdateFields = ['name', 'amountAvailable', 'cost'];

  const update: any = {};

  allowedUpdateFields.forEach((fieldName) => {
    const value = body[fieldName];
    if (value) {
      // if (fieldName === "cost") {
      //   value = body[fieldName] * 100; // convert to cents
      // }
      update[fieldName] = value;
    }
  });

  const hasUpdated = await ProductRepository.update(id, { $set: update });

  if (!hasUpdated) {
    throw Boom.internal(
      'Something went wrong when trying to update the product'
    );
  }

  res.status(200).json({ message: 'Product updated successfully', id });
};

export const deleteById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deletedCount = await ProductRepository.delete(id);

  if (!deletedCount) {
    throw Boom.internal('An error has ocurred when deleting the record');
  }

  res.status(200).json({ message: `Product with ID ${id} has been deleted` });
};

const getDefaultParams = (params: any): IProductListParams => {
  let page = params.page !== undefined ? parseInt(params.page, 10) : 1;
  const limit = params.limit !== undefined ? parseInt(params.limit, 10) : 10;

  // Force first page to be 1, not 0
  if (page <= 0) {
    page = 0;
  } else {
    page -= 1;
  }

  const defaultParams: IProductListParams = {
    page,
    limit,
  };
  return defaultParams;
};
