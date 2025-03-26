
import React, { ReactNode } from 'react';
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

import { AuthContext, useAuthContext, AuthContextProps } from '../AuthContext';

// Mock AuthContext values
const mockAuthContext: AuthContextProps = {
  session: null,
  user: null,
  loading: false,
  error: null,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
};

// Test component that uses the hook
const TestComponent = () => {
  const auth = useAuthContext();
  return (
    <div>
      <div data-testid="loading">{String(auth.loading)}</div>
      <div data-testid="user">{auth.user ? 'User exists' : 'No user'}</div>
    </div>
  );
};

// Wrapper with context provider
const Wrapper = ({ children }: { children: ReactNode }) => (
  <AuthContext.Provider value={mockAuthContext}>
    {children}
  </AuthContext.Provider>
);

describe('useAuthContext', () => {
  it('should throw an error when used outside AuthProvider', () => {
    // Spy on console.error to prevent the error from being logged
    const originalError = console.error;
    console.error = () => {};
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuthContext must be used within an AuthProvider');
    
    // Restore console.error
    console.error = originalError;
  });

  it('should provide auth context values when used within AuthProvider', () => {
    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    );
    
    expect(screen.getByTestId('loading').textContent).toBe('false');
    expect(screen.getByTestId('user').textContent).toBe('No user');
  });
});
