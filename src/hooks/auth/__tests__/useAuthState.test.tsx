
import { renderHook, act } from '@testing-library/react';
import { useAuthState } from '../useAuthState';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase client
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  },
}));

describe('useAuthState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: null },
    });
    
    (supabase.auth.onAuthStateChange as jest.Mock).mockReturnValue({
      data: {
        subscription: {
          unsubscribe: jest.fn(),
        },
      },
    });
  });

  it('should initialize with loading state and no session', async () => {
    const { result } = renderHook(() => useAuthState());
    
    expect(result.current.loading).toBe(true);
    expect(result.current.session).toBe(null);
    expect(result.current.user).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('should update state when session is loaded', async () => {
    const mockSession = {
      user: { id: 'test-user-id', email: 'test@example.com' },
    };
    
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: mockSession },
    });
    
    const { result, rerender } = renderHook(() => useAuthState());
    
    // Wait for useEffect to complete
    await act(async () => {
      await Promise.resolve();
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.session).toBe(mockSession);
    expect(result.current.user).toBe(mockSession.user);
  });

  it('should handle auth state changes', async () => {
    let authChangeCallback: Function;
    
    (supabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
      authChangeCallback = callback;
      return {
        data: {
          subscription: {
            unsubscribe: jest.fn(),
          },
        },
      };
    });
    
    const { result } = renderHook(() => useAuthState());
    
    // Initial state
    expect(result.current.user).toBe(null);
    
    // Simulate auth state change
    await act(async () => {
      const mockSession = {
        user: { id: 'new-user-id', email: 'new@example.com' },
      };
      authChangeCallback('SIGNED_IN', mockSession);
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.user).toEqual({ id: 'new-user-id', email: 'new@example.com' });
  });
});
