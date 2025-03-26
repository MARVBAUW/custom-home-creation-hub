
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  target?: string;
  rel?: string;
}

const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  target,
  rel,
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();
  
  const baseStyles = cn(
    'relative inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    
    // Variant styles with theme adaptations
    variant === 'primary' && theme === 'light' 
      ? 'bg-progineer-gold text-white shadow hover:bg-progineer-gold/90 hover:-translate-y-0.5' 
      : variant === 'primary' && theme === 'dark'
      ? 'bg-progineer-gold text-white shadow-md hover:bg-progineer-gold/90 hover:-translate-y-0.5 shadow-progineer-gold/20'
      : '',
    
    variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    
    variant === 'outline' && theme === 'light' 
      ? 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700' 
      : variant === 'outline' && theme === 'dark'
      ? 'border border-gray-700 bg-transparent hover:bg-gray-800 text-gray-200'
      : '',
    
    // Size styles
    size === 'sm' && 'h-8 text-xs px-3 py-2',
    size === 'md' && 'h-10 text-sm px-4 py-2',
    size === 'lg' && 'h-12 text-base px-6 py-3',
    
    className
  );

  if (href) {
    if (isExternal) {
      return (
        <a 
          href={href} 
          className={baseStyles}
          target={target || "_blank"}
          rel={rel || "noopener noreferrer"}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link to={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
