
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { isClerkAvailable, useUserSafe } from '@/utils/clerkUtils';
import { useDemoMode } from '@/hooks/useDemoMode';
import { useAuthTimeout } from '@/hooks/useAuthTimeout';

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
    maxLoadingTime = 3000,
    allowDemoMode = true
  } = options;
  
  // Safe use of Clerk's useUser
  const { isLoaded: clerkLoaded, isSignedIn, user } = isClerkAvailable() ? useUserSafe() : { isLoaded: false, isSignedIn: false, user: null };
  
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use the demo mode hook
  const { 
    isDemoMode, 
    setIsDemoMode, 
    enableDemoMode, 
    accessClientAreaInDemoMode 
  } = useDemoMode();
  
  // Set auth as checked/loaded if in demo mode
  useEffect(() => {
    if (isDemoMode) {
      setIsLoaded(true);
      setAuthChecked(true);
    }
  }, [isDemoMode]);
  
  // Handle timeout for authentication loading
  const handleTimeout = () => {
    setIsLoaded(true);
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
  };
  
  // Use the auth timeout hook
  const { loadingTimedOut } = useAuthTimeout({
    maxLoadingTime,
    isClerkLoaded: clerkLoaded,
    isDemoMode,
    onTimeout: handleTimeout
  });
  
  // Enhanced detection for Clerk initialization errors
  useEffect(() => {
    // If we're already in demo mode, skip this check
    if (isDemoMode) return;
    
    // Detect potential Clerk initialization errors by checking console errors
    const handleClerkError = () => {
      if (!clerkLoaded && !isDemoMode) {
        console.log('Potential Clerk initialization error detected');
        setLoadingTimeoutState();
        
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
    
    // Set common states for timeout
    const setLoadingTimeoutState = () => {
      setIsLoaded(true);
      setAuthChecked(true);
    };
    
    // Check more aggressively for Clerk errors
    const errorTimer = setTimeout(handleClerkError, 2000);
    return () => clearTimeout(errorTimer);
  }, [clerkLoaded, navigate, allowDemoMode, isDemoMode]);
  
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
  
  // Handle redirection based on authentication state
  useEffect(() => {
    // Skip if we're in demo mode
    if (isDemoMode) return;
    
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
    redirectIfUnauthenticated,
    isDemoMode
  ]);
  
  return { 
    isLoaded: isLoaded || clerkLoaded || isDemoMode, 
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
