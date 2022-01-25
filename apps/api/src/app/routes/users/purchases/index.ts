import { RequestHandler } from 'express';
import { PurchaseRepository } from '../../../repositories';
import { IGetPurchasesResponse } from '@vending-machine/api-interfaces';

export const getPurchases: RequestHandler = async (req, res) => {
  const { user } = req;

  const purchaseModels = await PurchaseRepository.getPurchasesByUser(user.id);
  const purchases = purchaseModels.map((pm) => pm.toObject());

  const response: IGetPurchasesResponse = {
    purchases,
  };

  res.json(response);
};
