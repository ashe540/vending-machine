import Boom from "@hapi/boom";
import { RequestHandler } from "express";
import { User } from "../../../entities/User";

import { UserRepository } from "../../../repositories";
import { IUser } from "@vending-machine/api-interfaces";
import * as jwtHelper from "../../../utils/jwt";

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const userModel = await UserRepository.findByUsername(username);

  if (!userModel) {
    throw Boom.unauthorized("User not found");
  }

  let data: IUser;
  let isValid = false;

  if ("toObject" in userModel) {
    data = userModel.toObject();
    isValid = await userModel.validPassword(password);
  } else {
    data = userModel as IUser;
  }

  const userObj = User.fromUser(data);

  if (!isValid) {
    throw Boom.unauthorized("Invalid username or password");
  }

  const jwtToken = jwtHelper.generateJwt(userObj);

  res.json({
    token: jwtToken,
  });
};
