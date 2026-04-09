import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db/drizzle';
import { orders, orderItems } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const db = getDb();

    const rows = await db
      .select()
      .from(orders)
      .leftJoin(orderItems, eq(orderItems.orderId, orders.id))
      .orderBy(desc(orders.createdAt));

    // Group order items by order
    const ordersMap = new Map<number, any>();
    for (const row of rows) {
      const order = row.orders;
      if (!ordersMap.has(order.id)) {
        ordersMap.set(order.id, {
          ...order,
          order_items: [],
        });
      }
      if (row.order_items) {
        ordersMap.get(order.id).order_items.push(row.order_items);
      }
    }

    const result = Array.from(ordersMap.values()).map((order) => ({
      ...order,
      items: order.order_items,
      itemCount: order.order_items.reduce((sum: number, item: any) => sum + item.quantity, 0),
      customerName: order.shippingName,
      customerEmail: order.shippingEmail,
    }));

    return NextResponse.json({ orders: result, total: result.length });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
