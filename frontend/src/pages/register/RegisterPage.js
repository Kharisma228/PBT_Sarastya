// src/pages/register/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import logo from '../../assets/2.jpg';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    institution: '',
    major: '',
    email: '',
    semester: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert('Password dan Konfirmasi Password tidak cocok!');
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;

      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Gagal mendaftar.');
      }

      alert('Registrasi berhasil! Anda akan diarahkan ke halaman Login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registrasi gagal: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="form-title">BUAT AKUN</h2>
        <h2>SARASTYA INTERNSHIP PROGRAM</h2>
        <p className="form-subtitle">PT SARASTYA TECHNOLOGY INTEGRATA</p>

        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input type="text" name="fullName" placeholder="Nama Lengkap" value={formData.fullName} onChange={handleChange} required />
          <input type="text" name="institution" placeholder="Asal Institusi" value={formData.institution} onChange={handleChange} />
          <input type="text" name="major" placeholder="Jurusan" value={formData.major} onChange={handleChange} />
          <input type="number" name="semester" placeholder="Semester" value={formData.semester} onChange={handleChange} min="1" max="14" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Konfirmasi Password" value={formData.confirmPassword} onChange={handleChange} required />
          <input type="tel" name="phoneNumber" placeholder="Nomor Telepon" value={formData.phoneNumber} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>

          <button type="submit" className="submit-btn">Daftar</button>
        </form>

        <p className="bottom-text">
          Sudah punya akun? <Link to="/login" className="link">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
