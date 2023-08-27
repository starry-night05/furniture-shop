import express from "express";
import { Login, logOut, Me } from "../controllers/Auth.js";
import { verifyUser } from "../middleware/Auth.js";


const router = express.Router();

router.get('/me', verifyUser, Me);
router.post('/login', Login);
router.delete('/logout', verifyUser, logOut);

export default router;