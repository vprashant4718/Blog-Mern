import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { postBlog } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, postBlog);

export default router;