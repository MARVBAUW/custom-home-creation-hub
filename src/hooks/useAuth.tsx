
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: any) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Important: Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change event:', event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session ? 'User logged in' : 'No session');
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting to sign in with:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('SignIn error:', error.message);
        let errorMessage = error.message;
        
        // Rendre les messages d'erreur plus conviviaux
        if (errorMessage === 'Invalid login credentials') {
          errorMessage = 'Email ou mot de passe incorrect';
        }
        
        setError(errorMessage);
        toast({
          title: 'Échec de connexion',
          description: errorMessage,
          variant: 'destructive',
        });
      } else if (data.session) {
        console.log('SignIn successful');
        toast({
          title: 'Connexion réussie',
          description: 'Vous êtes maintenant connecté',
          variant: 'default',
        });
        navigate('/workspace/client-area');
      }
    } catch (err) {
      console.error('Unexpected error during sign in:', err);
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

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting to sign up with:', email);
      // Modification pour supprimer la vérification d'e-mail
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata || {},
          // Suppression de la redirection par e-mail
          emailRedirectTo: undefined
        }
      });

      if (error) {
        console.error('SignUp error:', error.message);
        let errorMessage = error.message;
        
        // Rendre les messages d'erreur plus conviviaux
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
        
        // Si l'utilisateur est créé immédiatement (auto-confirm activé dans Supabase)
        if (data.session) {
          setSession(data.session);
          setUser(data.user);
          toast({
            title: 'Inscription réussie',
            description: 'Vous êtes maintenant connecté',
            variant: 'default',
          });
          navigate('/workspace/client-area');
        } else {
          // Si la vérification d'e-mail est toujours requise
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

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('SignOut error:', error.message);
        setError(error.message);
      } else {
        console.log('SignOut successful');
        navigate('/workspace');
      }
    } catch (err) {
      console.error('Unexpected error during sign out:', err);
      setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signIn,
        signUp,
        signOut,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
