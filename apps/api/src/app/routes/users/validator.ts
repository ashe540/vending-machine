import { UserRoles } from '@vending-machine/api-interfaces';
import { RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';

const handler: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

const schema = {
  login: [body('username'), body('password')],
  register: [
    body('username'),
    body('password'),
    body('role').isIn([UserRoles.BUYER, UserRoles.SELLER]),
  ],
};

export default () => ({
  ...Object.assign(
    {},
    ...Object.keys(schema).map((k) => ({ [k]: [...schema[k], handler] }))
  ),
});
