import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';
import { getAdminUser } from '@/lib/auth/admin';

/**
 * GET /api/admin/marketing/subscribers
 * Fetches all newsletter subscribers
 */
export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseClient();

    const { data: subscribers, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    // If table doesn't exist, return empty array gracefully
    if (error) {
      console.warn('newsletter_subscribers table unavailable:', error.message);
      return NextResponse.json({
        success: true,
        count: 0,
        subscribers: [],
      });
    }

    return NextResponse.json({
      success: true,
      count: (subscribers || []).length,
      subscribers: (subscribers || []).map((sub: any) => ({
        id: sub.id.toString(),
        email: sub.email,
        name: sub.name,
        isActive: sub.is_active,
        subscribedAt: sub.subscribed_at,
        unsubscribedAt: sub.unsubscribed_at,
        source: sub.source || 'footer',
        status: sub.is_active ? 'active' : 'unsubscribed',
      })),
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/marketing/subscribers
 * Add a new subscriber or import from CSV
 */
export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseClient();
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
          const { data: existing } = await supabase
            .from('newsletter_subscribers')
            .select('id')
            .eq('email', sub.email)
            .limit(1);

          if (existing && existing.length > 0) {
            results.failed++;
            results.errors.push(`${sub.email} already exists`);
            continue;
          }

          const { error } = await supabase.from('newsletter_subscribers').insert({
            email: sub.email,
            name: sub.name || null,
            source: 'import',
            is_active: true,
          });

          if (error) {
            results.failed++;
            results.errors.push(`Failed to import ${sub.email}`);
          } else {
            results.success++;
          }
        } catch {
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

    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Subscriber already exists' },
        { status: 400 }
      );
    }

    const { data: newSubscriber, error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        name: name || null,
        source: source || 'admin',
        is_active: true,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { success: false, error: 'Failed to add subscriber' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      subscriber: newSubscriber,
    });
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add subscriber' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/marketing/subscribers
 * Bulk unsubscribe or delete subscribers
 */
export async function DELETE(request: NextRequest) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseClient();
    const body = await request.json();
    const { ids, action } = body; // action: 'unsubscribe' or 'delete'

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { success: false, error: 'Invalid subscriber IDs' },
        { status: 400 }
      );
    }

    if (action === 'delete') {
      for (const id of ids) {
        await supabase
          .from('newsletter_subscribers')
          .delete()
          .eq('id', id);
      }
    } else {
      for (const id of ids) {
        await supabase
          .from('newsletter_subscribers')
          .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
          .eq('id', id);
      }
    }

    return NextResponse.json({
      success: true,
      message: `${ids.length} subscriber(s) ${action === 'delete' ? 'deleted' : 'unsubscribed'}`,
    });
  } catch (error) {
    console.error('Error managing subscribers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to manage subscribers' },
      { status: 500 }
    );
  }
}
