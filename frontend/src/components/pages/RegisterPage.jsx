import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword, validateName, validatePasswordMatch } from '../../utils/validation';
import Input from '../input';
import Button from '../button';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Mock validation functions
  const validateName = (name) => name.length < 2 ? 'Name must be at least 2 characters' : null;
  const validateEmail = (email) => !email.includes('@') ? 'Please enter a valid email' : null;
  const validatePassword = (password) => password.length < 6 ? 'Password must be at least 6 characters' : null;
  const validatePasswordMatch = (password, confirmPassword) => 
    password !== confirmPassword ? 'Passwords do not match' : null;

  const validateForm = () => {
    const newErrors = {};
    
    const nameError = validateName(name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;
    
    const confirmPasswordError = validatePasswordMatch(password, confirmPassword);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    // Mock registration
    setTimeout(() => {
      setLoading(false);
      console.log('Registration successful!');
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2" style={{ color: '#4C0827' }}>
            Create your account
          </h2>
        </div>
        
        {/* Form Container with subtle color accents */}
        <div className="mt-8">
          <div 
            className="bg-white p-8 rounded-2xl shadow-xl transform hover:shadow-2xl transition-all duration-300 border-2"
            style={{ 
              borderColor: '#4C0827', 
              boxShadow: '0 20px 25px -5px rgba(45, 6, 5, 0.1), 0 10px 10px -5px rgba(32, 1, 22, 0.04)'
            }}
          >
            
            {/* Error Message with brand colors */}
            {errors.general && (
              <div className="mb-6 p-4 rounded-xl border-l-4" 
                   style={{ 
                     borderColor: '#2D0605',
                     backgroundColor: 'rgba(45, 6, 5, 0.05)'
                   }}>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" style={{ color: '#2D0605' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span style={{ color: '#2D0605' }}>{errors.general}</span>
                </div>
              </div>
            )}
            
            {/* Form Fields */}
            <div className="space-y-2">
              <Input
                label="Full Name"
                value={name}
                onChange={setName}
                error={errors.name}
                placeholder="Enter your full name"
                onKeyPress={handleKeyPress}
              />
              
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
              
              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                error={errors.confirmPassword}
                placeholder="Confirm your password"
                onKeyPress={handleKeyPress}
              />
            </div>
            
            {/* Submit Button with burgundy gradient */}
            <div className="mt-8">
              <Button
                onClick={handleSubmit}
                loading={loading}
                size="lg"
                className="w-full"
              >
                Create Account
              </Button>
            </div>
            
            {/* Sign In Link */}
            <div className="mt-4 text-center">
                          <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-500 text-sm"
                            style={{ color: '#80D39B' }}
                          >
                            Already have an account? Sign in
                          </Link>
                        </div>
          </div>
        </div>
        
        {/* Footer with all colors represented */}
        <div className="text-center">
          <p className="text-sm" style={{ color: '#4C0827' }}>
            By creating an account, you agree to our{' '}
            <button className="underline hover:no-underline transition-colors duration-300" 
                    style={{ color: '#200116' }}
                    onMouseEnter={(e) => e.target.style.color = '#2D0605'}
                    onMouseLeave={(e) => e.target.style.color = '#200116'}>
              Terms of Service
            </button>
            {' '}and{' '}
            <button className="underline hover:no-underline transition-colors duration-300" 
                    style={{ color: '#200116' }}
                    onMouseEnter={(e) => e.target.style.color = '#2D0605'}
                    onMouseLeave={(e) => e.target.style.color = '#200116'}>
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;