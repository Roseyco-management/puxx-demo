import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch order with items and product details
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_id,
          product_name,
          product_sku,
          quantity,
          price,
          total,
          products (
            image_url
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Transform order items to include image URLs
    const transformedOrder = {
      ...order,
      items: (order.order_items || []).map((item: any) => ({
        ...item,
        imageUrl: item.products?.image_url,
      })),
      itemCount: order.order_items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0,
      customerName: order.shipping_name,
      customerEmail: order.shipping_email,
    };

    return NextResponse.json({ order: transformedOrder });
  } catch (error) {
    console.error('Error in order detail API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status, notes, trackingNumber } = body;

    // Prepare update data
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (status) {
      updateData.status = status;

      // If status is delivered, set completed_at
      if (status === 'delivered') {
        updateData.completed_at = new Date().toISOString();
      }
    }

    if (notes !== undefined) {
      updateData.notes = notes;
    }

    if (trackingNumber !== undefined) {
      // Note: You might want to add a tracking_number field to the orders table
      updateData.tracking_number = trackingNumber;
    }

    // Update the order
    const { data: order, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating order:', error);
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }

    // TODO: Send email notification on status change
    // This would integrate with your email service (e.g., Resend)

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error in order update API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
