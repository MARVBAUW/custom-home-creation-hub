
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
      console.log('Using password:', password.substring(0, 3) + '...' + password.substring(password.length - 3)); // Log partial password for debugging
      
      // Vérifier si c'est un email administrateur
      const isAdminUser = ADMIN_EMAILS.includes(email.toLowerCase());
      console.log('Is admin user:', isAdminUser, 'Email verified status check not needed anymore');
      
      // Tentative de connexion standard
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
          
          // Si c'est un administrateur, vérifier si l'utilisateur existe
          if (isAdminUser) {
            // Vérifier si l'utilisateur existe mais que le mot de passe est incorrect
            console.log('Checking if admin user exists...');
            
            // Note: On ne peut pas vérifier directement si un utilisateur existe via l'API publique
            // Pour l'interface utilisateur, on donne simplement un message plus précis
            errorMessage = 'Compte administrateur: Le mot de passe "Baullanowens1112." est peut-être incorrect. Vérifiez vos identifiants ou contactez le support.';
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
        console.log('Is email confirmed:', data.session.user.email_confirmed_at !== null);
        
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

  return { signIn };
};
