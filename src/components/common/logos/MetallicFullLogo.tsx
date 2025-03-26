
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
    ? '/lovable-uploads/4d0c85b2-2421-42d1-aded-0c5d8f8cd32c.png' 
    : '/lovable-uploads/60ffa026-5b1b-4779-b1b3-274f12df16ac.png';
    
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
