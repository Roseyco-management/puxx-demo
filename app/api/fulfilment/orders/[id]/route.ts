import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/drizzle';
import { orders } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    await db.update(orders)
      .set({ status: 'shipped', updatedAt: new Date() })
      .where(eq(orders.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking order shipped:', error);
    return NextResponse.json({ success: false, error: 'Failed to update order' }, { status: 500 });
  }
}
