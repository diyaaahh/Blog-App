import React from 'react';

const Button = ({ children, variant = 'primary', loading = false, disabled = false, size = 'md', className = '', ...props }) => {
  const baseClasses = 'font-medium focus:outline-none focus:ring-2 transition-all duration-300 rounded-lg transform hover:scale-105';
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  const variants = {
    primary: 'text-white hover:shadow-lg focus:ring-opacity-50',
    secondary: 'text-white ',
    danger: ' text-white ',
    outline: 'border border-gray-300 text-gray-700',
  };

  const primaryStyle = {
    background: 'linear-gradient(135deg, #4C0827 0%, #2D0605 100%)',
    boxShadow: '0 4px 15px rgba(76, 8, 39, 0.6)',
    focusRingColor: '#4C0827'
  };
  const secondaryStyle = {
  backgroundColor: 'rgba(101, 14, 43, 0.8)' 
};
const dangerStyle = {
  backgroundColor: 'rgb(45,6,5)'
};
  const outlineStyle = {
  backgroundColor: 'rgba(128, 211, 155, 0.3)'
};

  return (
  <button
    className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${className} ${
      (disabled || loading) ? 'opacity-50 cursor-not-allowed transform-none' : ''
    }`}
    style={
      variant === 'primary' ? primaryStyle :
      variant === 'secondary' ? secondaryStyle :
      variant === 'danger' ? dangerStyle :
      variant === 'outline' ? outlineStyle : {}
    }
    disabled={disabled || loading}
    {...props}
  >
    {loading ? (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
        Redirecting...
      </div>
    ) : (
      children
    )}
  </button>
);
}
export default Button;