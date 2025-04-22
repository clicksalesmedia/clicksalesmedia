import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  fullScreen = false,
  text = 'LOADING',
}) => {
  // Replace spinner with static SVG logo only
  const dimensions = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-28 h-28',
  };

  const containerClass = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white'
    : 'flex items-center justify-center min-h-screen bg-white';

  return (
    <div className={containerClass}>
      <div className={`relative ${dimensions[size]}`}>
        <object
          type="image/svg+xml"
          data="/svg/clicksalesmedia-symbol-v.svg"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner; 