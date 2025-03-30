
import React from 'react';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
  fullBleed?: boolean; // Nouvelle propriété pour contrôler si le conteneur doit occuper toute la largeur
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  size = 'lg',
  className = '',
  fullBleed = false, // Par défaut, on utilise les tailles prédéfinies
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
        return 'max-w-full w-full';
      default:
        return 'max-w-[1024px]';
    }
  };

  return (
    <div className={`w-full ${getMaxWidth()} mx-auto px-4 md:px-6 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
