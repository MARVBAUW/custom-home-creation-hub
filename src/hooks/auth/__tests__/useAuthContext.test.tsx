
import { renderHook } from '../__tests__/test-utils';
import { AuthContext, useAuthContext } from '../AuthContext';
import { ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';

// Mock data
const mockUser: User = {
  id: '123',
  email: 'test@example.com',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: '2024-01-01T00:00:00.000Z',
};

const mockSession: Session = {
  user: mockUser,
  access_token: 'token123',
  refresh_token: 'refresh123',
  expires_in: 3600,
  token_type: 'bearer',
};

// Create a wrapper with AuthContext
const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthContext.Provider
    value={{
      user: mockUser,
      session: mockSession,
      loading: false,
      error: null,
      signIn: async () => {},
      signUp: async () => {},
      signOut: async () => {},
      signInWithGoogle: async () => {},
      signUpWithGoogle: async () => {},
    }}
  >
    {children}
  </AuthContext.Provider>
);

describe('useAuthContext', () => {
  it('should return the auth context values', () => {
    const { result } = renderHook(() => useAuthContext(), { wrapper });
    
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.session).toEqual(mockSession);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.signIn).toBe('function');
    expect(typeof result.current.signUp).toBe('function');
    expect(typeof result.current.signOut).toBe('function');
  });
});
