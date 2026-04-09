import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/db/supabase';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('orders')
      .update({ status: 'shipped', updated_at: new Date().toISOString() })
      .eq('id', parseInt(id));
    if (error) {
      console.error('Error marking order shipped:', error);
      return NextResponse.json({ success: false, error: 'Failed to update order' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking order shipped:', error);
    return NextResponse.json({ success: false, error: 'Failed to update order' }, { status: 500 });
  }
}
