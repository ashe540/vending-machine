import { RequestHandler } from 'express';
import { IUserModel } from '../../../infra/mongoose/models/user';
import { UserRepository } from '../../../repositories';
import { IDepositResponse } from '@vending-machine/api-interfaces';

export const getDeposit: RequestHandler = async (req, res) => {
  const { user } = req;

  const currentUserModel = (await UserRepository.findById(
    user.id
  )) as IUserModel;

  const currentUser = currentUserModel.toObject();

  const depositResult: IDepositResponse = {
    deposit: currentUser.deposit,
  };

  res.json(depositResult);
};
