
import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Container = ({ children, size = 'md', className, ...props }: ContainerProps) => {
  const containerClass = size === 'sm' 
    ? 'container-sm' 
    : size === 'lg' 
      ? 'container-lg' 
      : 'container-md';
  
  return (
    <div className={cn(containerClass, className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
