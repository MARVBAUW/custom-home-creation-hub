
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'white' | 'gold' | 'icon' | 'metallic';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'md',
  className,
  withTagline = false
}) => {
  // Function to render the SVG logo
  const renderSvgLogo = () => {
    if (variant === 'metallic') {
      // New metallic logo
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
            <rect fill="url(#metalGradient)" height="720" width="1280" x="0" y="0"/>
            <rect height="720" width="1280" x="0" y="0"/>
            
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
    }

    if (variant === 'icon') {
      // For icon variant, we need to use a separate color logic
      // Logo icon (just the building symbol)
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
    }

    // Define gradient ID with a unique identifier to avoid conflicts
    const gradientId = `goldToDark-${Math.random().toString(36).substring(2, 9)}`;
    
    // Logo color based on variant
    const primaryColor = variant === 'white' ? "#FFFFFF" : "#c8a86d";
    const secondaryColor = variant === 'white' ? "#CCCCCC" : "#4b4b3b";

    // Full logo with modern building design
    return (
      <svg viewBox="0 0 941 512" xmlns="http://www.w3.org/2000/svg" className={getSizeClasses()}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={primaryColor}/>
            <stop offset="100%" stopColor={secondaryColor}/>
          </linearGradient>
        </defs>

        {/* Triangle gauche */}
        <polygon 
          points="0,196 364,94 361,465 234,465 234,305 357,267 0,510"
          fill={`url(#${gradientId})`} 
        />

        {/* Triangle haut centre */}
        <polygon 
          points="707,0 500,59 500,228 707,0"
          fill={`url(#${gradientId})`} 
        />

        {/* Ligne médiane vers droite */}
        <polygon 
          points="361,267 707,33 707,0 361,267"
          fill={`url(#${gradientId})`} 
        />

        {/* Volume central (milieu corrigé) */}
        <polygon 
          points="500,228 605,312 604,465 500,465 500,228"
          fill={`url(#${gradientId})`} 
        />

        {/* Bâtiment droit avec toit incliné */}
        <polygon 
          points="707,0 773,76 770,237 940,292 940,465 704,465"
          fill={`url(#${gradientId})`} 
        />

        {/* Sol */}
        <rect 
          x="0" 
          y="465" 
          width="940" 
          height="2" 
          fill={variant === 'white' ? "#FFFFFF" : "#2a2a2a"} 
        />
      </svg>
    );
  };

  // Determine CSS classes based on size
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return variant === 'icon' ? 'h-6 w-auto' : 'h-8 w-auto';
      case 'lg':
        return variant === 'icon' ? 'h-10 w-auto' : variant === 'metallic' ? 'h-36 w-auto' : 'h-14 w-auto';
      default:
        // md
        return variant === 'icon' ? 'h-8 w-auto' : variant === 'metallic' ? 'h-28 w-auto' : 'h-10 w-auto';
    }
  };

  return (
    <Link to="/" className={cn("flex flex-col items-center no-underline", className)}>
      <div className={cn("transition-all duration-300 hover:scale-105", getSizeClasses(), variant === 'icon' ? 'logo-icon' : 'logo', 'object-contain')}>
        {renderSvgLogo()}
      </div>
      {withTagline && (
        <span className={cn("text-xs mt-1 font-medium tracking-wider", 
          variant === 'white' ? 'text-white/90' : 'text-progineer-gold')}>
          MAITRISE D'OEUVRE
        </span>
      )}
    </Link>
  );
};

export default Logo;
