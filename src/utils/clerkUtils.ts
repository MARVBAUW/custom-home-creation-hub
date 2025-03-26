
/**
 * Utilities for detecting and handling Clerk authentication availability
 */

// Using a type guard to safely check if Clerk is available
export const isClerkAvailable = (): boolean => {
  return typeof window !== 'undefined' && !(window as any).__DEMO_MODE__;
};

// Get demo mode status from window - always returns false to disable demo mode
export const getDemoModeFromWindow = (): boolean => {
  // Always return false to disable demo mode
  return false;
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

export { useUserSafe };
