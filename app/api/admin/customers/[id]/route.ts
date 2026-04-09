import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';

/**
 * GET /api/admin/customers/[id]
 * Fetches a single customer with detailed information (Supabase REST)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);
    const supabase = getSupabaseClient();

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*, profiles(*)')
      .eq('id', customerId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ success: false, error: 'Customer not found' }, { status: 404 });
    }

    const { data: userOrders } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', customerId)
      .order('created_at', { ascending: false });

    const orders = userOrders || [];
    const ordersCount = orders.length;
    const totalSpent = orders.reduce((sum: number, o: any) => sum + parseFloat(o.total ?? '0'), 0);
    const averageOrderValue = ordersCount > 0 ? totalSpent / ordersCount : 0;
    const lastOrderDate = orders[0]?.created_at ?? null;

    const profile = Array.isArray(user.profiles) ? user.profiles[0] : user.profiles;

    return NextResponse.json({
      success: true,
      customer: {
        id: user.id.toString(),
        name: user.name ?? 'Guest',
        email: user.email,
        phone: profile?.phone ?? null,
        dateOfBirth: profile?.date_of_birth ?? null,
        ageVerified: profile?.age_verified ?? false,
        marketingConsent: profile?.marketing_consent ?? false,
        joinedDate: user.created_at,
        isGuest: !user.name || user.role === 'guest',
        ordersCount,
        totalSpent,
        averageOrderValue,
        lastOrderDate,
        addresses: [],
        notes: [],
        orders: orders.map((o: any) => ({
          id: o.id,
          orderNumber: o.order_number,
          status: o.status,
          total: o.total,
          currency: o.currency,
          createdAt: o.created_at ?? null,
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch customer' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/customers/[id]
 * Soft delete a customer (mark as deleted)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);
    const supabase = getSupabaseClient();

    // Soft delete by setting deleted_at timestamp
    const { error } = await supabase
      .from('users')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', customerId);

    if (error) {
      console.error('Error deleting customer:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to delete customer',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Customer deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete customer',
      },
      { status: 500 }
    );
  }
}
