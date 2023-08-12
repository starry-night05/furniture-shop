import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser
} from "../controllers/UsersController.js";


const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/:id', editUser);
router.delete('/users/:id', deleteUser);

export default router;