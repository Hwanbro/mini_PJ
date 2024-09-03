import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false); // 데이터 로드 완료 후 로딩 상태 해제
      })
      .catch(error => {
        console.error(error);
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
        setLoading(false); // 에러 발생 후 로딩 상태 해제
      });
  }, []);

  if (loading) return <div>Loading...</div>; // 로딩 상태 처리
  if (error) return <div>{error}</div>; // 에러 상태 처리

  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;