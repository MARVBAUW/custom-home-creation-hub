
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
  
  const { isLoaded: clerkLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Fix debugging logs to properly display boolean values
  useEffect(() => {
    console.log('useClientAuth: Authentication State', { 
      isSignedIn, 
      clerkLoaded, 
      authChecked,
      redirectIfAuthenticated,
      redirectIfUnauthenticated
    });
  }, [isSignedIn, clerkLoaded, authChecked, redirectIfAuthenticated, redirectIfUnauthenticated]);
  
  // Handle redirection based on authentication state
  useEffect(() => {
    // Do nothing if Clerk is still loading
    if (!clerkLoaded) {
      console.log('Clerk still loading, waiting...');
      return;
    }
    
    console.log('Clerk loaded, auth state:', isSignedIn);
    
    // Set timeout to mark auth as checked to prevent immediate redirects causing loops
    setTimeout(() => {
      setAuthChecked(true);
      setIsLoaded(true);
      
      // Only redirect after a small delay to prevent redirection loops
      if (isSignedIn === true && redirectIfAuthenticated) {
        console.log('User authenticated, redirecting to client area');
        toast({
          title: 'Session détectée',
          description: 'Redirection vers votre espace client...',
          variant: 'default',
        });
        navigate('/workspace/client-area');
      }
      
      if (isSignedIn === false && redirectIfUnauthenticated) {
        console.log('User not authenticated, redirecting to sign in page');
        toast({
          title: 'Authentification requise',
          description: 'Veuillez vous connecter pour accéder à cette page.',
          variant: 'destructive',
        });
        navigate(redirectTo);
      }
    }, 300); // Small delay to prevent immediate redirects
    
  }, [clerkLoaded, isSignedIn, navigate, redirectTo, redirectIfAuthenticated, redirectIfUnauthenticated]);
  
  return { 
    isLoaded, 
    clerkLoaded, 
    isSignedIn: isSignedIn === undefined ? false : isSignedIn, 
    user, 
    authChecked 
  };
};
