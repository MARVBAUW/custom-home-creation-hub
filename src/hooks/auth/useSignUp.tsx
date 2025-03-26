
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Mode administrateur - ajoutez ici les emails qui doivent avoir un accès privilégié
// Synchronisez cette liste avec celle de useSignIn.tsx
const ADMIN_EMAILS = ['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'];

export const useSignUp = (setLoading: (loading: boolean) => void, setError: (error: string | null) => void) => {
  const navigate = useNavigate();

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting to sign up with:', email);
      console.log('Password length:', password.length);
      
      // Vérifier si c'est un email administrateur
      const isAdminUser = ADMIN_EMAILS.includes(email.toLowerCase());
      console.log('Is admin user:', isAdminUser);
      
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
            errorMessage = 'Cet email existe déjà mais le mot de passe est incorrect';
            console.error('SignIn after SignUp failed:', signInError.message);
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

  return { signUp };
};
