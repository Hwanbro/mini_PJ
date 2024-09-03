import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setError('');

    if (!title.trim() || !content.trim()) {
        setError('제목과 내용을 모두 입력해야 합니다.');
        return;
    }

    try {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        };

        const response = await axios.post(
            'http://localhost:5000/api/posts/create',
            { title, content },
            config
        );

        setMessage('포스트가 성공적으로 생성되었습니다!');
        console.log('Post created:', response.data);

        navigate(`/post/${response.data._id}`);

        setTitle('');
        setContent('');
    } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.msg) {
            setError(err.response.data.msg);
        } else {
            setError('포스트 생성 중 오류가 발생했습니다.');
        }
    }
};
  return (
    <div className="post-form-container">
      <h2>Create a New Post</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter post content"
            rows="10"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
