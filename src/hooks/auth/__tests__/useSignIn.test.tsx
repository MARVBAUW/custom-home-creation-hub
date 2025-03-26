
import { renderHook, act } from '@testing-library/react';
import { useSignIn } from '../useSignIn';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Mock dependencies
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
  },
}));

jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('useSignIn', () => {
  const setLoading = jest.fn();
  const setError = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful sign in', async () => {
    // Mock successful sign in
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: {
        session: { user: { id: 'test-user-id' } },
      },
      error: null,
    });
    
    const { result } = renderHook(() => useSignIn(setLoading, setError));
    
    await act(async () => {
      await result.current.signIn('test@example.com', 'password');
    });
    
    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setLoading).toHaveBeenCalledWith(false);
    expect(setError).toHaveBeenCalledWith(null);
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Connexion réussie',
      variant: 'default',
    }));
  });

  it('should handle sign in error', async () => {
    // Mock sign in error
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: { session: null },
      error: { message: 'Invalid login credentials' },
    });
    
    const { result } = renderHook(() => useSignIn(setLoading, setError));
    
    await act(async () => {
      await result.current.signIn('test@example.com', 'wrong-password');
    });
    
    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setLoading).toHaveBeenCalledWith(false);
    expect(setError).toHaveBeenCalledWith(expect.stringContaining('Email ou mot de passe incorrect'));
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Échec de connexion',
      variant: 'destructive',
    }));
  });
});
