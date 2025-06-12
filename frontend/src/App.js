// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import MainLayout from './pages/layout/MainLayout';

// Pages
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';
import DashboardPage from './pages/dashboard/DashboardPage';
import PendaftaranPage from './pages/pendaftaran/PendaftaranPage';


// Komponen untuk melindungi rute
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('userId');
  return isLoggedIn ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rute Terlindungi (membutuhkan login) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        
        {/* Rute Pendaftaran (jika perlu halaman khusus) */}
        <Route 
  path="/pendaftaran" 
  element={
    <ProtectedRoute>
      <PendaftaranPage />
    </ProtectedRoute>
  } 
/>


        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;