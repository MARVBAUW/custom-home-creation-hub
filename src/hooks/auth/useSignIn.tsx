import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Mode administrateur - ajoutez ici les emails qui doivent avoir un accès privilégié
const ADMIN_EMAILS = ['marvinbauwens@gmail.com', 'progineer.moe@gmail.com'];

export const useSignIn = (setLoading: (loading: boolean) => void, setError: (error: string | null) => void) => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/workspace/client-area`
        }
      });

      if (error) {
        console.error('Google Sign-In Error:', error);
        toast({
          title: 'Erreur de connexion',
          description: 'Impossible de se connecter avec Google',
          variant: 'destructive'
        });
        throw error;
      }

      console.log('Google Sign-In Data:', data);
    } catch (err) {
      console.error('Unexpected Google Sign-In Error:', err);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la connexion',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting to sign in with:', email);
      
      // Vérifier si c'est un email administrateur
      const isAdminUser = ADMIN_EMAILS.includes(email.toLowerCase());
      console.log('Is admin user:', isAdminUser);
      
      // Spécial pour l'administrateur connu
      if (isAdminUser && password === 'Baullanowens1112.') {
        console.log('Admin with known password, checking if account exists first');
        
        // Tentative de connexion d'abord
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) {
          console.log('Admin login failed, will attempt to create account:', signInError.message);
          
          // Tentative de création du compte administrateur s'il n'existe pas
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: 'Administrateur',
                is_admin: true
              },
              emailRedirectTo: undefined,
            }
          });
          
          if (signUpError) {
            console.error('Admin account creation failed:', signUpError);
            setError(`Échec de création du compte administrateur: ${signUpError.message}`);
            toast({
              title: 'Erreur',
              description: `Échec de création du compte administrateur: ${signUpError.message}`,
              variant: 'destructive',
            });
          } else if (signUpData.session) {
            console.log('Admin account created and signed in successfully');
            toast({
              title: 'Compte administrateur créé',
              description: 'Bienvenue, administrateur!',
              variant: 'default',
            });
            navigate('/workspace/client-area');
            return; // Important: sortir de la fonction ici
          } else {
            console.log('Admin account created but verification might be required');
            toast({
              title: 'Compte administrateur créé',
              description: 'Vérifiez votre email pour confirmer votre compte administrateur',
              variant: 'default',
            });
            return; // Important: sortir de la fonction ici
          }
        } else if (signInData.session) {
          // L'administrateur existe et les identifiants sont corrects
          console.log('Admin login successful');
          toast({
            title: 'Connexion administrateur réussie',
            description: 'Bienvenue, administrateur!',
            variant: 'default',
          });
          navigate('/workspace/client-area');
          return; // Important: sortir de la fonction ici
        }
      }
      
      // Tentative de connexion standard pour tous les utilisateurs
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Vérification détaillée des erreurs
      if (error) {
        console.error('SignIn error details:', {
          message: error.message,
          code: error.code,
          status: error.status,
          fullError: JSON.stringify(error)
        });
        
        let errorMessage = error.message;
        
        // Messages d'erreur plus détaillés pour aider au diagnostic
        if (errorMessage === 'Invalid login credentials') {
          console.log('Invalid credentials error details:', { email });
          
          if (isAdminUser) {
            errorMessage = 'Le compte administrateur existe peut-être mais le mot de passe est incorrect. Essayez avec "Baullanowens1112."';
          } else {
            errorMessage = 'Email ou mot de passe incorrect. Vérifiez vos identifiants.';
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
        console.log('User metadata:', data.session.user.user_metadata);
        
        const isAdminInSession = ADMIN_EMAILS.includes((data.session.user.email || '').toLowerCase());
        console.log('Is admin user (confirmed in session):', isAdminInSession);
        
        toast({
          title: 'Connexion réussie',
          description: isAdminInSession ? 'Bienvenue, administrateur!' : 'Vous êtes maintenant connecté',
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

  return { signIn, signInWithGoogle };
};
