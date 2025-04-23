
import { supabase } from '@/integrations/supabase/client';

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('is_active')
      .eq('key_value', apiKey)
      .single();

    if (error) {
      console.error('Error validating API key:', error);
      return false;
    }

    return data?.is_active ?? false;
  } catch (error) {
    console.error('Error validating API key:', error);
    return false;
  }
};
