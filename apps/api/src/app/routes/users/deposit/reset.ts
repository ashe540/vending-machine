import { RequestHandler, Router } from "express";
import { UserRepository } from "../../../repositories";

export const reset: RequestHandler = async (req, res) => {
  const { user } = req;

  await UserRepository.update(user.id, { $set: { deposit: 0 } });

  res.status(200).json({ message: "Deposit amount has been reset" });
};
