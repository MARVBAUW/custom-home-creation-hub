
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LogoProps, getSizeClasses } from './logos/LogoConstants';
import LogoRenderer from './logos/LogoRenderer';

const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'md',
  className,
  withTagline = false
}) => {
  // Afficher les propriétés pour débogage
  console.log(`Logo rendering: variant=${variant}, size=${size}, withTagline=${withTagline}`);
  
  return (
    <Link to="/" className={cn("flex flex-col items-center no-underline", className)}>
      <div className={cn(
        "transition-all duration-300 hover:scale-105", 
        getSizeClasses(size, variant), 
        variant === 'icon' ? 'logo-icon' : 'logo', 
        'object-contain flex justify-center items-center'
      )}>
        <LogoRenderer variant={variant} size={size} />
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
