import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${
      hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''
    } ${className}`}>
      {children}
    </div>
  );
};