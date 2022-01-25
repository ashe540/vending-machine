import { RequestHandler } from "express";
import expressJwt from "express-jwt";
import { config } from "../utils/config";

export const jwtMiddleware: RequestHandler = expressJwt({
  secret: config.sessionSecret,
  algorithms: ["HS256"],
  requestProperty: "user",
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
}).unless({
  path: ["/api/v1/users/login", "/api/v1/users/register"],
});
