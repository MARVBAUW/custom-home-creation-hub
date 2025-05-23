
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useHcaptcha = () => {
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyToken = useCallback(async (token: string) => {
    setIsVerifying(true);
    setError(null);

    try {
      console.log('Verification du token hCaptcha:', token.substring(0, 10) + '...');
      
      const { data, error: verificationError } = await supabase.functions.invoke('verify-hcaptcha', {
        body: { token }
      });

      console.log('Réponse de verify-hcaptcha:', data, verificationError);

      if (verificationError) {
        console.error('Erreur de vérification:', verificationError);
        throw verificationError;
      }

      if (data?.success) {
        setHcaptchaToken(token);
        return true;
      } else {
        setError('Échec de la vérification captcha');
        return false;
      }
    } catch (err) {
      console.error('hCaptcha verification error:', err);
      setError('Erreur lors de la vérification du captcha');
      return false;
    } finally {
      setIsVerifying(false);
    }
  }, []);

  return {
    hcaptchaToken,
    isVerifying,
    error,
    verifyToken
  };
};
