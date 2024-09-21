import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { postBlog, getPost, deletePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, postBlog);
router.get('/getposts', getPost);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);

export default router;