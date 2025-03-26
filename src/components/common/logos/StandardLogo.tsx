
import React from 'react';
import { LogoSize, LogoVariant } from './LogoConstants';
import { useTheme } from '@/hooks/use-theme';

interface StandardLogoProps {
  variant: LogoVariant;
  size: LogoSize;
  getSizeClasses: () => string;
}

const StandardLogo: React.FC<StandardLogoProps> = ({ 
  variant,
  getSizeClasses 
}) => {
  const { theme } = useTheme();
  
  // Utiliser les nouveaux logos pour toutes les variantes
  const logoSrc = theme === 'dark' || variant === 'white'
    ? '/lovable-uploads/4d0c85b2-2421-42d1-aded-0c5d8f8cd32c.png'
    : '/lovable-uploads/60ffa026-5b1b-4779-b1b3-274f12df16ac.png';
  
  return (
    <div className={getSizeClasses()}>
      <img 
        src={logoSrc} 
        alt="Progineer Logo" 
        className="w-full h-auto object-contain transition-all duration-300 hover:filter hover:drop-shadow-lg"
      />
    </div>
  );
};

export default StandardLogo;
