import express from 'express';
import {
    confirmOrder,
    checkoutList,
    getAllTransactions
} from '../controllers/TransactionController.js';
import { verifyUser, adminOnly } from '../middleware/Auth.js';

const router = express.Router();

router.post('/confirm', verifyUser, confirmOrder);
router.get('/checkoutList', verifyUser, checkoutList);
router.get('/Transactions', adminOnly, verifyUser, getAllTransactions);

export default router;