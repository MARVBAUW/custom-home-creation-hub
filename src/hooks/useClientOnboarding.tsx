
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Profile, ClientProject } from '@/types/supabase';

export const useClientOnboarding = () => {
  const [isOnboardingRequired, setIsOnboardingRequired] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Check if user has completed the onboarding process
        const { data: projectData, error: projectError } = await supabase
          .from('client_projects')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (projectError) throw projectError;
        
        // Also check if the user has a complete profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, phone, address')
          .eq('id', user.id)
          .maybeSingle();
          
        if (profileError) throw profileError;
        
        // Determine if onboarding is required
        // It's required if:
        // 1. User has no projects, OR
        // 2. User has incomplete profile info
        const hasProject = projectData !== null;
        const hasCompleteProfile = profileData && 
                                  profileData.full_name && 
                                  profileData.phone && 
                                  profileData.address;
                                  
        setIsOnboardingRequired(!hasProject || !hasCompleteProfile);
        
        // Auto-open the modal if onboarding is required and user just logged in
        if (!hasProject && !localStorage.getItem('onboardingModalShown')) {
          setIsOnboardingModalOpen(true);
          localStorage.setItem('onboardingModalShown', 'true');
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkOnboardingStatus();
  }, [user]);
  
  // Listen for the userSignedUp event (triggered by admin notification)
  useEffect(() => {
    const handleUserSignedUp = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('User signed up event received:', customEvent.detail);
      
      if (customEvent.detail?.email) {
        setIsOnboardingModalOpen(true);
      }
    };
    
    window.addEventListener('userSignedUp', handleUserSignedUp);
    
    return () => {
      window.removeEventListener('userSignedUp', handleUserSignedUp);
    };
  }, []);
  
  return {
    isOnboardingRequired,
    isOnboardingModalOpen,
    setIsOnboardingModalOpen,
    isLoading
  };
};

export default useClientOnboarding;
