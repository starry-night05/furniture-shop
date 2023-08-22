import express from 'express';
import {
    cartList,
    addToCart,
    updateCartProduct,
    deleteCartProduct
} from '../controllers/CartController.js';

const router = express.Router();

router.get('/cart/:id', cartList);
router.post('/addToCart/:id', addToCart);
router.patch('/updateCart/:id', updateCartProduct);
router.delete('/deleteCart/:id', deleteCartProduct);

export default router;