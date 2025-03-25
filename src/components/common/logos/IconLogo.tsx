
import React from 'react';
import { LogoSize } from './LogoConstants';

interface IconLogoProps {
  size: LogoSize;
  getSizeClasses: () => string;
}

const IconLogo: React.FC<IconLogoProps> = ({ 
  getSizeClasses 
}) => {
  return (
    <svg viewBox="0 0 200 200" className={getSizeClasses()}>
      <defs>
        <linearGradient id="goldIcon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8a86d"/>
          <stop offset="100%" stopColor="#4b4b3b"/>
        </linearGradient>
      </defs>
      <path d="M40 40 L100 40 L120 70 L140 40 L180 40 L180 150 L140 150 L140 70 L120 100 L100 70 L60 70 L60 150 L20 150 L20 40 Z" 
        fill="none" 
        stroke="url(#goldIcon)" 
        strokeWidth="8" 
      />
    </svg>
  );
};

export default IconLogo;
