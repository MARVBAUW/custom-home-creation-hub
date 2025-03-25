
import React from 'react';
import { LogoSize, LogoVariant } from './LogoConstants';

interface StandardLogoProps {
  variant: LogoVariant;
  size: LogoSize;
  getSizeClasses: () => string;
}

const StandardLogo: React.FC<StandardLogoProps> = ({ 
  variant,
  getSizeClasses 
}) => {
  // Define gradient ID with a unique identifier to avoid conflicts
  const gradientId = `goldToDark-${Math.random().toString(36).substring(2, 9)}`;
  
  // Logo color based on variant
  const primaryColor = variant === 'white' ? "#FFFFFF" : "#c8a86d";
  const secondaryColor = variant === 'white' ? "#CCCCCC" : "#4b4b3b";

  return (
    <svg viewBox="0 0 941 512" xmlns="http://www.w3.org/2000/svg" className={getSizeClasses()}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={primaryColor}/>
          <stop offset="100%" stopColor={secondaryColor}/>
        </linearGradient>
        <filter id="logoGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Triangle gauche */}
      <polygon 
        points="0,196 364,94 361,465 234,465 234,305 357,267 0,510"
        fill={`url(#${gradientId})`} 
        className="logo-polygon"
      />

      {/* Triangle haut centre */}
      <polygon 
        points="707,0 500,59 500,228 707,0"
        fill={`url(#${gradientId})`} 
        className="logo-polygon"
      />

      {/* Ligne médiane vers droite */}
      <polygon 
        points="361,267 707,33 707,0 361,267"
        fill={`url(#${gradientId})`} 
        className="logo-polygon"
      />

      {/* Volume central (milieu corrigé) */}
      <polygon 
        points="500,228 605,312 604,465 500,465 500,228"
        fill={`url(#${gradientId})`} 
        className="logo-polygon"
      />

      {/* Bâtiment droit avec toit incliné */}
      <polygon 
        points="707,0 773,76 770,237 940,292 940,465 704,465"
        fill={`url(#${gradientId})`} 
        className="logo-polygon"
      />

      {/* Sol */}
      <rect 
        x="0" 
        y="465" 
        width="940" 
        height="2" 
        fill={variant === 'white' ? "#FFFFFF" : "#2a2a2a"} 
        className="logo-rect"
      />
    </svg>
  );
};

export default StandardLogo;
