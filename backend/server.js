const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi Database PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});

// 1. Endpoint Registrasi
app.post('/api/register', async (req, res) => {
  const { username, password, fullName, institution, major, semester } = req.body;

  if (!username || !password || !fullName) {
    return res.status(400).json({ message: 'Username, password, dan nama lengkap wajib diisi.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (username, password, full_name, institution, major, semester) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, username, full_name`,
      [username, hashedPassword, fullName, institution, major, semester]
    );

    res.status(201).json({ message: 'Registrasi berhasil!', user: newUser.rows[0] });
  } catch (error) {
    console.error('Register error:', error);
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Username sudah terdaftar.' });
    }
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// 2. Endpoint Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: 'Username atau password salah.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Username atau password salah.' });

    const { password: _, ...userData } = user;
    res.json({ message: 'Login berhasil!', user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// 3. Get Profil
app.get('/api/profile/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, username, full_name, institution, major, semester FROM users WHERE id = $1',
      [id]
    );

    const user = result.rows[0];
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan.' });

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// 4. Update Profil
app.put('/api/profile/:id', async (req, res) => {
  const { id } = req.params;
  const { fullName, institution, major, semester } = req.body;

  try {
    const updatedUser = await pool.query(
      `UPDATE users 
       SET full_name = $1, institution = $2, major = $3, semester = $4 
       WHERE id = $5 
       RETURNING id, username, full_name`,
      [fullName, institution, major, semester, id]
    );

    if (updatedUser.rowCount === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }

    res.json({ message: 'Profil berhasil diperbarui.', user: updatedUser.rows[0] });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

// Jalankan Server
app.listen(port, () => {
  console.log(`✅ Server berjalan di http://localhost:${port}`);
});
