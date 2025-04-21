import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  fullScreen = false,
  text = 'LOADING'
}) => {
  const dimensions = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  const container = fullScreen 
    ? "fixed inset-0 z-50 flex items-center justify-center bg-[#272727]" 
    : "flex items-center justify-center min-h-screen bg-[#272727]";

  return (
    <div className={container}>
      <div className={`relative ${dimensions[size]}`}>
        <div className="absolute top-0 w-full h-full border-8 border-gray-800 rounded-full"></div>
        <div className="absolute top-0 w-full h-full border-8 border-t-secondaryColor rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-secondaryColor font-bold">
          {text}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 