
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Mode administrateur - ajoutez ici les emails qui doivent avoir un accès privilégié
const ADMIN_EMAILS = ['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'];

export const useSignIn = (setLoading: (loading: boolean) => void, setError: (error: string | null) => void) => {
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting to sign in with:', email);
      
      // Vérifier si c'est un email administrateur
      const isAdminUser = ADMIN_EMAILS.includes(email.toLowerCase());
      console.log('Is admin user:', isAdminUser);
      
      // Tentative de connexion
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('SignIn error:', error.message, error);
        let errorMessage = error.message;
        
        // Messages d'erreur plus détaillés pour aider au diagnostic
        if (errorMessage === 'Invalid login credentials') {
          console.log('Invalid credentials error details:', { email });
          errorMessage = 'Email ou mot de passe incorrect. Vérifiez vos identifiants.';
        } else if (errorMessage.includes('Email not confirmed')) {
          console.log('Email not confirmed for:', email);
          if (isAdminUser) {
            // Pour les utilisateurs administrateurs, on peut tenter une connexion forcée
            console.log('Attempting forced sign-in for admin user');
            try {
              // Connexion sans vérification d'email (nécessiterait une fonction edge)
              toast({
                title: 'Mode administrateur',
                description: 'Tentative de connexion en mode administrateur...',
                variant: 'default',
              });
              
              // Si l'utilisateur existe mais n'est pas confirmé, on pourrait ici
              // utiliser une méthode alternative de connexion ou une API spéciale
              
              // Pour l'instant, on notifie simplement l'utilisateur
              errorMessage = 'Compte admin détecté. Veuillez contacter le support pour activer votre compte.';
            } catch (adminError) {
              console.error('Admin bypass failed:', adminError);
            }
          } else {
            errorMessage = 'Veuillez vérifier votre email pour confirmer votre compte avant de vous connecter.';
          }
        }
        
        setError(errorMessage);
        toast({
          title: 'Échec de connexion',
          description: errorMessage,
          variant: 'destructive',
        });
      } else if (data.session) {
        console.log('SignIn successful', data.session);
        
        // Afficher des informations détaillées sur la session pour le débogage
        console.log('User ID:', data.session.user.id);
        console.log('User email:', data.session.user.email);
        console.log('Is email confirmed:', data.session.user.email_confirmed_at !== null);
        
        toast({
          title: 'Connexion réussie',
          description: 'Vous êtes maintenant connecté',
          variant: 'default',
        });
        navigate('/workspace/client-area');
      } else {
        // Cas rare où il n'y a ni erreur ni session
        console.warn('No error and no session - unusual state');
        setError('Une erreur inhabituelle s\'est produite. Veuillez réessayer.');
        toast({
          title: 'État inattendu',
          description: 'Aucune session n\'a été créée. Veuillez réessayer.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Unexpected error during sign in:', err);
      setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
      toast({
        title: 'Erreur',
        description: 'Une erreur inattendue est survenue lors de la connexion',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { signIn };
};
