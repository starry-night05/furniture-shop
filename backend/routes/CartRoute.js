import express from 'express';
import {

} from '../controllers';

const router = express.Router();

router.get('/cart', get);
router.post('/cart', createProduct);
router.patch('/cart/:id', updateProduct);
router.delete('/cart/:id', deleteProduct);

export default router;