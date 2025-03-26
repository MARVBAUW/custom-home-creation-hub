
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useSignUp = (setLoading: (loading: boolean) => void, setError: (error: string | null) => void) => {
  const navigate = useNavigate();

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting to sign up with:', email);
      // Important: Désactivation complète de la vérification d'email
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata || {},
          // Aucune redirection d'email ne sera utilisée
          emailRedirectTo: undefined,
        }
      });

      if (error) {
        console.error('SignUp error:', error.message);
        let errorMessage = error.message;
        
        // Messages d'erreur plus détaillés
        if (errorMessage.includes('email') && errorMessage.includes('already')) {
          errorMessage = 'Cet email est déjà utilisé par un autre compte';
        }
        
        setError(errorMessage);
        toast({
          title: 'Échec d\'inscription',
          description: errorMessage,
          variant: 'destructive',
        });
      } else {
        console.log('SignUp successful:', data);
        
        // Gérer le résultat de l'inscription
        if (data.session) {
          // Connexion auto si la session est créée (la vérification d'email est désactivée)
          console.log('User automatically signed in');
          toast({
            title: 'Inscription réussie',
            description: 'Vous êtes maintenant connecté',
            variant: 'default',
          });
          navigate('/workspace/client-area');
        } else {
          // Si la vérification d'email est toujours requise malgré nos paramètres
          console.log('Email verification still required');
          toast({
            title: 'Inscription réussie',
            description: 'Vérifiez votre email pour confirmer votre compte',
            variant: 'default',
          });
          navigate('/workspace/sign-in');
        }
      }
    } catch (err) {
      console.error('Unexpected error during sign up:', err);
      setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
      toast({
        title: 'Erreur',
        description: 'Une erreur inattendue est survenue',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { signUp };
};
