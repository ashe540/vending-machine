import Boom from "@hapi/boom";
import { RequestHandler } from "express";
import { ProductRepository } from "../repositories";

export const productSeller: RequestHandler = async (req, res, next) => {
  const { id } = req.params; // required for updating, deleting require the ID of the product
  if (!id) {
    throw Boom.badRequest("Missing product ID");
  }

  // Check if product exists
  const foundProductModel = await ProductRepository.findById(id);

  if (!foundProductModel) {
    throw Boom.badRequest(`Product with ID ${id} does not exist`);
  }

  const foundProduct = foundProductModel.toObject();

  if (foundProduct.sellerId !== req.user.id) {
    throw Boom.unauthorized(
      "You are not the owner of this resource, therefore you have been denied access"
    );
  }

  // TODO: Cache products via redis to improve performance in case high usage of these endpoints
  // is expected. Cached product can also be used by other middleware and endpoints in case they
  // need product details to be fetched

  next();
};
