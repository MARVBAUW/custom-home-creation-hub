
import { useState, useEffect } from 'react';
import { isClerkAvailable } from '@/utils/clerkUtils';

interface UseAuthTimeoutOptions {
  maxLoadingTime?: number;
  isClerkLoaded?: boolean;
  isDemoMode?: boolean;
  onTimeout?: () => void;
}

/**
 * Hook to handle authentication timeouts and fallbacks
 * Modified to not trigger demo mode
 */
export const useAuthTimeout = (options: UseAuthTimeoutOptions = {}) => {
  const { 
    maxLoadingTime = 3000,
    isClerkLoaded = false,
    isDemoMode = false,
    onTimeout
  } = options;
  
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);
  
  // Set a timeout to handle cases where Clerk doesn't load properly
  useEffect(() => {
    // If Clerk is expected to load, we'll still set a timeout
    // but now we won't trigger demo mode
    
    const timer = setTimeout(() => {
      if (!isClerkLoaded && !isDemoMode) {
        console.log('Clerk loading timed out after', maxLoadingTime, 'ms');
        setLoadingTimedOut(true);
        if (onTimeout) onTimeout();
      }
    }, maxLoadingTime);
    
    return () => clearTimeout(timer);
  }, [isClerkLoaded, maxLoadingTime, isDemoMode, onTimeout]);
  
  // Enhanced detection for Clerk initialization errors - using an even earlier check
  useEffect(() => {
    // Early check for Clerk, but we no longer enable demo mode
    
    const earlyErrorTimer = setTimeout(() => {
      if (!isClerkLoaded && !isDemoMode) {
        console.log('Early Clerk initialization error check - potential issue detected');
      }
    }, 2000); // Earlier check at 2 seconds
    
    return () => clearTimeout(earlyErrorTimer);
  }, [isClerkLoaded, isDemoMode, onTimeout]);
  
  return { loadingTimedOut };
};
