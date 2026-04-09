import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters for filtering (same as main orders route)
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');
    const search = searchParams.get('search');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build query
    let query = supabase
      .from('orders')
      .select(`
        id,
        order_number,
        created_at,
        shipping_name,
        shipping_email,
        shipping_phone,
        shipping_address,
        shipping_city,
        shipping_postcode,
        shipping_country,
        status,
        payment_status,
        payment_method,
        subtotal,
        shipping_cost,
        tax,
        discount,
        total,
        order_items (
          quantity
        )
      `)
      .order('created_at', { ascending: false });

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (paymentStatus && paymentStatus !== 'all') {
      query = query.eq('payment_status', paymentStatus);
    }

    if (search) {
      query = query.or(
        `order_number.ilike.%${search}%,shipping_name.ilike.%${search}%,shipping_email.ilike.%${search}%`
      );
    }

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error('Error fetching orders for export:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    // Format date helper
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-IE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    };

    // Create CSV content
    const headers = [
      'Order Number',
      'Date',
      'Customer Name',
      'Email',
      'Phone',
      'Address',
      'City',
      'Postcode',
      'Country',
      'Items',
      'Subtotal',
      'Shipping',
      'Tax',
      'Discount',
      'Total',
      'Payment Method',
      'Payment Status',
      'Order Status',
    ];

    const csvRows = [headers];

    (orders || []).forEach((order: any) => {
      const itemCount = order.order_items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

      csvRows.push([
        order.order_number,
        formatDate(order.created_at),
        order.shipping_name,
        order.shipping_email,
        order.shipping_phone || '',
        order.shipping_address,
        order.shipping_city,
        order.shipping_postcode,
        order.shipping_country,
        itemCount.toString(),
        `€${parseFloat(order.subtotal).toFixed(2)}`,
        `€${parseFloat(order.shipping_cost).toFixed(2)}`,
        `€${parseFloat(order.tax).toFixed(2)}`,
        `€${parseFloat(order.discount).toFixed(2)}`,
        `€${parseFloat(order.total).toFixed(2)}`,
        order.payment_method || '',
        order.payment_status,
        order.status,
      ]);
    });

    // Convert to CSV string
    const csvContent = csvRows
      .map((row) =>
        row
          .map((cell) => {
            // Escape quotes and wrap in quotes if contains comma
            const escaped = String(cell).replace(/"/g, '""');
            return escaped.includes(',') ? `"${escaped}"` : escaped;
          })
          .join(',')
      )
      .join('\n');

    // Generate filename with current date
    const today = new Date().toISOString().split('T')[0];
    const filename = `puxx-orders-${today}.csv`;

    // Return CSV file
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error in orders export API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
