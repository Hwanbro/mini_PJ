const express = require('express');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware'); // 인증 미들웨어 가져오기

const router = express.Router();

// 인증이 필요한 라우트에 authMiddleware 적용
router.post('/create', authMiddleware, createPost); // 게시글 생성
router.get('/', getPosts); // 모든 게시글 조회
router.get('/:id', getPostById); // 특정 ID의 게시글 조회
router.put('/:id', authMiddleware, updatePost); // 게시글 수정
router.delete('/:id', authMiddleware, deletePost); // 게시글 삭제

module.exports = router;
