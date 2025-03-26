
import React from 'react';
import { LogoSize } from './LogoConstants';
import { useTheme } from '@/hooks/use-theme';

interface IconLogoProps {
  size: LogoSize;
  getSizeClasses: () => string;
}

const IconLogo: React.FC<IconLogoProps> = ({ 
  getSizeClasses 
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={getSizeClasses()}>
      <img 
        src={`/lovable-uploads/${theme === 'dark' ? 'b368b662-57ea-4b2f-8f6e-95746e433063.png' : '5b2ba673-2bf6-4e95-9da6-eaeafafa4e8e.png'}`}
        alt="Progineer Logo Icon"
        className="w-full h-auto transition-colors duration-300 logo-icon-path"
      />
    </div>
  );
};

export default IconLogo;
