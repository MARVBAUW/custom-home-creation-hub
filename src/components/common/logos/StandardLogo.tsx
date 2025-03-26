
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
  
  // Determine fill gradient colors based on theme and variant
  const getGradientColors = () => {
    if (variant === 'white') return { start: '#FFFFFF', end: '#CCCCCC' };
    if (variant === 'gold') return { start: '#d4af37', end: '#90834b' };
    return theme === 'dark' 
      ? { start: '#FFFFFF', end: '#CCCCCC' } 
      : { start: '#d4af37', end: '#90834b' };
  };
  
  const colors = getGradientColors();
  
  return (
    <div className={getSizeClasses()}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 2048 1087" className="w-full h-auto">
        <defs>
          <clipPath id="logoClipStd">
            <rect x="0" y="0" width="2048" height="1087" />
          </clipPath>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.start}/>
            <stop offset="100%" stopColor={colors.end}/>
          </linearGradient>
          <filter id="shineStd">
            <feSpecularLighting in="SourceAlpha" surfaceScale="5" specularConstant="1" specularExponent="20" lightingColor="white" result="specOut">
              <fePointLight x="-5000" y="-10000" z="20000"/>
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
          </filter>
        </defs>

        <g clipPath="url(#logoClipStd)">
          <path 
            d="M 0,0 L 0,421 L 1,422 L 0,423 L 0,1087 L 2048,1087 L 2048,0 L 1528,0 L 1527,1 L 1526,0 Z" 
            fill="url(#logoGradient)" 
            className="transition-colors duration-300"
            filter="url(#shineStd)"
          />
        </g>
      </svg>
    </div>
  );
};

export default StandardLogo;
