
import React from 'react';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
  fullBleed?: boolean;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  size = 'lg',
  className = '',
  fullBleed = false,
}) => {
  const getMaxWidth = () => {
    if (fullBleed) return 'max-w-full w-full';
    
    switch (size) {
      case 'sm':
        return 'max-w-[640px]';
      case 'md':
        return 'max-w-[768px]';
      case 'lg':
        return 'max-w-[1024px]';
      case 'xl':
        return 'max-w-[1280px]';
      case 'full':
        return 'max-w-[1440px]'; // Increased from just full width to a specific large but constrained width
      default:
        return 'max-w-[1024px]';
    }
  };

  return (
    <div className={`w-full ${getMaxWidth()} mx-auto px-4 md:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
