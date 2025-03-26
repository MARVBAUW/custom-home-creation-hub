
import React from 'react';
import { LogoSize } from './LogoConstants';
import { useTheme } from '@/hooks/use-theme';

interface MetallicFullLogoProps {
  size: LogoSize;
  getSizeClasses: () => string;
}

const MetallicFullLogo: React.FC<MetallicFullLogoProps> = ({ getSizeClasses }) => {
  const { theme } = useTheme();
  const primaryColor = theme === 'dark' ? "#FFFFFF" : "#c8a86d";
  const secondaryColor = theme === 'dark' ? "#CCCCCC" : "#4b4b3b";
  
  return (
    <svg viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg" className={getSizeClasses()}>
      <defs>
        <linearGradient id="metallicFullGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={primaryColor}/>
          <stop offset="100%" stopColor={secondaryColor}/>
        </linearGradient>
        <filter id="hoverGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      
      {/* Logo PROGINEER */}
      <text x="250" y="100" fill="url(#metallicFullGradient)" className="metallic-full-path" style={{ fontFamily: 'sans-serif', fontSize: '80px', fontWeight: 300, letterSpacing: '15px' }}>
        PROGINEER
      </text>
      
      {/* Sous-titre */}
      <text x="600" y="150" fill="url(#metallicFullGradient)" className="metallic-full-path" style={{ fontFamily: 'sans-serif', fontSize: '24px', fontWeight: 300, letterSpacing: '5px', textAlign: 'center' }}>
        MAITRISE D'OEUVRE
      </text>
      
      {/* Lignes horizontales */}
      <line x1="250" y1="180" x2="550" y2="180" stroke="url(#metallicFullGradient)" strokeWidth="2" />
      <line x1="650" y1="180" x2="950" y2="180" stroke="url(#metallicFullGradient)" strokeWidth="2" />
    </svg>
  );
};

export default MetallicFullLogo;
