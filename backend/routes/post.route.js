import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { postBlog, getPost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, postBlog);
router.get('/getposts', getPost);

export default router;