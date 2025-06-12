import React, { useState } from 'react';
import './PendaftaranPage.css';

const PendaftaranPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    khs: '',
    cv: '',
    portfolio: '',
    linkedin: '',
    github: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/pendaftaran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Pendaftaran berhasil dikirim!');
      } else {
        alert('Gagal mengirim pendaftaran.');
      }
    } catch (error) {
      console.error('Error submit:', error);
      alert('Terjadi kesalahan pada server.');
    }
  };

  return (
    <div className="pendaftaran-container">
      <div className="pendaftaran-card">
        <h2 style={{ position: 'sticky', top: 0, background: '#fff', padding: '12px 0', zIndex: 1 }}>
          Formulir Pendaftaran PKL/Prakerin
        </h2>

        <form onSubmit={handleSubmit} className="pendaftaran-form">
          <label>Nama Lengkap</label>
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Nomor WhatsApp</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Link KHS</label>
          <input type="text" name="khs" value={formData.khs} onChange={handleChange} required />

          <label>Link CV ATS</label>
          <input type="text" name="cv" value={formData.cv} onChange={handleChange} required />

          <label>Link Portofolio</label>
          <input type="text" name="portfolio" value={formData.portfolio} onChange={handleChange} required />

          <label>Link LinkedIn</label>
          <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} required />

          <label>Link GitHub</label>
          <input type="text" name="github" value={formData.github} onChange={handleChange} required />

          <button type="submit">Kirim Pendaftaran</button>
        </form>
      </div>
    </div>
  );
};

export default PendaftaranPage;
