import Boom from '@hapi/boom';
import { RequestHandler } from 'express';
import { UserRepository } from '../../../repositories';
import { isValidDepositAmount } from './helpers';

export const addDeposit: RequestHandler = async (req, res) => {
  const { user } = req;
  const { amount } = req.body;

  const amountValue = parseInt(amount, 10);

  // Validate amount that can be deposited
  const isValidAmount = isValidDepositAmount(amountValue);

  if (!isValidAmount) {
    throw Boom.badRequest(
      'Invalid deposit amount. Permitted values are: 5, 10, 20, 50, and 100'
    );
  }
  await UserRepository.update(user.id, { $inc: { deposit: amount } });

  res.status(200).json({ message: `Updated account by ${amount} coins` });
};
