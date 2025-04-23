
import { renderHook } from '@testing-library/react-hooks';
import { AuthContext, useAuthContext } from '../AuthContext';
import { ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';

// Mock data with proper types
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

// Mock auth functions
const mockAuthFunctions = {
  signIn: jest.fn(),
  signUp: jest.fn(),
  signOut: jest.fn(),
  signInWithGoogle: jest.fn(),
  signUpWithGoogle: jest.fn(),
};

// Create a wrapper with AuthContext
const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthContext.Provider
    value={{
      user: mockUser,
      session: mockSession,
      loading: false,
      error: null,
      ...mockAuthFunctions
    }}
  >
    {children}
  </AuthContext.Provider>
);

describe('useAuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the auth context values', () => {
    const { result } = renderHook(() => useAuthContext(), { wrapper });
    
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.session).toEqual(mockSession);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should provide working auth functions', () => {
    const { result } = renderHook(() => useAuthContext(), { wrapper });
    
    expect(typeof result.current.signIn).toBe('function');
    expect(typeof result.current.signUp).toBe('function');
    expect(typeof result.current.signOut).toBe('function');
    expect(typeof result.current.signInWithGoogle).toBe('function');
    expect(typeof result.current.signUpWithGoogle).toBe('function');
  });

  it('should throw error when used outside AuthProvider', () => {
    // Suppress console.error to avoid noisy output during test
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      renderHook(() => useAuthContext());
    }).toThrow('useAuth must be used within an AuthProvider');
    
    consoleError.mockRestore();
  });
});
