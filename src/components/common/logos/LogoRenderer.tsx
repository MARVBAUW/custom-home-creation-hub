
import React from 'react';
import { LogoVariant, LogoSize, getSizeClasses } from './LogoConstants';
import MetallicFullLogo from './MetallicFullLogo';
import MetallicLogo from './MetallicLogo';
import IconLogo from './IconLogo';
import StandardLogo from './StandardLogo';

interface LogoRendererProps {
  variant: LogoVariant;
  size: LogoSize;
}

const LogoRenderer: React.FC<LogoRendererProps> = ({ variant, size }) => {
  const getClasses = () => getSizeClasses(size, variant);

  if (variant === 'metallic-full') {
    return <MetallicFullLogo size={size} getSizeClasses={getClasses} />;
  }

  if (variant === 'metallic') {
    return <MetallicLogo size={size} getSizeClasses={getClasses} />;
  }

  if (variant === 'icon') {
    return <IconLogo size={size} getSizeClasses={getClasses} />;
  }

  // Standard, white, gold, default
  return <StandardLogo variant={variant} size={size} getSizeClasses={getClasses} />;
};

export default LogoRenderer;
