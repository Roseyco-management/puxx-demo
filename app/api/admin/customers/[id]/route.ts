import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';

/**
 * GET /api/admin/customers/[id]
 * Fetches a single customer with detailed information
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);
    const supabase = getSupabaseClient();

    // Fetch customer with profile
    const { data: customer, error: customerError } = await supabase
      .from('users')
      .select(`
        id,
        name,
        email,
        role,
        created_at,
        profiles (
          phone,
          date_of_birth,
          age_verified,
          marketing_consent
        )
      `)
      .eq('id', customerId)
      .single();

    if (customerError || !customer) {
      return NextResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Fetch orders for statistics
    const { data: orders } = await supabase
      .from('orders')
      .select('id, total, created_at')
      .eq('user_id', customerId);

    const ordersCount = orders?.length || 0;
    const totalSpent = orders?.reduce((sum, order) => {
      return sum + parseFloat(order.total || '0');
    }, 0) || 0;

    const lastOrderDate = orders && orders.length > 0
      ? orders.sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0].created_at
      : null;

    const avgOrderValue = ordersCount > 0 ? totalSpent / ordersCount : 0;

    // Fetch customer addresses
    const { data: addresses } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', customerId)
      .order('is_default_shipping', { ascending: false });

    // Fetch customer notes
    const { data: notes } = await supabase
      .from('customer_notes')
      .select(`
        id,
        note,
        created_at,
        created_by,
        users (
          name,
          email
        )
      `)
      .eq('user_id', customerId)
      .order('created_at', { ascending: false });

    const profile = Array.isArray(customer.profiles) ? customer.profiles[0] : customer.profiles;

    return NextResponse.json({
      success: true,
      customer: {
        id: customer.id.toString(),
        name: customer.name || 'Guest',
        email: customer.email,
        phone: profile?.phone || null,
        dateOfBirth: profile?.date_of_birth || null,
        ageVerified: profile?.age_verified || false,
        marketingConsent: profile?.marketing_consent || false,
        joinedDate: customer.created_at,
        isGuest: !customer.name || customer.role === 'guest',
        ordersCount,
        totalSpent,
        averageOrderValue: avgOrderValue,
        lastOrderDate,
        addresses: addresses || [],
        notes: (notes || []).map((note: any) => ({
          id: note.id,
          note: note.note,
          createdAt: note.created_at,
          createdBy: {
            id: note.created_by,
            name: note.users?.name || null,
            email: note.users?.email || null,
          },
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch customer',
      },
      { status: 500 }
    );
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
