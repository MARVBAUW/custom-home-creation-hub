import React from 'react';
import { LogoSize } from './LogoConstants';
interface MetallicFullLogoProps {
  size: LogoSize;
  getSizeClasses: () => string;
}
const MetallicFullLogo: React.FC<MetallicFullLogoProps> = ({
  getSizeClasses
}) => {
  return <svg height="720" width="1280" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={`${getSizeClasses()} metallic-logo`}>
      <defs>
        <linearGradient id="metalGradientFull" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f8f8f8" />
          <stop offset="25%" stopColor="#c6c6c6" />
          <stop offset="50%" stopColor="#999999" />
          <stop offset="75%" stopColor="#c6c6c6" />
          <stop offset="100%" stopColor="#f8f8f8" />
        </linearGradient>
        <filter id="shineFull">
          <feSpecularLighting in="SourceAlpha" surfaceScale="5" specularConstant="1" specularExponent="20" lightingColor="white" result="specOut">
            <fePointLight x="-5000" y="-10000" z="20000" />
          </feSpecularLighting>
          <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>
        
        <filter id="hoverGlowFull">
          <feGaussianBlur stdDeviation="4" result="blur" />
          
          <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#shineFull)" className="metallic-full-path">
        {/* Background removed - only keep the lines and logo */}
        
        {/* Lignes décoratives */}
        <path d="M0 0 251.387 0.0001" fill="none" stroke="#FFFFFF" strokeWidth="4" transform="matrix(1 0 0 -1 215 421)" />
        <path d="M215 284 1065.55 284" fill="none" stroke="#FFFFFF" strokeWidth="4" />
        <path d="M814 422 1065.39 422" fill="none" stroke="#FFFFFF" strokeWidth="4" />

        {/* Textes en URL metalGradientFull pour la visibilité */}
        <text x="197.67" y="373.684" fontSize="55.4" fontFamily="Arial, sans-serif" fill="url(#metalGradientFull)">P R O G I N E E R</text>
        <text x="498.569" y="427.582" fontSize="15.6" fontFamily="Arial, sans-serif" fill="url(#metalGradientFull)">M A I T R I S E D</text>
        <text x="664.187" y="420.648" fontSize="7.05" fontFamily="Arial, sans-serif" fill="url(#metalGradientFull)">'</text>
        <text x="675.689" y="427.608" fontSize="15.4" fontFamily="Arial, sans-serif" fill="url(#metalGradientFull)">O E U V R E</text>
      </g>
    </svg>;
};
export default MetallicFullLogo;