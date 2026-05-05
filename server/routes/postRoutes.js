import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} from '../controllers/postController.js';

const router = express.Router();

// Apply protection to all post routes
router.use(protect);

// Post routes
router.post('/', createPost);                    // Create post
router.get('/', getPosts);                     // Get all posts (paginated)
router.get('/:id', getPostById);               // Get single post
router.put('/:id', updatePost);                 // Update post
router.delete('/:id', deletePost);              // Delete post

export default router;
