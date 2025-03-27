
import React, { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

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
      
      const subscription = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'USER_UPDATED' && session?.user) {
          // No need to notify admin of their own actions
          if (isAdmin && session.user.email && ['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'].includes(session.user.email)) {
            return;
          }
          
          toast({
            title: "Utilisateur mis à jour",
            description: `L'utilisateur ${session.user.email} a mis à jour son profil.`,
          });
        } else if (event === 'SIGNED_IN' && session?.user) {
          // No need to notify admin of their own login
          if (isAdmin && session.user.email && ['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'].includes(session.user.email)) {
            return;
          }
          
          toast({
            title: "Nouvelle connexion",
            description: `L'utilisateur ${session.user.email} s'est connecté.`,
          });
        }
      });
      
      return () => {
        subscription.data.subscription.unsubscribe();
      };
    }
  }, [isAdmin, isInitialized]);
  
  return null;
};
