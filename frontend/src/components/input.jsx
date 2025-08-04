import React from 'react';

const Input = ({ label, type = 'text', value, onChange, error, className = '', ...props }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold mb-3" style={{ color: '#2D0605' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
          error 
            ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
            : 'border-gray-200 focus:ring-opacity-30 hover:border-gray-300'
        } ${className}`}
        style={{
          backgroundColor: error ? '#fef2f2' : '#fafafa',
          fontSize: '16px',
          ...(error ? {} : {
            focusBorderColor: '#80D39B',
            '--tw-ring-color': 'rgba(128, 211, 155, 0.3)'
          })
        }}
        onFocus={(e) => {
          if (!error) {
            e.target.style.borderColor = '#80D39B';
            e.target.style.boxShadow = '0 0 0 3px rgba(128, 211, 155, 0.1)';
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.target.style.borderColor = '#e5e7eb';
            e.target.style.boxShadow = 'none';
          }
        }}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm flex items-center" style={{ color: '#dc2626' }}>
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};
export default Input;