
import { AuthProvider } from './auth/AuthProvider';
import { useAuthContext } from './auth/AuthContext';

export { AuthProvider };
export const useAuth = () => {
  const context = useAuthContext();
  
  return {
    ...context,
    signInWithGoogle: context.signInWithGoogle || (async () => {
      console.error('Google Sign-In method not implemented');
    }),
    signUpWithGoogle: context.signUpWithGoogle || (async () => {
      console.error('Google Sign-Up method not implemented');
    })
  };
};
