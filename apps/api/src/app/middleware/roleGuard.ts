import Boom from "@hapi/boom";
import { RequestHandler } from "express";

export const genericRoleGuard = (roleName: string): RequestHandler => {
  return (req, res, next) => {
    if (!req.user) {
      throw Boom.unauthorized(
        "You need to be authenticated to access this resource"
      );
    }

    const {
      user: { role },
    } = req;

    if (role !== roleName) {
      throw Boom.unauthorized(
        `Your role does not permit you access to this resources. Permitted role: ${roleName}`
      );
    }

    next();
  };
};
