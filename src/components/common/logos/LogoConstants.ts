
import { ComponentProps } from 'react';

export type LogoVariant = 'default' | 'white' | 'gold' | 'icon' | 'metallic' | 'metallic-full';
export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  withTagline?: boolean;
}

export const getSizeClasses = (size: LogoSize, variant: LogoVariant): string => {
  switch (size) {
    case 'sm':
      return variant === 'icon' ? 'h-6 w-auto' : 'h-8 w-auto';
    case 'lg':
      return variant === 'icon' ? 'h-10 w-auto' : 
             variant === 'metallic' ? 'h-36 w-auto' : 
             variant === 'metallic-full' ? 'h-40 w-auto' : 'h-14 w-auto';
    default:
      // md
      return variant === 'icon' ? 'h-8 w-auto' : 
             variant === 'metallic' ? 'h-28 w-auto' : 
             variant === 'metallic-full' ? 'h-32 w-auto' : 'h-10 w-auto';
  }
};
