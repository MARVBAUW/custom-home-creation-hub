
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'white' | 'gold' | 'icon';
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
    if (variant === 'icon') {
      // Logo icon (just the building symbol)
      return (
        <svg viewBox="0 0 200 200" className={getSizeClasses()}>
          <path d="M0 150 L200 150 M40 40 L100 40 L120 70 L140 40 L180 40 L180 150 L140 150 L140 70 L120 100 L100 70 L60 70 L60 150 L20 150 L20 40 Z" 
            fill="none" 
            stroke="#996515" 
            strokeWidth="8" 
          />
        </svg>
      );
    }

    // Logo color based on variant
    const strokeColor = variant === 'white' ? "#FFFFFF" : "#996515";

    // Full logo with modern building design
    return (
      <svg viewBox="0 0 941 512" xmlns="http://www.w3.org/2000/svg" className={getSizeClasses()}>
        <defs>
          <linearGradient id="goldToDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={variant === 'white' ? "#FFFFFF" : "#c8a86d"}/>
            <stop offset="100%" stopColor={variant === 'white' ? "#CCCCCC" : "#4b4b3b"}/>
          </linearGradient>
        </defs>

        {/* Triangle gauche */}
        <polygon 
          points="0,196 364,94 361,465 234,465 234,305 357,267 0,510"
          fill="url(#goldToDark)" 
        />

        {/* Triangle haut centre */}
        <polygon 
          points="707,0 500,59 500,228 707,0"
          fill="url(#goldToDark)" 
        />

        {/* Ligne médiane vers droite */}
        <polygon 
          points="361,267 707,33 707,0 361,267"
          fill="url(#goldToDark)" 
        />

        {/* Volume central (milieu corrigé) */}
        <polygon 
          points="500,228 605,312 604,465 500,465 500,228"
          fill="url(#goldToDark)" 
        />

        {/* Bâtiment droit avec toit incliné */}
        <polygon 
          points="707,0 773,76 770,237 940,292 940,465 704,465"
          fill="url(#goldToDark)" 
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
        return variant === 'icon' ? 'h-10 w-auto' : 'h-14 w-auto';
      default:
        // md
        return variant === 'icon' ? 'h-8 w-auto' : 'h-10 w-auto';
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
