
import { render, screen } from '@testing-library/react';
import { AuthContext, useAuthContext, AuthContextProps } from '../AuthContext';
import { ReactNode } from 'react';

// Mock AuthContext values
const mockAuthContext: AuthContextProps = {
  session: null,
  user: null,
  loading: false,
  error: null,
  signIn: jest.fn(),
  signUp: jest.fn(),
  signOut: jest.fn(),
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
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuthContext must be used within an AuthProvider');
    
    // Restore console.error
    jest.restoreAllMocks();
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
