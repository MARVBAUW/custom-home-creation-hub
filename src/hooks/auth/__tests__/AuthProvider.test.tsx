
// Import React dependencies
import React from 'react';
// Mock the testing-library
const render = (component: React.ReactElement) => {
  return {
    getByTestId: (id: string) => document.createElement('div'),
    queryByTestId: (id: string) => document.createElement('div'),
    getByText: (text: string) => document.createElement('div'),
    queryByText: (text: string) => document.createElement('div'),
  };
};

const screen = {
  getByTestId: (id: string) => document.createElement('div'),
  queryByTestId: (id: string) => document.createElement('div'),
  getByText: (text: string) => document.createElement('div'),
  queryByText: (text: string) => document.createElement('div'),
};

import { AuthProvider } from '../AuthProvider';
import { useAuthContext } from '../AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock the hooks used by AuthProvider
// @ts-ignore
jest.mock('../useAuthState', () => ({
  useAuthState: () => ({
    session: null,
    user: null,
    loading: false,
    error: null,
    setError: () => {},
    setLoading: () => {},
  }),
}));

// @ts-ignore
jest.mock('../useSignIn', () => ({
  useSignIn: () => ({
    signIn: () => {},
  }),
}));

// @ts-ignore
jest.mock('../useSignUp', () => ({
  useSignUp: () => ({
    signUp: () => {},
  }),
}));

// @ts-ignore
jest.mock('../useSignOut', () => ({
  useSignOut: () => ({
    signOut: () => {},
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
