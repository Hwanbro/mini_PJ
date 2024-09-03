require('dotenv').config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("DB_URL:", process.env.DB_URL);
console.log("PORT:", process.env.PORT);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // 추가된 부분
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/mongodb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 라우터 설정
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'frontend/build')));

// 서버 시작
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));