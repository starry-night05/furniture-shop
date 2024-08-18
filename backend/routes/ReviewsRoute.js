import express from 'express';
import {
    reviewsByProduct,
    review,
    editReview,
    deleteReview
} from '../controllers/ReviewsController.js';
import { verifyUser, adminOnly } from '../middleware/Auth.js';

const router = express.Router();

router.get('/reviews/:id', verifyUser, reviewsByProduct);
router.patch('/edit-review/:id', verifyUser, editReview);
router.post('/send-review', verifyUser, review);
router.delete('/delete-review/:id', verifyUser, deleteReview);

export default router;