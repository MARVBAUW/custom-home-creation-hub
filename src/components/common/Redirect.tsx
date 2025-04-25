
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";

interface RedirectProps {
  to: string;
  message?: string;
}

const Redirect = ({ to, message }: RedirectProps) => {
  const location = useLocation();
  
  useEffect(() => {
    if (message) {
      toast({
        title: "Redirection",
        description: message,
        duration: 5000,
      });
    }
    
    // Log la redirection pour le suivi
    console.log(`Redirection 301 from ${location.pathname} to ${to}`);
  }, [to, message, location]);

  return <Navigate to={to} replace />;
};

export default Redirect;
