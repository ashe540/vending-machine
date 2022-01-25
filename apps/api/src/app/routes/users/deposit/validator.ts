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
  addDeposit: [body('amount').isNumeric()],
};

export default () => ({
  ...Object.assign(
    {},
    ...Object.keys(schema).map((k) => ({ [k]: [...schema[k], handler] }))
  ),
});
