const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

// 인증 미들웨어
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');
    req.user = decoded; // 토큰에서 사용자 정보 추출 후 req.user에 저장
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: "서버 오류가 발생했습니다." });
};

const createPost = async (req, res) => {
  try {
      if (!req.user || !req.user.userId) {
          return res.status(401).json({ msg: '사용자가 인증되지 않았습니다.' });
      }

      const { title, content } = req.body;

      const newPost = new Post({
          title,
          content,
          author: req.user.userId, // 토큰에서 추출된 userId 사용
      });

      await newPost.save();

      res.status(201).json(newPost);
  } catch (error) {
      console.error('포스트 생성 중 오류 발생:', error);
      res.status(500).json({ msg: '서버 오류' });
  }
};


const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    handleError(res, error);
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    handleError(res, error);
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    handleError(res, error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

// 모듈 내보내기
module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  authMiddleware,  // 인증 미들웨어 추가
};
