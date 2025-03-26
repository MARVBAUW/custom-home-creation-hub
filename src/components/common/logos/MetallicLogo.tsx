
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
    ? '/lovable-uploads/8753e735-e513-46e3-95fe-e4f35ad442b3.png'
    : '/lovable-uploads/67f2a370-23ac-488d-bc1c-98b2806a0230.png';
  
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
