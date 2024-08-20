import express from 'express';
import {
    WishList,
    addToWishlist,
    removeFromWishlist
} from '../controllers/WishlistController.js';
import { verifyUser } from '../middleware/Auth.js';

const router = express.Router();

router.get('/wishlist', verifyUser, WishList);
router.post('/wishlist/:id', verifyUser, addToWishlist);
router.delete('/wishlist/:id', verifyUser, removeFromWishlist);

export default router;
