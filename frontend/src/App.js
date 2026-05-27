// =============================================================
// src/App.js  —  Router Configuration
// Defines all routes. Protected routes check for a token in
// localStorage before rendering; unauthenticated users are
// redirected to /login.
//
// HOW TO UPGRADE:
//   - Add a new page: import it + add a <Route> below
//   - For role-based access: pass user.role into ProtectedRoute
//     and redirect based on insufficient permissions
//   - Replace localStorage check with a React Context / Zustand
//     store for a more robust auth state management
// =============================================================

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage    from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import './styles/global.css';

// ProtectedRoute — wraps any page that requires authentication.
// Redirects to /login if no token is found.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes — add new authenticated pages here */}
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

        {/* Catch-all: redirect unknown paths to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
