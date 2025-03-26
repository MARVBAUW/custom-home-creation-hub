
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Accès refusé",
        description: "Veuillez vous connecter pour accéder à cette page",
        variant: "destructive",
      });
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600 mb-4"></div>
        <p className="text-gray-600">Vérification de l'authentification...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/workspace/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
