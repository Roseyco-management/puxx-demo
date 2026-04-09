export const dynamic = 'force-dynamic';

import { getDb } from '@/lib/db/drizzle';
import { orders } from '@/lib/db/schema';
import { inArray, asc } from 'drizzle-orm';
import FulfilmentQueue from '@/components/fulfilment/FulfilmentQueue';

export const dynamic = 'force-dynamic';

export default async function FulfilmentPage() {
  const db = getDb();
  const pendingOrders = await db
    .select()
    .from(orders)
    .where(inArray(orders.status, ['pending', 'processing']))
    .orderBy(asc(orders.createdAt));

  return <FulfilmentQueue initialOrders={pendingOrders} />;
}
