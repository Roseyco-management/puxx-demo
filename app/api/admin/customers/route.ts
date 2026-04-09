import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';

/**
 * GET /api/admin/customers
 * Fetches all customers with aggregated order data
 *
 * Query parameters:
 * - search: string - Search by name or email
 * - isGuest: boolean - Filter by guest vs registered
 * - hasOrders: boolean - Filter by customers with/without orders
 * - dateFrom: string - Filter by joined date (ISO format)
 * - dateTo: string - Filter by joined date (ISO format)
 */
export async function GET(request: NextRequest) {
  const supabase = getSupabaseClient();
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const isGuest = searchParams.get('isGuest');
    const hasOrders = searchParams.get('hasOrders');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    // Build base query for users
    let usersQuery = supabase
      .from('users')
      .select(`
        id,
        name,
        email,
        role,
        created_at,
        profiles (
          phone
        )
      `);

    // Search filter
    if (search) {
      usersQuery = usersQuery.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    // Date range filters
    if (dateFrom) {
      usersQuery = usersQuery.gte('created_at', dateFrom);
    }
    if (dateTo) {
      usersQuery = usersQuery.lte('created_at', dateTo);
    }

    usersQuery = usersQuery.order('created_at', { ascending: false });

    const { data: users, error: usersError } = await usersQuery;

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch customers',
        },
        { status: 500 }
      );
    }

    // Get order statistics for each user
    const customersWithStats = await Promise.all(
      (users || []).map(async (user: any) => {
        // Get order count and total spent
        const { data: orders } = await supabase
          .from('orders')
          .select('id, total, created_at')
          .eq('user_id', user.id);

        const ordersCount = orders?.length || 0;
        const totalSpent = orders?.reduce((sum: number, order: any) => {
          return sum + parseFloat(order.total || '0');
        }, 0) || 0;

        const lastOrderDate = orders && orders.length > 0
          ? orders.sort((a: any, b: any) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )[0].created_at
          : null;

        return {
          id: user.id.toString(),
          name: user.name || 'Guest',
          email: user.email,
          phone: user.profiles?.phone || null,
          ordersCount,
          totalSpent,
          lastOrderDate,
          joinedDate: user.created_at,
          isGuest: !user.name || user.role === 'guest',
        };
      })
    );

    // Apply post-query filters
    let filteredCustomers = customersWithStats;

    if (hasOrders !== null) {
      const hasOrdersFilter = hasOrders === 'true';
      filteredCustomers = customersWithStats.filter((c) =>
        hasOrdersFilter ? c.ordersCount > 0 : c.ordersCount === 0
      );
    }

    if (isGuest !== null) {
      const isGuestFilter = isGuest === 'true';
      filteredCustomers = filteredCustomers.filter((c) =>
        c.isGuest === isGuestFilter
      );
    }

    return NextResponse.json({
      success: true,
      count: filteredCustomers.length,
      customers: filteredCustomers,
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch customers',
      },
      { status: 500 }
    );
  }
}
