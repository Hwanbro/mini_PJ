import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );
        setPost(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "게시글을 불러오는 중 오류가 발생했습니다."
        );
        console.error("Error fetching post:", err.response || err.message);
      }
    };

    fetchPost();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
