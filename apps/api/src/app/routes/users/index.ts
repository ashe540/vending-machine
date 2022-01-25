import { Router } from 'express';
import validator from './validator';

import * as auth from './auth';
import { getPurchases } from './purchases';

import { jwtMiddleware } from '../../middleware';
import { genericRoleGuard } from '../../middleware/roleGuard';
import { UserRoles } from '@vending-machine/api-interfaces';

import depositRouter from './deposit';

const router = Router();
const v = validator();


router.post('/login', v.login, auth.login);
router.post('/register', v.register, auth.register);
router.post('/logout-all', jwtMiddleware, auth.logoutAll);

router.post(
  '/admin-register',
  jwtMiddleware,
  genericRoleGuard(UserRoles.ADMIN),
  auth.registerAnyRole
);

router.use(
  '/deposit',
  [jwtMiddleware, genericRoleGuard(UserRoles.BUYER)],
  depositRouter
);

router.get(
  '/purchases',
  [jwtMiddleware, genericRoleGuard(UserRoles.BUYER)],
  getPurchases
);

export default router;
