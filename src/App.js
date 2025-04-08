import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SubscriptionDetailPage from './pages/SubscriptionDetailPage';
import CategorySubscriptionsPage from './pages/CategorySubscriptionsPage';
import { useAuth } from './contexts/AuthContext';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Box sx={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
        <Route path="/subscription/:id" element={
          <ProtectedRoute>
            <SubscriptionDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/category/:id" element={
          <ProtectedRoute>
            <CategorySubscriptionsPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );
}

export default App;
