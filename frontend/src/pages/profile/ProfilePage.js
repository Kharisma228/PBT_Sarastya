// src/pages/profile/ProfilePage.js
import React, { useEffect, useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    full_name: '',
    institution: '',
    major: '',
    semester: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch(`http://localhost:5000/api/profile/${userId}`)
        .then(res => res.json())
        .then(data => {
          if(data) setUserData(data);
        })
        .catch(err => console.error("Gagal memuat profil:", err));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`http://localhost:5000/api/profile/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              fullName: userData.full_name,
              phoneNumber: userData.phone_number,
              institution: userData.institution,
              major: userData.major,
              semester: userData.semester
          })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      alert('Profil berhasil diperbarui.');
      setEditing(false);
    } catch(error) {
        alert('Gagal menyimpan profil: ' + error.message);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Profil Pengguna</h2>
        <div className="profile-info">
          <div className="form-group">
            <label>Username</label>
            <input name="username" value={userData.username} disabled />
          </div>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input name="full_name" value={userData.full_name || ''} disabled={!editing} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Asal Institusi</label>
            <input name="institution" value={userData.institution || ''} disabled={!editing} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Jurusan</label>
            <input name="major" value={userData.major || ''} disabled={!editing} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Semester</label>
            <input type="number" name="semester" value={userData.semester || ''} disabled={!editing} onChange={handleChange} />
          </div>
        </div>
        <div className="profile-actions">
          {editing ? (
            <button className="save-btn" onClick={handleSave}>Simpan</button>
          ) : (
            <button className="edit-btn" onClick={() => setEditing(true)}>Edit Profil</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;