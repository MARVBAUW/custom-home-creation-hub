
import { renderHook } from '@testing-library/react-hooks';
import { AuthContext, useAuthContext } from '../AuthContext';
import { ReactNode } from 'react';

// Mock data
const mockUser = { id: '123', email: 'test@example.com' };
const mockSession = { user: mockUser, access_token: 'token123' };

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
