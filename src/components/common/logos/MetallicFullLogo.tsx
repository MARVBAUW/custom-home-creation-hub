
import React from 'react';
import { LogoSize } from './LogoConstants';
import { useTheme } from '@/hooks/use-theme';

interface MetallicFullLogoProps {
  size: LogoSize;
  getSizeClasses: () => string;
}

const MetallicFullLogo: React.FC<MetallicFullLogoProps> = ({ getSizeClasses }) => {
  const { theme } = useTheme();
  
  // Utiliser une image différente selon le mode sombre ou clair
  const logoImageSrc = theme === 'dark' 
    ? '/lovable-uploads/8753e735-e513-46e3-95fe-e4f35ad442b3.png' 
    : '/lovable-uploads/67f2a370-23ac-488d-bc1c-98b2806a0230.png';
    
  return (
    <div className={`${getSizeClasses()} w-full max-w-4xl mx-auto`}>
      <img 
        src={logoImageSrc} 
        alt="Progineer - Maîtrise d'oeuvre" 
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

export default MetallicFullLogo;
