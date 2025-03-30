
import React, { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { AuthChangeEvent } from '@supabase/supabase-js';

// Define a type that aligns with the actual string values Supabase uses
type AuthEvent = 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'USER_DELETED' | 'PASSWORD_RECOVERY' | 'TOKEN_REFRESHED' | 'SIGNED_UP';

export const UserRegistrationNotificationsContainer = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useAuth();
  
  // Check if the user is an administrator
  const isAdmin = user?.email && ['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'].includes(user.email);
  
  // Only administrators should be notified of new user registrations
  useEffect(() => {
    if (!isAdmin) return;
    
    if (!isInitialized) {
      setIsInitialized(true);
      
      const subscription = supabase.auth.onAuthStateChange((event: AuthChangeEvent | AuthEvent, session) => {
        // Only notify the admin about others' activity, not their own
        if ((event === 'USER_UPDATED' || event === 'SIGNED_IN') && 
            session?.user && 
            isAdmin && 
            session.user.email && 
            !['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'].includes(session.user.email)) {
          
          if (event === 'USER_UPDATED') {
            toast({
              title: "Utilisateur mis à jour",
              description: `L'utilisateur ${session.user.email} a mis à jour son profil.`,
            });
          } else if (event === 'SIGNED_IN') {
            toast({
              title: "Nouvelle connexion",
              description: `L'utilisateur ${session.user.email} s'est connecté.`,
            });
          }
        }
        
        // Special handling for new user registration (only for admins)
        if (event === 'SIGNED_UP' && isAdmin) {
          toast({
            title: "Nouvel utilisateur",
            description: `L'utilisateur ${session?.user?.email || 'Inconnu'} vient de s'inscrire.`,
            variant: "default",
            duration: 5000,
          });
          
          // Trigger the modal to appear for the user to complete their project details
          window.dispatchEvent(new CustomEvent('userSignedUp', { 
            detail: { email: session?.user?.email }
          }));
        }
      });
      
      return () => {
        subscription.data.subscription.unsubscribe();
      };
    }
  }, [isAdmin, isInitialized]);
  
  return null;
};

export default UserRegistrationNotificationsContainer;
