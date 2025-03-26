
import React from 'react';
import { LogoSize } from './LogoConstants';
import { useTheme } from '@/hooks/use-theme';

interface MetallicFullLogoProps {
  size: LogoSize;
  getSizeClasses: () => string;
}

const MetallicFullLogo: React.FC<MetallicFullLogoProps> = ({ getSizeClasses }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`${getSizeClasses()} w-full max-w-4xl mx-auto`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4096 2174" className="w-full h-auto">
        <path 
          d="M 0,0 L 0,843 L 1,844 L 0,845 L 0,2173 L 4095,2173 L 4095,0 L 3056,0 L 3055,1 L 3054,0 Z" 
          fill={theme === 'dark' ? '#FFFFFF' : '#aaa05c'} 
          className="transition-colors duration-300"
        />
      </svg>
    </div>
  );
};

export default MetallicFullLogo;
