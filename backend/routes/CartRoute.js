import express from 'express';
import {
    cartList,
    addToCart,
    updateCartProduct,
    deleteCartProduct
} from '../controllers/CartController.js';
import { verifyUser } from '../middleware/Auth.js';

const router = express.Router();

router.get('/carts', verifyUser, cartList);
router.post('/addToCart/:id', verifyUser, addToCart);
router.patch('/updateCart/:id', verifyUser, updateCartProduct);
router.delete('/deleteCart/:id', verifyUser, deleteCartProduct);

export default router;