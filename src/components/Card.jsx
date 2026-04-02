import React from 'react';

const Card = ({ children, className = '', style = {}, onClick }) => {
  return (
    <div 
      className={`card ${className}`}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default Card;
