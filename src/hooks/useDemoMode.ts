
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { getDemoModeFromWindow } from '@/utils/clerkUtils';

/**
 * Hook for handling demo mode functionality
 */
export const useDemoMode = () => {
  const navigate = useNavigate();
  const isDemoModeFromWindow = getDemoModeFromWindow();
  const [isDemoMode, setIsDemoMode] = useState(isDemoModeFromWindow || false);
  
  // Immediately set demo mode if window flag is set
  useEffect(() => {
    if (isDemoModeFromWindow) {
      console.log('Demo mode detected from window configuration');
      setIsDemoMode(true);
    }
  }, [isDemoModeFromWindow]);
  
  // Function to enable demo mode manually
  const enableDemoMode = () => {
    setIsDemoMode(true);
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
    isDemoMode,
    setIsDemoMode,
    enableDemoMode,
    accessClientAreaInDemoMode
  };
};
