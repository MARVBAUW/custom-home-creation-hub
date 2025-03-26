
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
  allowDemoMode?: boolean;
}

/**
 * Custom hook to handle client authentication logic with improved error handling
 * @param options Configuration options for authentication behavior
 * @returns Authentication state and user information
 */
export const useClientAuth = (options: UseClientAuthOptions = {}) => {
  const { 
    redirectTo = '/workspace/sign-in',
    redirectIfAuthenticated = false,
    redirectIfUnauthenticated = false,
    waitForAuthCheck = true,
    maxLoadingTime = 3000, // Reduced timeout to 3 seconds for faster feedback
    allowDemoMode = true
  } = options;
  
  const { isLoaded: clerkLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  // Enhanced detection for Clerk initialization errors
  useEffect(() => {
    // Detect potential Clerk initialization errors by checking console errors
    const handleClerkError = () => {
      if (!clerkLoaded) {
        console.log('Potential Clerk initialization error detected');
        setLoadingTimedOut(true);
        setIsLoaded(true);
        setAuthChecked(true);
        
        if (allowDemoMode) {
          setIsDemoMode(true);
          
          // If on sign-in page and auth failed, automatically redirect to client area
          if (window.location.pathname === '/workspace/sign-in' || window.location.pathname === '/workspace/sign-up') {
            toast({
              title: 'Mode démonstration activé',
              description: 'Accès automatique à l\'espace client en mode démonstration.',
              variant: 'default',
            });
            navigate('/workspace/client-area');
          }
        }
      }
    };
    
    // Check more aggressively for Clerk errors
    const errorTimer = setTimeout(handleClerkError, 2000);
    return () => clearTimeout(errorTimer);
  }, [clerkLoaded, navigate, allowDemoMode]);
  
  // Fix debugging logs to properly display boolean values
  useEffect(() => {
    console.log('useClientAuth: Authentication State', { 
      isSignedIn, 
      clerkLoaded, 
      authChecked,
      loadingTimedOut,
      isDemoMode,
      redirectIfAuthenticated,
      redirectIfUnauthenticated
    });
  }, [isSignedIn, clerkLoaded, authChecked, loadingTimedOut, isDemoMode, redirectIfAuthenticated, redirectIfUnauthenticated]);
  
  // Set a timeout to handle cases where Clerk doesn't load properly
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!clerkLoaded) {
        console.log('Clerk loading timed out after', maxLoadingTime, 'ms');
        setLoadingTimedOut(true);
        setIsLoaded(true); // Mark as loaded even though Clerk failed
        setAuthChecked(true);
        
        if (allowDemoMode) {
          setIsDemoMode(true);
          console.log('Enabling demo mode due to authentication timeout');
          
          // If on sign-in page and auth timed out, automatically redirect to client area
          if (window.location.pathname === '/workspace/sign-in' || window.location.pathname === '/workspace/sign-up') {
            console.log('Redirecting from sign-in page to client area in demo mode');
            toast({
              title: 'Mode démonstration activé',
              description: 'Accès automatique à l\'espace client en mode démonstration.',
              variant: 'default',
            });
            navigate('/workspace/client-area');
          }
        }
      }
    }, maxLoadingTime);
    
    return () => clearTimeout(timer);
  }, [clerkLoaded, maxLoadingTime, navigate, allowDemoMode]);
  
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
  }, [
    clerkLoaded, 
    isSignedIn, 
    navigate, 
    redirectTo, 
    redirectIfAuthenticated, 
    redirectIfUnauthenticated
  ]);
  
  // Function to enable demo mode manually
  const enableDemoMode = () => {
    setIsDemoMode(true);
    setIsLoaded(true);
    setAuthChecked(true);
    toast({
      title: 'Mode démonstration activé',
      description: 'Vous accédez à l\'espace client en mode démonstration.',
      variant: 'default',
    });
  };

  // Function to access client area directly in demo mode
  const accessClientAreaInDemoMode = () => {
    enableDemoMode();
    navigate('/workspace/client-area');
  };
  
  return { 
    isLoaded: isLoaded || clerkLoaded, 
    clerkLoaded, 
    isSignedIn: isSignedIn === undefined ? false : isSignedIn, 
    user, 
    authChecked,
    loadingTimedOut,
    isDemoMode,
    enableDemoMode,
    accessClientAreaInDemoMode
  };
};
