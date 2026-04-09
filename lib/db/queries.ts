import { getSupabaseClient } from './supabase';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';

export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const supabase = getSupabaseClient();
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', sessionData.user.id)
    .is('deleted_at', null)
    .limit(1)
    .single();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function getTeamByStripeCustomerId(customerId: string) {
  const supabase = getSupabaseClient();
  const { data: result, error } = await supabase
    .from('teams')
    .select('*')
    .eq('stripe_customer_id', customerId)
    .limit(1)
    .single();

  if (error) {
    return null;
  }

  return result;
}

export async function updateTeamSubscription(
  teamId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  const supabase = getSupabaseClient();
  await supabase
    .from('teams')
    .update({
      stripe_subscription_id: subscriptionData.stripeSubscriptionId,
      stripe_product_id: subscriptionData.stripeProductId,
      plan_name: subscriptionData.planName,
      subscription_status: subscriptionData.subscriptionStatus,
      updated_at: new Date().toISOString()
    })
    .eq('id', teamId);
}

export async function getUserWithTeam(userId: number) {
  const supabase = getSupabaseClient();

  // Get user
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .limit(1)
    .single();

  if (userError || !user) {
    return null;
  }

  // Get team membership
  const { data: teamMember, error: teamError } = await supabase
    .from('team_members')
    .select('team_id')
    .eq('user_id', userId)
    .limit(1)
    .single();

  return {
    user,
    teamId: teamMember?.team_id || null
  };
}

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const supabase = getSupabaseClient();
  const { data: logs, error } = await supabase
    .from('activity_logs')
    .select(`
      id,
      action,
      timestamp,
      ip_address,
      users (
        name
      )
    `)
    .eq('user_id', user.id)
    .order('timestamp', { ascending: false })
    .limit(10);

  if (error) {
    throw new Error('Failed to fetch activity logs');
  }

  return logs?.map(log => {
    const userData = Array.isArray(log.users) ? log.users[0] : log.users;
    return {
      id: log.id,
      action: log.action,
      timestamp: log.timestamp,
      ipAddress: log.ip_address,
      userName: userData?.name || null
    };
  }) || [];
}

export async function getTeamForUser() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const supabase = getSupabaseClient();

  // Get team membership
  const { data: teamMember, error: teamMemberError } = await supabase
    .from('team_members')
    .select('team_id')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  if (teamMemberError || !teamMember) {
    return null;
  }

  // Get team with all members
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('*')
    .eq('id', teamMember.team_id)
    .single();

  if (teamError || !team) {
    return null;
  }

  // Get all team members with user info
  const { data: allMembers, error: membersError } = await supabase
    .from('team_members')
    .select(`
      *,
      users (
        id,
        name,
        email
      )
    `)
    .eq('team_id', teamMember.team_id);

  if (membersError) {
    return team;
  }

  return {
    ...team,
    teamMembers: allMembers
  };
}
