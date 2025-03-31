
import { createClient } from '@supabase/supabase-js';

// For local development/testing, use mock values
const supabaseUrl = 'https://example.supabase.co';
const supabaseKey = 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
