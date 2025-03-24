
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
  // Fonction pour rendre le logo en SVG
  const renderSvgLogo = () => {
    if (variant === 'icon') {
      return (
        <svg viewBox="0 0 200 200" className={getSizeClasses()}>
          <rect width="200" height="200" fill="#996515" />
          <path d="M70 40 L70 160 L130 160 L130 120 L100 120 L100 100 L130 100 L130 60 L100 60 L100 40 Z" fill="#F5F5DC" />
        </svg>
      );
    }
    
    // Couleurs selon la variante
    let bgColor, textColor;
    switch (variant) {
      case 'white':
        bgColor = "transparent";
        textColor = "#FFFFFF";
        break;
      case 'gold':
        bgColor = "transparent";
        textColor = "#996515";
        break;
      default:
        bgColor = "transparent";
        textColor = "#222222";
    }

    return (
      <svg viewBox="0 0 300 100" className={getSizeClasses()}>
        <rect width="300" height="100" fill={bgColor} fillOpacity="0" />
        <text x="10" y="60" fontSize="40" fontWeight="bold" letterSpacing="1" fill={textColor}>
          PROGINEER
        </text>
      </svg>
    );
  };

  // Déterminer les classes CSS en fonction de la taille
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return variant === 'icon' ? 'h-6 w-auto' : 'h-8 w-auto';
      case 'lg':
        return variant === 'icon' ? 'h-10 w-auto' : 'h-14 w-auto';
      default: // md
        return variant === 'icon' ? 'h-8 w-auto' : 'h-10 w-auto';
    }
  };

  return (
    <Link to="/" className={cn("flex flex-col items-center no-underline", className)}>
      <div className={cn(
        getSizeClasses(), 
        variant === 'icon' ? 'logo-icon' : 'logo',
        'object-contain'
      )}>
        {renderSvgLogo()}
      </div>
      {withTagline && (
        <span className={cn(
          "text-xs mt-1 font-medium tracking-wider",
          variant === 'white' ? 'text-white/90' : 'text-progineer-gold'
        )}>
          MAITRISE D'OEUVRE
        </span>
      )}
    </Link>
  );
};

export default Logo;
