
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface UseClientAuthOptions {
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
  redirectIfUnauthenticated?: boolean;
  waitForAuthCheck?: boolean;
  maxLoadingTime?: number;
}

/**
 * Custom hook to handle client authentication logic with Supabase
 */
export const useClientAuth = (options: UseClientAuthOptions = {}) => {
  const { 
    redirectTo = '/workspace/sign-in',
    redirectIfAuthenticated = false,
    redirectIfUnauthenticated = false,
    waitForAuthCheck = true,
    maxLoadingTime = 3000
  } = options;
  
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set a timeout for loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setIsLoaded(true);
        setAuthChecked(true);
        
        if (!user) {
          toast({
            title: 'Authentification requise',
            description: 'Veuillez vous connecter pour accéder à cette page.',
            variant: 'destructive',
          });
        }
      }
    }, maxLoadingTime);
    
    return () => clearTimeout(timer);
  }, [loading, maxLoadingTime, user]);
  
  // Mark auth as checked when Supabase auth is loaded
  useEffect(() => {
    if (!loading) {
      setAuthChecked(true);
      setIsLoaded(true);
    }
  }, [loading]);
  
  // Log auth state for debugging
  useEffect(() => {
    console.log('useClientAuth: Authentication State', { 
      isSignedIn: !!user, 
      loading,
      authChecked,
      redirectIfAuthenticated,
      redirectIfUnauthenticated
    });
  }, [user, loading, authChecked, redirectIfAuthenticated, redirectIfUnauthenticated]);
  
  // Handle redirection based on authentication state
  useEffect(() => {
    if (!loading && authChecked) {
      // Handle redirects based on authentication state
      if (user && redirectIfAuthenticated) {
        console.log('User authenticated, redirecting to client area');
        toast({
          title: 'Session détectée',
          description: 'Redirection vers votre espace client...',
          variant: 'default',
        });
        navigate('/workspace/client-area');
      }
      
      if (!user && redirectIfUnauthenticated) {
        console.log('User not authenticated, redirecting to sign in page');
        toast({
          title: 'Authentification requise',
          description: 'Veuillez vous connecter pour accéder à cette page.',
          variant: 'destructive',
        });
        navigate(redirectTo);
      }
    }
  }, [
    loading, 
    user, 
    navigate, 
    redirectTo, 
    redirectIfAuthenticated, 
    redirectIfUnauthenticated,
    authChecked
  ]);
  
  return { 
    isLoaded: isLoaded || !loading, 
    loading,
    isSignedIn: !!user, 
    user, 
    authChecked
  };
};
