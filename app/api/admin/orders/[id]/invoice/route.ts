import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getInvoiceBlob } from '@/lib/utils/invoice-generator';
import { OrderWithItems } from '@/lib/types/orders';

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

    // Fetch order with items
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
          total
        )
      `)
      .eq('id', id)
      .single();

    if (error || !order) {
      console.error('Error fetching order:', error);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Transform order data
    const transformedOrder: OrderWithItems = {
      ...order,
      items: order.order_items || [],
      itemCount: order.order_items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0,
      customerName: order.shipping_name,
      customerEmail: order.shipping_email,
    };

    // Generate PDF
    const pdfBlob = getInvoiceBlob(transformedOrder);

    // Convert blob to buffer for NextResponse
    const arrayBuffer = await pdfBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Return PDF
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="PUXX-Invoice-${order.order_number}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    return NextResponse.json({ error: 'Failed to generate invoice' }, { status: 500 });
  }
}
