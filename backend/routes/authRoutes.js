const express = require('express');
const { register, login } = require('../controllers/authController');
const { createPost } = require('../controllers/postController');
const authenticateUser = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/posts', authenticateUser, createPost);

module.exports = router;
