
import React from 'react';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, size = 'lg', className = '' }) => {
  const getMaxWidthClass = () => {
    switch (size) {
      case 'sm': return 'max-w-screen-sm';
      case 'md': return 'max-w-screen-md';
      case 'lg': return 'max-w-screen-lg';
      case 'xl': return 'max-w-screen-xl';
      case 'full': return 'max-w-full';
      default: return 'max-w-screen-lg';
    }
  };

  return (
    <div className={`container mx-auto px-4 ${getMaxWidthClass()} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
