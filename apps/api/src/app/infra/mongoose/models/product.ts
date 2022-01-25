import { Schema, Document, Model, model } from "mongoose";
import { IProduct } from "@vending-machine/api-interfaces";

export type ProductDocument = IProduct & Document;

const ProductSchema = new Schema<ProductDocument>({
  name: { type: String },
  amountAvailable: { type: Number },
  cost: { type: Number },
  sellerId: { type: String },
});

export interface IProductModel
  extends Model<ProductDocument> {
  toObject(): IProduct;
}

export const ProductModel = model<ProductDocument, IProductModel>(
  "Product",
  ProductSchema
);
