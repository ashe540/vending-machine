import { Router } from 'express';
import validator from './validator';
import * as products from './products';
import * as purchase from './buy';

import {
  jwtMiddleware,
  genericRoleGuard,
  productChangeCheck,
} from '../../middleware';

import { UserRoles } from '@vending-machine/api-interfaces';
import { productSeller } from '../../middleware/productSeller';

const v = validator();

const router = Router();

router.get('/', v.getProducts, products.getAll);
router.get(
  '/seller',
  [jwtMiddleware, genericRoleGuard(UserRoles.SELLER), v.getProducts],
  products.getAll
);

router.get('/:id', products.get);

router.post(
  '/',
  [jwtMiddleware, genericRoleGuard(UserRoles.SELLER), v.createProduct],
  products.create
);

router.put(
  '/:id',
  [jwtMiddleware, genericRoleGuard(UserRoles.SELLER), productSeller],
  products.updateById
);

router.delete(
  '/:id',
  [jwtMiddleware, genericRoleGuard(UserRoles.SELLER), productSeller],
  products.deleteById
);

/**
 * Allows purchasing a single product
 */
router.post(
  '/:id/buy',
  [jwtMiddleware, genericRoleGuard(UserRoles.BUYER), v.buy, productChangeCheck],
  purchase.buy
);

/**
 * Allows purchasing multiple products
 */
router.post(
  '/buy',
  [jwtMiddleware, genericRoleGuard(UserRoles.BUYER)],
  purchase.buyMultiple
);

export default router;
