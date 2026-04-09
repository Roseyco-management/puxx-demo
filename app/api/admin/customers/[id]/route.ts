import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/drizzle';
import { users, profiles, orders } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getSupabaseClient } from '@/lib/db/supabase';

/**
 * GET /api/admin/customers/[id]
 * Fetches a single customer with detailed information (Drizzle)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);
    const db = getDb();

    const [user] = await db.select().from(users).where(eq(users.id, customerId));
    if (!user) {
      return NextResponse.json({ success: false, error: 'Customer not found' }, { status: 404 });
    }

    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, customerId));

    const userOrders = await db.select().from(orders)
      .where(eq(orders.userId, customerId))
      .orderBy(desc(orders.createdAt));

    const ordersCount = userOrders.length;
    const totalSpent = userOrders.reduce((sum, o) => sum + parseFloat(o.total ?? '0'), 0);
    const averageOrderValue = ordersCount > 0 ? totalSpent / ordersCount : 0;
    const lastOrderDate = userOrders[0]?.createdAt?.toISOString() ?? null;

    return NextResponse.json({
      success: true,
      customer: {
        id: user.id.toString(),
        name: user.name ?? 'Guest',
        email: user.email,
        phone: profile?.phone ?? null,
        dateOfBirth: profile?.dateOfBirth?.toISOString() ?? null,
        ageVerified: profile?.ageVerified ?? false,
        marketingConsent: profile?.marketingConsent ?? false,
        joinedDate: user.createdAt.toISOString(),
        isGuest: !user.name || user.role === 'guest',
        ordersCount,
        totalSpent,
        averageOrderValue,
        lastOrderDate,
        addresses: [],
        notes: [],
        orders: userOrders.map(o => ({
          id: o.id,
          orderNumber: o.orderNumber,
          status: o.status,
          total: o.total,
          currency: o.currency,
          createdAt: o.createdAt?.toISOString() ?? null,
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
