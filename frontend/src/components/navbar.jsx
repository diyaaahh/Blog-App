
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="shadow-lg border-b-2" style={{ borderBottomColor: '#4C0827' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/dashboard" 
              className="text-xl text-center font-bold text-white hover:opacity-80 transition-opacity"
              style={{ color: '#200116' }}
            >
              Blog Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                   style={{ backgroundColor: '#80D39B', color: '#200116' }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="text-white font-medium">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:opacity-90 transform hover:scale-105"
              style={{ 
                backgroundColor: '#4C0827', 
                color: 'white',
                boxShadow: '0 2px 8px rgba(76, 8, 39, 0.3)'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
