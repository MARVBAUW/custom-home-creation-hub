
import { useState, useEffect } from 'react';
import { fetchGoogleBusinessData } from '@/utils/googleBusiness';

export const useBusinessData = () => {
  const [businessData, setBusinessData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBusinessData = async () => {
      try {
        setLoading(true);
        const data = await fetchGoogleBusinessData();
        setBusinessData(data);
      } catch (err) {
        setError('Unable to load Google Business data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBusinessData();
  }, []);

  return { businessData, loading, error };
};
