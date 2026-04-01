import {
  createPost,
  getPosts,
  getPostById,  // Add
  updatePost,   // Add
  deletePost
} from '../controllers/postController.js';

router.get('/:id', protect, getPostById);      // Get single post
router.put('/:id', protect, updatePost);       // Update post
router.delete('/:id', protect, deletePost);    // Delete post
