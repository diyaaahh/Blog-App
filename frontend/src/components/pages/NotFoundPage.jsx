import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../button';

const NotFoundPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          {isAuthenticated() ? (
            <Link to="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button>Go to Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;