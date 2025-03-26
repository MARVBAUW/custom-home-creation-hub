
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
  
  // Determine fill color based on theme and variant
  const getFillColor = () => {
    if (variant === 'white') return '#FFFFFF';
    if (variant === 'gold') return '#aaa05c';
    return theme === 'dark' ? '#FFFFFF' : '#aaa05c';
  };
  
  return (
    <div className={getSizeClasses()}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4096 2174" className="w-full h-auto">
        <path 
          d="M 0,0 L 0,843 L 1,844 L 0,845 L 0,2173 L 4095,2173 L 4095,0 L 3056,0 L 3055,1 L 3054,0 Z" 
          fill={getFillColor()} 
          className="transition-colors duration-300"
        />
      </svg>
    </div>
  );
};

export default StandardLogo;
