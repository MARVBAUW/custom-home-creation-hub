import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  clientOnly?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  adminOnly = false,
  clientOnly = false 
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Check if user is admin based on email
  const isAdmin = user?.email && ['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'].includes(user.email);

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Accès refusé",
        description: "Veuillez vous connecter pour accéder à cette page",
        variant: "destructive",
      });
    } else if (!loading && adminOnly && !isAdmin) {
      toast({
        title: "Accès refusé",
        description: "Cette section est réservée aux administrateurs",
        variant: "destructive",
      });
    } else if (!loading && clientOnly && isAdmin) {
      toast({
        title: "Redirection",
        description: "Vous êtes redirigé vers l'espace administrateur",
      });
    }
  }, [user, loading, adminOnly, clientOnly, isAdmin]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600 mb-4"></div>
        <p className="text-gray-600">Vérification de l'authentification...</p>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/workspace/sign-in" state={{ from: location }} replace />;
  }

  // Restrict access for admin-only routes
  if (adminOnly && !isAdmin) {
    return <Navigate to="/workspace/client-area" replace />;
  }

  // Redirect admins to admin page if trying to access client-only areas
  if (clientOnly && isAdmin) {
    return <Navigate to="/workspace/client-area/admin" replace />;
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {children}
    </>
  );
};

export default ProtectedRoute;
