
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'estimation';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
}

const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  ...props
}: ButtonProps) => {
  const baseStyles = cn(
    'relative inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    variant === 'primary' && 'bg-khaki-600 text-khaki-50 shadow hover:bg-khaki-700',
    variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    variant === 'outline' && 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    variant === 'estimation' && 'bg-[#8B5CF6] text-white shadow-lg hover:bg-[#7C3AED] border-2 border-white/20',
    size === 'sm' && 'h-8 text-xs px-3',
    size === 'md' && 'h-10 text-sm px-4',
    size === 'lg' && 'h-12 text-base px-6',
    className
  );

  if (href) {
    if (isExternal) {
      return (
        <a 
          href={href} 
          className={baseStyles}
          target="_blank"
          rel="noopener noreferrer"
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
