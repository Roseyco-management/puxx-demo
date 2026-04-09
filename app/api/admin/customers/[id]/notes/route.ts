import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';

/**
 * POST /api/admin/customers/[id]/notes
 * Add a note to a customer
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);
    const supabase = getSupabaseClient();
    const body = await request.json();
    const { note, createdBy } = body;

    if (!note || !createdBy) {
      return NextResponse.json(
        { success: false, error: 'Note and createdBy are required' },
        { status: 400 }
      );
    }

    // Insert the note
    const { data: newNote, error } = await supabase
      .from('customer_notes')
      .insert({
        user_id: customerId,
        note,
        created_by: parseInt(createdBy),
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding customer note:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to add customer note',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      note: newNote,
    });
  } catch (error) {
    console.error('Error adding customer note:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add customer note',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/customers/[id]/notes
 * Get all notes for a customer
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);
    const supabase = getSupabaseClient();

    const { data: notes, error } = await supabase
      .from('customer_notes')
      .select(`
        id,
        note,
        created_at,
        updated_at,
        created_by,
        users (
          name,
          email
        )
      `)
      .eq('user_id', customerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching customer notes:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch customer notes',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      notes: (notes || []).map((note: any) => ({
        id: note.id,
        note: note.note,
        createdAt: note.created_at,
        updatedAt: note.updated_at,
        createdBy: {
          id: note.created_by,
          name: note.users?.name || null,
          email: note.users?.email || null,
        },
      })),
    });
  } catch (error) {
    console.error('Error fetching customer notes:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch customer notes',
      },
      { status: 500 }
    );
  }
}
