import express from 'express';
import {
    confirmOrder,
    checkoutList,
    getAllTransactions,
    confirm,
    cancel,
    cancelOrder,
    shipping,
    receive,
    receiveOrder
} from '../controllers/TransactionController.js';
import { verifyUser, adminOnly } from '../middleware/Auth.js';

const router = express.Router();

// Users
router.post('/confirm', verifyUser, confirmOrder);
router.get('/checkoutList', verifyUser, checkoutList);
router.patch('/cancelOrder/:id', verifyUser, cancelOrder);
router.patch('/receiveOrder/:id', verifyUser, receiveOrder);
// Admin only
router.get('/Transactions', adminOnly, verifyUser, getAllTransactions);
router.patch('/confirm/:id', adminOnly, verifyUser, confirm);
router.patch('/cancel/:id', adminOnly, verifyUser, cancel);
router.patch('/shipping/:id', adminOnly, verifyUser, shipping);
router.patch('/receive/:id', adminOnly, verifyUser, receive);

export default router;