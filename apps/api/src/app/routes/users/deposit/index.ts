import { Router } from 'express';
import { getDeposit } from './deposit';
import { addDeposit } from './addDeposit';
import { reset } from './reset';
import validator from './validator';

const router = Router();
const v = validator();

router.get('/', getDeposit);
router.post('/', v.addDeposit, addDeposit);
router.post('/reset', reset);

export default router;
