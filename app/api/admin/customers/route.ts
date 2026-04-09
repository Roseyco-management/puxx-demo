import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db/drizzle';
import { users, orders, profiles } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const db = getDb();

    // Fetch all users with their profiles
    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        phone: profiles.phone,
      })
      .from(users)
      .leftJoin(profiles, eq(profiles.userId, users.id))
      .orderBy(desc(users.createdAt));

    // For each user, fetch their orders to compute stats
    const customersWithStats = await Promise.all(
      allUsers.map(async (user) => {
        const userOrders = await db
          .select({ id: orders.id, total: orders.total, createdAt: orders.createdAt })
          .from(orders)
          .where(eq(orders.userId, user.id));

        const ordersCount = userOrders.length;
        const totalSpent = userOrders.reduce(
          (sum, o) => sum + parseFloat(o.total ?? '0'),
          0
        );
        const lastOrderDate =
          userOrders.length > 0
            ? userOrders.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              )[0].createdAt
            : null;

        return {
          id: user.id.toString(),
          name: user.name || 'Guest',
          email: user.email,
          phone: user.phone || null,
          ordersCount,
          totalSpent,
          lastOrderDate,
          joinedDate: user.createdAt,
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
