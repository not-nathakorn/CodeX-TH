import { createClient } from '@supabase/supabase-js';

// Configuration Layer (equivalent to config/database.ts)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Database Connection (Singleton)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Re-export types from new location for backward compatibility
// (Optimally, other files should import from @/types directly)
export * from '@/types/database.types';
