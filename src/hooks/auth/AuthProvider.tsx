
import { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { useAuthState } from './useAuthState';
import { useSignIn } from './useSignIn';
import { useSignUp } from './useSignUp';
import { useSignOut } from './useSignOut';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { session, user, loading, error, setError, setLoading } = useAuthState();
  const { signIn } = useSignIn(setLoading, setError);
  const { signUp } = useSignUp(setLoading, setError);
  const { signOut } = useSignOut(setLoading, setError);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signIn,
        signUp,
        signOut,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
