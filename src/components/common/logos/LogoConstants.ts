
export interface LogoProps {
  variant?: 'default' | 'metallic' | 'metallic-full' | 'white' | 'icon';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withTagline?: boolean;
  asLink?: boolean;
}

// TypeScript types for component props
export type LogoVariant = 'default' | 'metallic' | 'metallic-full' | 'white' | 'icon';
export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const getSizeClasses = (size: string, variant: string) => {
  switch (size) {
    case 'xs':
      return variant === 'icon' ? 'h-5' : 'h-6';
    case 'sm':
      return variant === 'icon' ? 'h-6' : 'h-7';
    case 'md':
      return variant === 'icon' ? 'h-7' : 'h-8';
    case 'lg':
      return variant === 'icon' ? 'h-8' : 'h-9';
    case 'xl':
      return variant === 'icon' ? 'h-9' : 'h-10';
    default:
      return variant === 'icon' ? 'h-7' : 'h-8';
  }
};
