import { getSession } from './session';
import { getSupabaseClient } from '@/lib/db/supabase';

export type AdminRole = 'admin' | 'manager' | 'support';

const ADMIN_ROLES: AdminRole[] = ['admin', 'manager', 'support'];

export interface AdminUser {
  id: number;
  role: AdminRole;
}

/**
 * Resolves the current session and verifies the user has an admin-tier role.
 * Returns the admin user record, or null if the caller is not authorised.
 *
 * Admin API routes are excluded from middleware, so handlers must enforce
 * this themselves.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const session = await getSession();
  if (!session?.user?.id) return null;

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('users')
    .select('id, role')
    .eq('id', session.user.id)
    .single();

  if (error || !data) return null;
  if (!ADMIN_ROLES.includes(data.role as AdminRole)) return null;

  return { id: data.id, role: data.role as AdminRole };
}

/**
 * Same as getAdminUser but for the retailer portal. Verifies the session
 * user has the 'retailer' role.
 */
export async function getRetailerUser(): Promise<{ id: number } | null> {
  const session = await getSession();
  if (!session?.user?.id) return null;

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('users')
    .select('id, role')
    .eq('id', session.user.id)
    .single();

  if (error || !data) return null;
  if (data.role !== 'retailer') return null;

  return { id: data.id };
}
