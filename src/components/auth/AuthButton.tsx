
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface AuthButtonProps {
  type?: 'submit' | 'button';
  loading?: boolean;
  onClick?: () => void;
  isAdmin?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean; // Added the disabled prop
}

const AuthButton = ({
  type = 'submit',
  loading = false,
  onClick,
  isAdmin = false,
  children,
  className = '',
  disabled = false, // Added with a default value
}: AuthButtonProps) => {
  return (
    <Button 
      type={type}
      onClick={onClick}
      className={`w-full text-white ${
        isAdmin 
          ? 'bg-amber-600 hover:bg-amber-700' 
          : 'bg-khaki-600 hover:bg-khaki-700'
      } ${className}`}
      disabled={loading || disabled} // Modified to include both loading and disabled state
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Chargement...
        </>
      ) : children}
    </Button>
  );
};

export default AuthButton;
