import { RequestHandler } from 'express';
import { body, query, validationResult } from 'express-validator';

const handler: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

const schema = {
  getProducts: [
    query('page').optional().isNumeric(),
    query('limit').optional().isNumeric(),
  ],
  createProduct: [
    body('name'),
    body('amountAvailable').isNumeric(),
    body('cost').isNumeric(),
  ],
  buy: [body('quantity').optional().isNumeric()],
};

export default () => ({
  ...Object.assign(
    {},
    ...Object.keys(schema).map((k) => ({ [k]: [...schema[k], handler] }))
  ),
});
