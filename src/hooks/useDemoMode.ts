
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { getDemoModeFromWindow } from '@/utils/clerkUtils';

/**
 * Hook for handling demo mode functionality
 * Modified to always disable demo mode
 */
export const useDemoMode = () => {
  const navigate = useNavigate();
  // Demo mode always disabled
  const isDemoModeFromWindow = false;
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  // We don't enable demo mode automatically anymore
  useEffect(() => {
    // Demo mode is always disabled
    console.log('Demo mode is disabled');
  }, []);
  
  // Function to enable demo mode manually - now disabled
  const enableDemoMode = () => {
    // Demo mode is disabled, redirect to sign-in instead
    toast({
      title: 'Authentification requise',
      description: 'Veuillez vous connecter pour accéder à l\'espace client.',
      variant: 'destructive',
    });
    navigate('/workspace/sign-in');
  };

  // Function to access client area - now requires auth
  const accessClientAreaInDemoMode = () => {
    // Instead of enabling demo mode, redirect to sign-in
    toast({
      title: 'Authentification requise',
      description: 'Veuillez vous connecter pour accéder à l\'espace client.',
      variant: 'destructive',
    });
    navigate('/workspace/sign-in');
  };
  
  return {
    isDemoMode: false,
    setIsDemoMode: () => {}, // No-op function
    enableDemoMode,
    accessClientAreaInDemoMode
  };
};
