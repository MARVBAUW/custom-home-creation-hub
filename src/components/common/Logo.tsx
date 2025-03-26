
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LogoProps, getSizeClasses } from './logos/LogoConstants';
import LogoRenderer from './logos/LogoRenderer';

const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'md',
  className,
  withTagline = false,
  asLink = true
}) => {
  const LogoContent = (
    <div className="flex flex-col items-center">
      <div className={cn(
        "transition-all duration-300 hover:scale-105", 
        getSizeClasses(size, variant), 
        variant === 'icon' ? 'logo-icon' : 'logo', 
        'object-contain flex justify-center items-center'
      )}>
        <LogoRenderer variant={variant} size={size} />
      </div>
    </div>
  );
  
  // Either render as a link or just the content
  if (asLink) {
    return (
      <Link to="/" className={cn("flex flex-col items-center no-underline", className)}>
        {LogoContent}
      </Link>
    );
  }
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {LogoContent}
    </div>
  );
};

export default Logo;
