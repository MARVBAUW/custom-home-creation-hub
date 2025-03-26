
import React from 'react';
import { LogoSize } from './LogoConstants';
import { useTheme } from '@/hooks/use-theme';

interface MetallicLogoProps {
  size: LogoSize;
  getSizeClasses: () => string;
}

const MetallicLogo: React.FC<MetallicLogoProps> = ({ 
  getSizeClasses 
}) => {
  const { theme } = useTheme();
  
  // Utiliser le logo approprié selon le thème
  const logoSrc = theme === 'dark' 
    ? '/lovable-uploads/4d0c85b2-2421-42d1-aded-0c5d8f8cd32c.png'
    : '/lovable-uploads/60ffa026-5b1b-4779-b1b3-274f12df16ac.png';
  
  return (
    <div className={`${getSizeClasses()} metallic-logo`}>
      <img 
        src={logoSrc} 
        alt="Progineer Logo" 
        className="w-full h-auto object-contain transition-all duration-300 hover:filter hover:drop-shadow-lg"
      />
    </div>
  );
};

export default MetallicLogo;
