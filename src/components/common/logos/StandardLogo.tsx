
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
  
  // Logo color based on theme and variant
  // Simple inversion des couleurs noir et blanc tout en préservant la couleur or
  const primaryColor = theme === 'dark' || variant === 'white' ? "#FFFFFF" : "#000000";
  const secondaryColor = theme === 'dark' || variant === 'white' ? "#EEEEEE" : "#333333";
  const goldColor = "#c8a86d";
  
  // Couleurs du logo selon le thème
  const logoColor = variant === 'default' 
    ? (theme === 'dark' ? "#FFFFFF" : "#000000") 
    : variant === 'white' 
      ? "#FFFFFF"
      : variant === 'gold'
        ? goldColor
        : primaryColor;
  
  // Define gradient ID with a unique identifier to avoid conflicts
  const gradientId = `logoGradient-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <svg viewBox="0 0 800 512" xmlns="http://www.w3.org/2000/svg" className={getSizeClasses()}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={variant === 'gold' ? goldColor : primaryColor}/>
          <stop offset="100%" stopColor={variant === 'gold' ? secondaryColor : secondaryColor}/>
        </linearGradient>
        <filter id="logoGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Building logo design */}
      <path 
        d="M80 400 L0 400 L275 150 L400 300 L525 150 L800 400 L720 400 L525 150 L400 300 L275 150 L80 400" 
        fill={variant === 'gold' ? `url(#${gradientId})` : logoColor} 
        className="logo-polygon"
        strokeWidth="5"
        stroke={logoColor}
      />
      <line 
        x1="0" 
        y1="400" 
        x2="800" 
        y2="400" 
        stroke={logoColor}
        strokeWidth="4" 
        className="logo-rect"
      />
    </svg>
  );
};

export default StandardLogo;
