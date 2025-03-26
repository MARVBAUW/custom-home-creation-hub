
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
 * Modified to prioritize real authentication and disable demo mode
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
    allowDemoMode = false // Demo mode is now disabled by default
  } = options;
  
  // Safe use of Clerk's useUser
  const { isLoaded: clerkLoaded, isSignedIn, user } = isClerkAvailable() ? useUserSafe() : { isLoaded: false, isSignedIn: false, user: null };
  
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use the demo mode hook (modified to always return false)
  const { 
    isDemoMode: demoModeDisabled, 
    setIsDemoMode, 
    enableDemoMode, 
    accessClientAreaInDemoMode 
  } = useDemoMode();
  
  // Force isDemoMode to false regardless of what useDemoMode returns
  const isDemoMode = false;
  
  // Handle timeout for authentication loading
  const handleTimeout = () => {
    setIsLoaded(true);
    setAuthChecked(true);
    
    // Instead of enabling demo mode, show auth required message
    toast({
      title: 'Authentification requise',
      description: 'Le service d\'authentification est indisponible. Veuillez réessayer plus tard.',
      variant: 'destructive',
    });
    
    // Redirect to sign-in if on client area
    if (!window.location.pathname.includes('/workspace/sign-in') && 
        !window.location.pathname.includes('/workspace/sign-up') && 
        window.location.pathname.includes('/workspace')) {
      navigate('/workspace/sign-in');
    }
  };
  
  // Use the auth timeout hook
  const { loadingTimedOut } = useAuthTimeout({
    maxLoadingTime,
    isClerkLoaded: clerkLoaded,
    isDemoMode: false, // Always pass false
    onTimeout: handleTimeout
  });
  
  // Enhanced detection for Clerk initialization errors
  useEffect(() => {
    // Detect potential Clerk initialization errors by checking console errors
    const handleClerkError = () => {
      if (!clerkLoaded) {
        console.log('Potential Clerk initialization error detected');
        setIsLoaded(true);
        setAuthChecked(true);
        
        // Display error message instead of enabling demo mode
        toast({
          title: 'Erreur d\'authentification',
          description: 'Le service d\'authentification n\'a pas pu être chargé. Veuillez réessayer plus tard.',
          variant: 'destructive',
        });
      }
    };
    
    // Check more aggressively for Clerk errors
    const errorTimer = setTimeout(handleClerkError, 2000);
    return () => clearTimeout(errorTimer);
  }, [clerkLoaded, navigate]);
  
  // Fix debugging logs to properly display boolean values
  useEffect(() => {
    console.log('useClientAuth: Authentication State', { 
      isSignedIn, 
      clerkLoaded, 
      authChecked,
      loadingTimedOut,
      isDemoMode: false, // Always false
      redirectIfAuthenticated,
      redirectIfUnauthenticated
    });
  }, [isSignedIn, clerkLoaded, authChecked, loadingTimedOut, redirectIfAuthenticated, redirectIfUnauthenticated]);
  
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
  
  return { 
    isLoaded: isLoaded || clerkLoaded, 
    clerkLoaded, 
    isSignedIn: isSignedIn === undefined ? false : isSignedIn, 
    user, 
    authChecked,
    loadingTimedOut,
    isDemoMode: false, // Always false
    enableDemoMode: () => navigate('/workspace/sign-in'), // Redirect to sign-in instead
    accessClientAreaInDemoMode: () => navigate('/workspace/sign-in') // Redirect to sign-in instead
  };
};
