
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
    // Skip if we're already in demo mode
    if (isDemoMode) return;
    
    // If Clerk isn't available at all, consider it timed out immediately
    if (!isClerkAvailable()) {
      setLoadingTimedOut(true);
      if (onTimeout) onTimeout();
      return;
    }
    
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
    // If we're already in demo mode, no need to check for Clerk errors
    if (isDemoMode) return;
    
    // If Clerk isn't available at all, consider it timed out immediately
    if (!isClerkAvailable()) {
      setLoadingTimedOut(true);
      if (onTimeout) onTimeout();
      return;
    }
    
    const earlyErrorTimer = setTimeout(() => {
      if (!isClerkLoaded && !isDemoMode) {
        console.log('Early Clerk initialization error check - potential issue detected');
      }
    }, 2000); // Earlier check at 2 seconds
    
    return () => clearTimeout(earlyErrorTimer);
  }, [isClerkLoaded, isDemoMode, onTimeout]);
  
  return { loadingTimedOut };
};
