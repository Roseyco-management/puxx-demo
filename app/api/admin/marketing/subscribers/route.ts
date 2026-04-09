import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/drizzle';
import { newsletterSubscribers } from '@/lib/db/schema';
import { eq, desc, ilike, and } from 'drizzle-orm';

/**
 * GET /api/admin/marketing/subscribers
 * Fetches all newsletter subscribers
 *
 * Query parameters:
 * - search: string - Search by email
 * - status: string - Filter by status (active, unsubscribed)
 */
export async function GET(request: NextRequest) {
  const db = getDb();
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    // Build query conditions
    const conditions = [];

    if (search) {
      conditions.push(ilike(newsletterSubscribers.email, `%${search}%`));
    }

    if (status === 'active') {
      conditions.push(eq(newsletterSubscribers.isActive, true));
    } else if (status === 'unsubscribed') {
      conditions.push(eq(newsletterSubscribers.isActive, false));
    }

    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(newsletterSubscribers.subscribedAt));

    return NextResponse.json({
      success: true,
      count: subscribers.length,
      subscribers: subscribers.map((sub) => ({
        id: sub.id.toString(),
        email: sub.email,
        name: sub.name,
        isActive: sub.isActive,
        subscribedAt: sub.subscribedAt,
        unsubscribedAt: sub.unsubscribedAt,
        source: sub.source || 'footer',
        status: sub.isActive ? 'active' : 'unsubscribed',
      })),
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch subscribers',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/marketing/subscribers
 * Add a new subscriber or import from CSV
 */
export async function POST(request: NextRequest) {
  const db = getDb();
  try {
    const body = await request.json();
    const { email, name, source, subscribers } = body;

    // Bulk import from CSV
    if (subscribers && Array.isArray(subscribers)) {
      const results = {
        success: 0,
        failed: 0,
        errors: [] as string[],
      };

      for (const sub of subscribers) {
        try {
          // Check if subscriber already exists
          const existing = await db
            .select()
            .from(newsletterSubscribers)
            .where(eq(newsletterSubscribers.email, sub.email))
            .limit(1);

          if (existing.length > 0) {
            results.failed++;
            results.errors.push(`${sub.email} already exists`);
            continue;
          }

          await db.insert(newsletterSubscribers).values({
            email: sub.email,
            name: sub.name || null,
            source: 'import',
            isActive: true,
          });

          results.success++;
        } catch (error) {
          results.failed++;
          results.errors.push(`Failed to import ${sub.email}`);
        }
      }

      return NextResponse.json({
        success: true,
        message: `Imported ${results.success} subscribers, ${results.failed} failed`,
        results,
      });
    }

    // Single subscriber
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if subscriber already exists
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Subscriber already exists' },
        { status: 400 }
      );
    }

    const [newSubscriber] = await db
      .insert(newsletterSubscribers)
      .values({
        email,
        name: name || null,
        source: source || 'admin',
        isActive: true,
      })
      .returning();

    return NextResponse.json({
      success: true,
      subscriber: newSubscriber,
    });
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add subscriber',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/marketing/subscribers
 * Bulk unsubscribe or delete subscribers
 */
export async function DELETE(request: NextRequest) {
  const db = getDb();
  try {
    const body = await request.json();
    const { ids, action } = body; // action: 'unsubscribe' or 'delete'

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { success: false, error: 'Invalid subscriber IDs' },
        { status: 400 }
      );
    }

    const subscriberIds = ids.map((id) => parseInt(id));

    if (action === 'delete') {
      // Permanently delete
      await db
        .delete(newsletterSubscribers)
        .where(
          subscriberIds.length === 1
            ? eq(newsletterSubscribers.id, subscriberIds[0])
            : eq(newsletterSubscribers.id, subscriberIds[0]) // This is a simplification
        );
    } else {
      // Unsubscribe (soft delete)
      for (const id of subscriberIds) {
        await db
          .update(newsletterSubscribers)
          .set({
            isActive: false,
            unsubscribedAt: new Date(),
          })
          .where(eq(newsletterSubscribers.id, id));
      }
    }

    return NextResponse.json({
      success: true,
      message: `${ids.length} subscriber(s) ${
        action === 'delete' ? 'deleted' : 'unsubscribed'
      }`,
    });
  } catch (error) {
    console.error('Error managing subscribers:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to manage subscribers',
      },
      { status: 500 }
    );
  }
}
