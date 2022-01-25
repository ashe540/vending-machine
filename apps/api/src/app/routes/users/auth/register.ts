import { RequestHandler } from 'express';
import { UserRepository } from '../../../repositories';
import { IUser, UserRoles } from '@vending-machine/api-interfaces';

export const register: RequestHandler = async (req, res) => {
  // Check if user already exists with same username
  const foundUser = await UserRepository.findByUsername(req.body.username);

  if (foundUser) {
    return res.json({ message: 'A user with that username already exists' });
  }

  // Override role with buyer in case a different one is supplied
  const userModel = await UserRepository.register({
    ...req.body,
    role: UserRoles.BUYER,
  });
  const userObj: IUser = userModel.toObject();

  res.status(201).json({ message: 'User has been registered', id: userObj.id });
};

export const registerAnyRole: RequestHandler = async (req, res) => {
  const userModel = await UserRepository.register(req.body);
  const userObj: IUser = userModel.toObject();

  res.status(201).json({ message: 'User has been registered', id: userObj.id });
};
