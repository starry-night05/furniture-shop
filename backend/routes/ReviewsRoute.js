import express from 'express';
import {
    reviewsByProduct,
    review,
    editReview
} from '../controllers/ReviewsController.js';
import { verifyUser } from '../middleware/Auth.js';

const router = express.Router();

// router.get('/reviews/:id', verifyUser, reviewsByProduct);
router.patch('/edit-review/:id', verifyUser, editReview);
router.post('/send-review', verifyUser, review);

export default router;