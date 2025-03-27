
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const useSignOut = (setLoading: (loading: boolean) => void, setError: (error: string | null) => void) => {
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('SignOut error:', error.message);
        setError(error.message);
        toast({
          title: 'Erreur de déconnexion',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        console.log('SignOut successful');
        toast({
          title: 'Déconnexion réussie',
          description: 'Vous avez été déconnecté avec succès.',
        });
        navigate('/');
      }
    } catch (err) {
      console.error('Unexpected error during sign out:', err);
      setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Une erreur inconnue est survenue',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { signOut };
};
