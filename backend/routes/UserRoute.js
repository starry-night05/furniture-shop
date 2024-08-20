import express from "express";
import {
    getUsers,
    getUserById,
    regUser,
    createUser,
    editUser,
    deleteUser
} from "../controllers/UsersController.js";
import { verifyUser, adminOnly } from '../middleware/Auth.js';


const router = express.Router();

router.get('/users', adminOnly, getUsers);
router.post('/registration', regUser);

router.get('/user/:id', verifyUser, getUserById);
router.post('/user', adminOnly, createUser);
router.patch('/user/:id', verifyUser, editUser);
router.delete('/user/:id', verifyUser, deleteUser);

export default router;
