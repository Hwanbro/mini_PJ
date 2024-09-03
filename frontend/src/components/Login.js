import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // useHistory 대신 useNavigate 사용

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // 디버깅용 콘솔 로그 추가
    console.log('로그인 시도:', { username, password });

    axios.post('http://localhost:5000/api/auth/login', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        console.log('Login successful');
        navigate('/');  // 로그인 후 홈 페이지로 리디렉션
      })
      .catch(error => {
        console.error('로그인 실패:', error.response ? error.response.data : error.message);
        setError('로그인 실패. 사용자 이름 또는 비밀번호를 확인하세요.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;