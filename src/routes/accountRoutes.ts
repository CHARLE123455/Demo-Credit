import { Router } from 'express';
import { createUser, fundUserAccount, transferUserFunds, withdrawUserFunds } from '../controllers/accountController';
import { authenticate } from '../utils/fauxAuth';

const router = Router();

router.post('/create', authenticate, createUser);
router.post('/fund', authenticate, fundUserAccount);
router.post('/transfer', authenticate, transferUserFunds);
router.post('/withdraw', authenticate, withdrawUserFunds);

export default router;
