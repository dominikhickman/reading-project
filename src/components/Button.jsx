import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  style = {},
  disabled = false
}) => {
  const getBackgroundColor = () => {
    switch(variant) {
      case 'primary': return 'var(--primary-color)';
      case 'secondary': return 'var(--secondary-color)';
      case 'accent': return 'var(--accent-color)';
      case 'danger': return '#FF4757';
      default: return 'var(--primary-color)';
    }
  };

  const getPadding = () => {
    switch(size) {
      case 'sm': return '8px 16px';
      case 'lg': return '16px 32px';
      default: return '12px 24px';
    }
  };

  const getFontSize = () => {
    switch(size) {
      case 'sm': return '1rem';
      case 'lg': return '1.5rem';
      default: return '1.2rem';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: getBackgroundColor(),
        color: 'white',
        padding: getPadding(),
        fontSize: getFontSize(),
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style
      }}
    >
      {children}
    </button>
  );
};

export default Button;
