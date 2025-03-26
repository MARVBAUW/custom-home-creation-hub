
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Using a type guard to safely check if Clerk is available
const isClerkAvailable = (): boolean => {
  return typeof window !== 'undefined' && !(window as any).__DEMO_MODE__;
};

// Safe import of Clerk's useUser hook
let useUserSafe: any = () => ({ isLoaded: false, isSignedIn: false, user: null });

// Only try to import Clerk if it should be available
if (isClerkAvailable()) {
  try {
    // Dynamic import for Clerk
    // This is a trick to avoid the error when Clerk isn't available
    const clerk = require('@clerk/clerk-react');
    useUserSafe = clerk.useUser;
  } catch (error) {
    console.error('Failed to import Clerk', error);
  }
}

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
  
  // Check if we're in demo mode (set by main.tsx)
  const isDemoModeFromWindow = typeof window !== 'undefined' && (window as any).__DEMO_MODE__;
  
  // Safe use of Clerk's useUser
  const { isLoaded: clerkLoaded, isSignedIn, user } = isClerkAvailable() ? useUserSafe() : { isLoaded: false, isSignedIn: false, user: null };
  
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(isDemoModeFromWindow || false);
  
  // Immediately set demo mode if window flag is set
  useEffect(() => {
    if (isDemoModeFromWindow) {
      console.log('Demo mode detected from window configuration');
      setIsDemoMode(true);
      setIsLoaded(true);
      setAuthChecked(true);
    }
  }, [isDemoModeFromWindow]);
  
  // Enhanced detection for Clerk initialization errors - using an even earlier check (2 seconds)
  useEffect(() => {
    // If we're already in demo mode, no need to check for Clerk errors
    if (isDemoMode) return;
    
    // If Clerk isn't available at all, switch to demo mode immediately
    if (!isClerkAvailable()) {
      console.log('Clerk is not available, enabling demo mode');
      setIsDemoMode(true);
      setIsLoaded(true);
      setAuthChecked(true);
      return;
    }
    
    const earlyErrorTimer = setTimeout(() => {
      if (!clerkLoaded && !isDemoMode) {
        console.log('Early Clerk initialization error check - potential issue detected');
        
        if (allowDemoMode) {
          console.log('Preparing demo mode as fallback due to potential auth issues');
          // Just prepare demo mode but don't activate immediately - wait for the full timeout
        }
      }
    }, 2000); // Earlier check at 2 seconds
    
    return () => clearTimeout(earlyErrorTimer);
  }, [clerkLoaded, allowDemoMode, isDemoMode]);
  
  // Enhanced detection for Clerk initialization errors
  useEffect(() => {
    // If we're already in demo mode, skip this check
    if (isDemoMode) return;
    
    // Detect potential Clerk initialization errors by checking console errors
    const handleClerkError = () => {
      if (!clerkLoaded && !isDemoMode) {
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
  
  // Set a timeout to handle cases where Clerk doesn't load properly
  useEffect(() => {
    // Skip if we're already in demo mode
    if (isDemoMode) return;
    
    const timer = setTimeout(() => {
      if (!clerkLoaded && !isDemoMode) {
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
  }, [clerkLoaded, maxLoadingTime, navigate, allowDemoMode, isDemoMode]);
  
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
