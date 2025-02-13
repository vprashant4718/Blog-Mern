import express from 'express';
import { updateUser,deleteUser, signOut } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();


router.put('/update/:userId',verifyToken, updateUser);
router.delete('/delete/:userId',verifyToken, deleteUser);
router.post('/signout', signOut);


export default router;