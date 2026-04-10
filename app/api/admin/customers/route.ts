import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';
import { getAdminUser } from '@/lib/auth/admin';

export async function GET() {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseClient();

    const { data: allUsers, error: usersError } = await supabase
      .from('users')
      .select('*, profiles(phone)')
      .order('created_at', { ascending: false });

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch customers' },
        { status: 500 }
      );
    }

    // For each user, fetch their orders to compute stats
    const customersWithStats = await Promise.all(
      (allUsers || []).map(async (user: any) => {
        const { data: userOrders } = await supabase
          .from('orders')
          .select('id, total, created_at')
          .eq('user_id', user.id);

        const orders = userOrders || [];
        const ordersCount = orders.length;
        const totalSpent = orders.reduce(
          (sum: number, o: any) => sum + parseFloat(o.total ?? '0'),
          0
        );
        const lastOrderDate =
          orders.length > 0
            ? orders.sort(
                (a: any, b: any) =>
                  new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
              )[0].created_at
            : null;

        const profile = Array.isArray(user.profiles) ? user.profiles[0] : user.profiles;

        return {
          id: user.id.toString(),
          name: user.name || 'Guest',
          email: user.email,
          phone: profile?.phone || null,
          ordersCount,
          totalSpent,
          lastOrderDate,
          joinedDate: user.created_at,
          isGuest: user.role === 'guest' || !user.name,
        };
      })
    );

    return NextResponse.json({
      success: true,
      count: customersWithStats.length,
      customers: customersWithStats,
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}
