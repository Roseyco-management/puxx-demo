import { createClient } from '@supabase/supabase-js';

/**
 * Get a Supabase client for server-side operations
 * Uses environment variables for connection
 */
export function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
