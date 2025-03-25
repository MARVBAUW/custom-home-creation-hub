
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
    <svg height="720" width="1280" viewBox="0 0 1280 720" className={getSizeClasses()}>
      <defs>
        <linearGradient id="metalGradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#f8f8f8"/>
          <stop offset="25%" stopColor="#c6c6c6"/>
          <stop offset="50%" stopColor="#999999"/>
          <stop offset="75%" stopColor="#c6c6c6"/>
          <stop offset="100%" stopColor="#f8f8f8"/>
        </linearGradient>

        <filter id="shine">
          <feSpecularLighting in="SourceAlpha" lightingColor="white" result="specOut"
            specularConstant="1" specularExponent="20" surfaceScale="5">
            <fePointLight x="-5000" y="-10000" z="20000"/>
          </feSpecularLighting>
          <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
            k1="0" k2="1" k3="1" k4="0"/>
        </filter>
      </defs>

      <g filter="url(#shine)">
        <path d="M354 478 956.727 478"
              fill="none" stroke="#2E2E2E"
              strokeWidth="4" strokeMiterlimit="8"
              filter="url(#shine)" />
        
        <path d="M323 501 323 295.156 568.626 226.275 566.825 477.172 
                479.216 477.172C479.483 441.93 480.35 404.886 480.616 369.645 
                L661.435 317.583 733.443 372.848C732.91 407.556 732.376 442.264 
                731.843 476.972L661.235 476.972C661.302 385.396 661.369 293.822 
                661.435 202.246L800.65 163C800.117 267.657 799.583 372.314 
                799.05 476.972L956.666 477.372C956.133 438.659 957.399 398.746 
                956.866 360.033L844.654 323.19C844.121 286.346 846.588 250.103 
                846.055 213.259L816.651 179.019"
              fill="url(#metalGradient)"
              fillRule="evenodd"
              filter="url(#shine)" />
      </g>
    </svg>
  );
};

export default MetallicLogo;
