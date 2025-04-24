
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LogoProps, LogoSize, LogoVariant, getSizeClasses } from './logos/LogoConstants';
import LogoRenderer from './logos/LogoRenderer';

const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  withTagline = false
}) => {
  // Cast to the defined types for variant and size
  const logoVariant = variant as LogoVariant;
  const logoSize = size as LogoSize;
  
  return (
    <Link 
      to="/" 
      className={cn("flex flex-col items-center no-underline", className)}
      aria-label="Accueil Progineer"
    >
      <div className={cn(
        "transition-all duration-300 hover:scale-105", 
        getSizeClasses(logoSize, logoVariant), 
        logoVariant === 'icon' ? 'logo-icon' : 'logo', 
        'object-contain'
      )}>
        <LogoRenderer variant={logoVariant} size={logoSize} />
      </div>
      {withTagline && (
        <span className={cn(
          "text-xs mt-1 font-medium tracking-wider", 
          logoVariant === 'white' ? 'text-white/90' : 
          logoVariant === 'metallic' || logoVariant === 'metallic-full' ? 'text-progineer-gold dark:text-progineer-gold/90' : 
          'text-progineer-gold dark:text-progineer-gold/90'
        )}>
          MAITRISE D'OEUVRE
        </span>
      )}
    </Link>
  );
};

export default Logo;
