  // src/pages/login/LoginPage.js
  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import './LoginPage.css';
  import logo from '../../assets/2.jpg'; // Pastikan path ini benar

  const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok && data.user) {
          localStorage.setItem('userId', data.user.id);
          alert('Login berhasil!');
          navigate('/dashboard');
        } else {
          alert('Login gagal: ' + (data.message || 'Username atau password salah.'));
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Terjadi kesalahan saat menghubungi server.');
      }
    };

    return (
      <div className="login-wrapper">
        <div className="login-container">
          <img src={logo} alt="Sarastya Logo" className="login-logo" />
          <h2>PORTAL</h2>
          <h2>SARASTYA INTERNSHIP PROGRAM</h2>
        <p className="form-subtitle">PT SARASTYA TECHNOLOGY INTEGRATA</p>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

          <div className="link">
            Belum punya akun? <a href="/register">Daftar di sini</a>
          </div>
        </div>
      </div>
    );
  };

  export default LoginPage;
