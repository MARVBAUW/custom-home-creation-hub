
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../AuthProvider';
import { useAuthContext } from '../AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock the hooks used by AuthProvider
jest.mock('../useAuthState', () => ({
  useAuthState: () => ({
    session: null,
    user: null,
    loading: false,
    error: null,
    setError: jest.fn(),
    setLoading: jest.fn(),
  }),
}));

jest.mock('../useSignIn', () => ({
  useSignIn: () => ({
    signIn: jest.fn(),
  }),
}));

jest.mock('../useSignUp', () => ({
  useSignUp: () => ({
    signUp: jest.fn(),
  }),
}));

jest.mock('../useSignOut', () => ({
  useSignOut: () => ({
    signOut: jest.fn(),
  }),
}));

// Test component that uses auth context
const TestComponent = () => {
  const auth = useAuthContext();
  return (
    <div>
      <div data-testid="auth-loading">{String(auth.loading)}</div>
      <div data-testid="auth-user">{auth.user ? 'Logged in' : 'Not logged in'}</div>
    </div>
  );
};

describe('AuthProvider', () => {
  it('should provide auth context to children', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('auth-loading').textContent).toBe('false');
    expect(screen.getByTestId('auth-user').textContent).toBe('Not logged in');
  });
});
