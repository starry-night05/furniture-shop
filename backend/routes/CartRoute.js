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

router.post('/cart/:id', verifyUser, addToCart);
router.patch('/cart/:id', verifyUser, updateCartProduct);
router.delete('/cart/:id', verifyUser, deleteCartProduct);

export default router;
