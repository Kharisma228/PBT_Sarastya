// src/pages/dashboard/DashboardPage.js
import React from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-wrapper">

      <main className="dashboard-main">
        <div className="welcome-card">
          <h1>Selamat Datang di Portal PKL/Prakerin</h1>
          <h1>Sarastya Agility Innovations 👋</h1>
          <p>Kelola pendaftaran, lihat lowongan magang, dan pantau proses magangmu di satu tempat.</p>
        </div>

        <section className="internship-section">
          <h2>📌 Lowongan Magang Tersedia</h2>
          <p className="info-text">Fitur ini akan menampilkan daftar lowongan magang berdasarkan data dari sistem.</p>
          <div className="internship-placeholder">
            <p>🚧 Daftar lowongan akan segera tersedia di sini.</p>
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 Sarastya Technology. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
