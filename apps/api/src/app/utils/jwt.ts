import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { config } from "./config";

export const generateJwt = (user: User) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };
  return jwt.sign(payload, config.sessionSecret, {
    expiresIn: "1 day",
  });
};
