
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface RedirectProps {
  to: string;
  message?: string;
}

/**
 * Composant pour gérer les redirections 301 avec message utilisateur
 */
const Redirect: React.FC<RedirectProps> = ({ to, message }) => {
  useEffect(() => {
    if (message) {
      toast({
        title: "Redirection",
        description: message,
        duration: 5000,
      });
    }
    
    // Log pour le suivi des redirections
    console.log(`Redirection 301: ${window.location.pathname} -> ${to}`);
  }, [to, message]);

  return <Navigate to={to} replace />;
};

export default Redirect;
