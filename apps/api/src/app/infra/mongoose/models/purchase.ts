import { Schema, Document, Model, model } from 'mongoose';
import { IPurchase, IPurchaseProduct } from '@vending-machine/api-interfaces';

export type PurchaseDocument = IPurchase & Document;
export type PurchaseProductDocument = IPurchaseProduct & Document;

const PurchaseProductSchema = new Schema<PurchaseProductDocument>({
  productId: { type: String },
  productName: { type: String},
  quantity: { type: Number },
  cost: { type: Number },
});

const PurchaseSchema = new Schema<PurchaseDocument>({
  products: [PurchaseProductSchema],
  total: { type: Number },
  userId: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export interface IPurchaseModel extends Model<PurchaseDocument> {
  toObject(): IPurchase;
}

export const PurchaseModel = model<PurchaseDocument, IPurchaseModel>(
  'Purchase',
  PurchaseSchema
);
