
import React from 'react';
import { LogoSize } from './LogoConstants';

interface MetallicLogoProps {
  size: LogoSize;
  getSizeClasses: () => string;
}

const MetallicLogo: React.FC<MetallicLogoProps> = ({
  getSizeClasses
}) => {
  return (
    <svg viewBox="0 0 941 512" xmlns="http://www.w3.org/2000/svg" className={getSizeClasses()}>
      <defs>
        <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37"/>
          <stop offset="50%" stopColor="#f5f5dc"/>
          <stop offset="100%" stopColor="#b8860b"/>
        </linearGradient>
        <filter id="metallic-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* Triangle gauche */}
      <polygon 
        points="0,196 364,94 361,465 234,465 234,305 357,267 0,510"
        fill="url(#goldMetallic)" 
        filter="url(#metallic-shadow)"
        className="logo-polygon"
      />

      {/* Triangle haut centre */}
      <polygon 
        points="707,0 500,59 500,228 707,0"
        fill="url(#goldMetallic)" 
        filter="url(#metallic-shadow)"
        className="logo-polygon"
      />

      {/* Ligne médiane vers droite */}
      <polygon 
        points="361,267 707,33 707,0 361,267"
        fill="url(#goldMetallic)" 
        filter="url(#metallic-shadow)"
        className="logo-polygon"
      />

      {/* Volume central (milieu corrigé) */}
      <polygon 
        points="500,228 605,312 604,465 500,465 500,228"
        fill="url(#goldMetallic)" 
        filter="url(#metallic-shadow)"
        className="logo-polygon"
      />

      {/* Bâtiment droit avec toit incliné */}
      <polygon 
        points="707,0 773,76 770,237 940,292 940,465 704,465"
        fill="url(#goldMetallic)" 
        filter="url(#metallic-shadow)"
        className="logo-polygon"
      />

      {/* Sol */}
      <rect 
        x="0" 
        y="465" 
        width="940" 
        height="2" 
        fill="#2a2a2a" 
        className="logo-rect"
      />
    </svg>
  );
};

export default MetallicLogo;
