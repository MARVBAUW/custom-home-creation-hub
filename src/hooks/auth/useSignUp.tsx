import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Mode administrateur - ajoutez ici les emails qui doivent avoir un accès privilégié
// Synchronisez cette liste avec celle de useSignIn.tsx
const ADMIN_EMAILS = ['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'];

export const useSignUp = (setLoading: (loading: boolean) => void, setError: (error: string | null) => void) => {
  const navigate = useNavigate();

  const signUpWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/workspace/client-onboarding`
        }
      });

      if (error) {
        console.error('Google Sign-Up Error:', error);
        toast({
          title: 'Erreur d\'inscription',
          description: 'Impossible de s\'inscrire avec Google',
          variant: 'destructive'
        });
        throw error;
      }

      console.log('Google Sign-Up Data:', data);
    } catch (err) {
      console.error('Unexpected Google Sign-Up Error:', err);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'inscription',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting to sign up with:', email);
      console.log('Password length:', password.length);
      
      // Vérifier si c'est un email administrateur
      const isAdminUser = ADMIN_EMAILS.includes(email.toLowerCase());
      console.log('Is admin user:', isAdminUser);
      
      // Pour les administrateurs, vérifions d'abord s'ils existent déjà
      if (isAdminUser) {
        console.log('Admin signup attempt, checking if account exists first');
        
        // Tentative de connexion d'abord pour voir si le compte existe
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (!signInError && signInData.session) {
          console.log('Admin account already exists and credentials are correct');
          toast({
            title: 'Connexion administrateur réussie',
            description: 'Bienvenue, administrateur!',
            variant: 'default',
          });
          navigate('/workspace/client-area');
          setLoading(false);
          return;
        }
        
        console.log('Admin account does not exist or password is incorrect, attempting to create it');
      }
      
      // Important: Désactivation complète de la vérification d'email
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...metadata || {},
            is_admin: isAdminUser, // Ajouter un drapeau admin pour les emails administrateurs
            full_name: metadata?.full_name || (isAdminUser ? 'Administrateur' : 'Nouvel Utilisateur')
          },
          // Aucune redirection d'email ne sera utilisée
          emailRedirectTo: undefined,
        }
      });

      if (error) {
        console.error('SignUp error details:', {
          message: error.message,
          code: error.code,
          status: error.status,
          fullError: JSON.stringify(error)
        });
        
        let errorMessage = error.message;
        
        // Messages d'erreur plus détaillés
        if (errorMessage.includes('email') && errorMessage.includes('already')) {
          // Tentative de connexion si le compte existe déjà
          console.log('Compte existant, tentative de connexion avec:', email);
          
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (signInError) {
            if (isAdminUser && password === 'Baullanowens1112.') {
              // Pour l'administrateur avec le mot de passe connu, forcer la suppression et recréation
              console.log('Forced admin account recreation attempt');
              
              // Notez: Cette fonctionnalité n'est pas idéale en production mais utile pour le développement
              errorMessage = 'Problème de connexion admin. Veuillez contacter le support ou réessayer.';
            } else {
              errorMessage = 'Cet email existe déjà mais le mot de passe est incorrect';
              console.error('SignIn after SignUp failed:', signInError.message);
            }
          } else if (signInData.session) {
            // Connexion réussie après échec d'inscription (compte existant)
            console.log('Connexion réussie après tentative d\'inscription');
            toast({
              title: 'Connexion réussie',
              description: isAdminUser ? 'Bienvenue, administrateur!' : 'Vous êtes maintenant connecté',
              variant: 'default',
            });
            navigate('/workspace/client-area');
            return; // Important: sortir de la fonction ici
          }
        } else if (errorMessage.includes('password') && errorMessage.includes('strong')) {
          errorMessage = 'Le mot de passe doit être plus sécurisé. Utilisez au moins 8 caractères avec des chiffres et des symboles.';
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
            description: isAdminUser ? 'Bienvenue, administrateur!' : 'Vous êtes maintenant connecté',
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

  return { signUp, signUpWithGoogle };
};
