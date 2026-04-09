import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    const result = await db.select({ id: users.id, email: users.email, role: users.role }).from(users).limit(5);
    return NextResponse.json({ ok: true, users: result });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ ok: false, error: error.message, stack: error.stack?.split('\n').slice(0, 5) });
  }
}
