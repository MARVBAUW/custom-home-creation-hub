
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface UseClientAuthOptions {
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
  redirectIfUnauthenticated?: boolean;
  waitForAuthCheck?: boolean;
  maxLoadingTime?: number;
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
    waitForAuthCheck = true,
    maxLoadingTime = 6000 // Increased timeout to 6 seconds
  } = options;
  
  const { isLoaded: clerkLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);
  
  // Fix debugging logs to properly display boolean values
  useEffect(() => {
    console.log('useClientAuth: Authentication State', { 
      isSignedIn, 
      clerkLoaded, 
      authChecked,
      loadingTimedOut,
      redirectIfAuthenticated,
      redirectIfUnauthenticated
    });
  }, [isSignedIn, clerkLoaded, authChecked, loadingTimedOut, redirectIfAuthenticated, redirectIfUnauthenticated]);
  
  // Set a timeout to handle cases where Clerk doesn't load properly
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!clerkLoaded) {
        console.log('Clerk loading timed out after', maxLoadingTime, 'ms');
        setLoadingTimedOut(true);
        setIsLoaded(true); // Mark as loaded even though Clerk failed
        setAuthChecked(true);
      }
    }, maxLoadingTime);
    
    return () => clearTimeout(timer);
  }, [clerkLoaded, maxLoadingTime]);
  
  // Handle redirection based on authentication state
  useEffect(() => {
    // If clerk is loaded, use its authentication state
    if (clerkLoaded) {
      console.log('Clerk loaded, auth state:', isSignedIn);
      
      setAuthChecked(true);
      setIsLoaded(true);
      
      // Handle redirects based on authentication state
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
      return;
    }
    
    // If clerk loading timed out and we need to redirect unauthenticated users
    if (loadingTimedOut && redirectIfUnauthenticated) {
      console.log('Auth service timed out and redirectIfUnauthenticated is true');
      // We'll now allow access to client area even with loading timeout
      // instead of redirecting away, so users can see the demo mode
    }
  }, [
    clerkLoaded, 
    isSignedIn, 
    navigate, 
    redirectTo, 
    redirectIfAuthenticated, 
    redirectIfUnauthenticated, 
    loadingTimedOut
  ]);
  
  return { 
    isLoaded: isLoaded || clerkLoaded, 
    clerkLoaded, 
    isSignedIn: isSignedIn === undefined ? false : isSignedIn, 
    user, 
    authChecked,
    loadingTimedOut
  };
};
