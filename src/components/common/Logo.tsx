
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
  // Déterminer quelle image afficher selon la variante
  const getLogoSrc = () => {
    if (variant === 'icon') {
      return '/images/progineer-icon.png';
    }
    
    switch (variant) {
      case 'white':
        return '/images/progineer-logo-white.png';
      case 'gold':
        return '/images/progineer-logo-gold.png';
      default:
        return '/images/progineer-logo.png';
    }
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
      <img 
        src={getLogoSrc()} 
        alt="Progineer - Maîtrise d'oeuvre" 
        className={cn(
          getSizeClasses(), 
          variant === 'icon' ? 'logo-icon' : 'logo',
          'object-contain'
        )}
      />
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
