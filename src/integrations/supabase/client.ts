
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://usakxozksekpuoukvksj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzYWt4b3prc2VrcHVvdWt2a3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NzgyMjgsImV4cCI6MjA2NzA1NDIyOH0.4u7sy1zbUkL7Vcj0Jbsi9TtxK9Vnp2FHRPRn9H4CzyQ';

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper pour le statut de connexion - utile pour le débogage
export const isConnected = async () => {
  try {
    const { data, error } = await supabase.from('test_connection').select('*').limit(1);
    return !error;
  } catch (err) {
    console.error('Erreur de connexion à Supabase:', err);
    return false;
  }
};
