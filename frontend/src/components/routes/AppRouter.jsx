import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PostsProvider } from '../../contexts/postContexts';

// Route Components
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Page Components
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import CreatePostPage from '../pages/CreatePostPage';
import EditPostPage from '../pages/EditPostPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes - Redirect to dashboard if authenticated */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } 
        />

        {/* Protected Routes - Require authentication */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <PostsProvider>
                <DashboardPage />
              </PostsProvider>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/posts/create" 
          element={
            <ProtectedRoute>
              <PostsProvider>
                <CreatePostPage />
              </PostsProvider>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/posts/edit/:id" 
          element={
            <ProtectedRoute>
              <PostsProvider>
                <EditPostPage />
              </PostsProvider>
            </ProtectedRoute>
          } 
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;