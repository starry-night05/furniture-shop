import express from 'express';
import {
    WishList,
    addToWishlist,
    removeFromWishlist
} from '../controllers/WishlistController.js';
import { verifyUser } from '../middleware/Auth.js';

const router = express.Router();

router.get('/wishlist', verifyUser, WishList);
router.post('/addToWishlist/:id', verifyUser, addToWishlist);
router.delete('/removeFromWishlist/:id', verifyUser, removeFromWishlist);

export default router;