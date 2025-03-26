
import { AuthProvider } from './auth/AuthProvider';
import { useAuthContext } from './auth/AuthContext';

// Exporter le AuthProvider et le hook pour l'utilisation
export { AuthProvider };
export const useAuth = useAuthContext;
