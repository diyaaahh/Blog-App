import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword } from '../../utils/validation';
import Input from '../input';
import Button from '../button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access before login
  const from = location.state?.from?.pathname || '/dashboard';

  const validateForm = () => {
    const newErrors = {};
    
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      // Redirect to intended page or dashboard
      navigate(from, { replace: true });
    } else {
      setErrors({ general: result.error });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold" style={{ color: '#4C0827' }}>
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Demo credentials: user@example.com / password
          </p>
        </div>
        
        <div className="mt-8 space-y-6 border-2 rounded-lg " 
        style={{
    borderColor: '#4C0827',
    boxShadow: '0 20px 25px -5px rgba(45, 6, 5, 0.1), 0 10px 10px -5px rgba(32, 1, 22, 0.04)'
  }}
       >
          <div className="bg-white p-8 rounded-lg shadow-md"
          >
            {errors.general && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errors.general}
              </div>
            )}
            
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={setEmail}
              error={errors.email}
              placeholder="Enter your email"
              onKeyPress={handleKeyPress}
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              error={errors.password}
              placeholder="Enter your password"
              onKeyPress={handleKeyPress}
            />
            
            <Button
              onClick={handleSubmit}
              loading={loading}
              className='w-full'
            >
              Sign In
            </Button>
            
            <div className="mt-4 text-center">
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-500 text-sm"
                style={{ color: '#80D39B' }}
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;