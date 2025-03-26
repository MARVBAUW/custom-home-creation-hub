
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
  
  // Add debugging logs
  useEffect(() => {
    console.log('useClientAuth: Authentication State', { isSignedIn, clerkLoaded, authChecked });
  }, [isSignedIn, clerkLoaded, authChecked]);
  
  // Handle redirection based on authentication state
  useEffect(() => {
    if (!clerkLoaded) return;
    
    // Mark auth check as complete regardless of outcome
    setAuthChecked(true);
    
    // Mark fully loaded after a short delay to ensure UI transitions properly
    const loadingTimeout = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
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
    
    return () => clearTimeout(loadingTimeout);
  }, [clerkLoaded, isSignedIn, navigate, redirectTo, redirectIfAuthenticated, redirectIfUnauthenticated]);
  
  return { isLoaded, clerkLoaded, isSignedIn, user, authChecked };
};
