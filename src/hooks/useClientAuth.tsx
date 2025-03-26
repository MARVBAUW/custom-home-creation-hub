
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface UseClientAuthOptions {
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
  redirectIfUnauthenticated?: boolean;
  waitForAuthCheck?: boolean;
}

/**
 * Custom hook to handle client authentication logic with improved loading handling
 * @param options Configuration options for authentication behavior
 * @returns Authentication state and user information
 */
export const useClientAuth = (options: UseClientAuthOptions = {}) => {
  const { 
    redirectTo = '/workspace/sign-in',
    redirectIfAuthenticated = false,
    redirectIfUnauthenticated = false,
    waitForAuthCheck = true
  } = options;
  
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  
  // Add debugging logs
  useEffect(() => {
    console.log('useClientAuth: Authentication State', { isSignedIn, isLoaded, authChecked });
  }, [isSignedIn, isLoaded, authChecked]);
  
  // Handle redirection based on authentication state
  useEffect(() => {
    if (!isLoaded) return;
    
    if (isSignedIn && redirectIfAuthenticated) {
      console.log('User already signed in, redirecting to client area');
      toast({
        title: 'Session détectée',
        description: 'Redirection vers votre espace client...',
        variant: 'default',
      });
      navigate('/workspace/client-area');
    }
    
    if (!isSignedIn && redirectIfUnauthenticated) {
      console.log('User not signed in, redirecting to sign in page');
      toast({
        title: 'Authentification requise',
        description: 'Veuillez vous connecter pour accéder à cette page.',
        variant: 'destructive',
      });
      navigate(redirectTo);
    }
    
    // Mark auth check as complete regardless of outcome
    setAuthChecked(true);
  }, [isLoaded, isSignedIn, navigate, redirectTo, redirectIfAuthenticated, redirectIfUnauthenticated]);
  
  return { isLoaded, isSignedIn, user, authChecked };
};
