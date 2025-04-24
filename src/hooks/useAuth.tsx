
import { createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { AuthProvider } from './auth/AuthProvider';
import { AuthContext as InternalAuthContext } from './auth/AuthContext';

// Réexporter le contexte et le provider pour une utilisation simplifiée
export const AuthContext = InternalAuthContext;
export { AuthProvider };

// Hook personnalisé pour accéder au contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l'intérieur d\'un AuthProvider');
  }
  return context;
};
