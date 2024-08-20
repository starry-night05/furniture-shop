import express from "express";
import {
    getUsers,
    getUserById,
    regUser,
    createUser,
    editUser,
    deleteUser,
    editProfile
} from "../controllers/UsersController.js";
import { verifyUser, adminOnly } from '../middleware/Auth.js';


const router = express.Router();

router.get('/users', adminOnly, getUsers);
router.get('/user/:id', verifyUser, getUserById);
router.post('/registration', regUser);
router.post('/create-user', adminOnly, createUser);
router.patch('/editProfile', verifyUser, editProfile);
router.patch('/editUser/:id', verifyUser, editUser);
router.delete('/removeUser/:id', adminOnly, deleteUser);

export default router;