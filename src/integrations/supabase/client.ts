
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://usakxozksekpuoukvksj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzYWt4b3prc2VrcHVvdWt2a3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5OTg1NzMsImV4cCI6MjA1ODU3NDU3M30._xLyeOIPUQw_R4YaQI2LjYY2IdgzQ7mwXg39Kyi4HBU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
