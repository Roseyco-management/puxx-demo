import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';
import { getSupabaseClient } from '@/lib/db/supabase';

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseClient();
    const { data: userAddresses, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching addresses:', error);
      return NextResponse.json(
        { error: 'Failed to fetch addresses' },
        { status: 500 }
      );
    }

    return NextResponse.json({ addresses: userAddresses });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch addresses' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseClient();

    const body = await request.json();
    const {
      name,
      addressLine1,
      addressLine2,
      city,
      county,
      eircode,
      country,
      phone,
      isDefaultShipping,
      isDefaultBilling,
    } = body;

    // Validate required fields
    if (!name || !addressLine1 || !city) {
      return NextResponse.json(
        { error: 'Name, address line 1, and city are required' },
        { status: 400 }
      );
    }

    // If setting as default, unset other defaults
    if (isDefaultShipping) {
      await supabase
        .from('addresses')
        .update({ is_default_shipping: false })
        .eq('user_id', user.id);
    }

    if (isDefaultBilling) {
      await supabase
        .from('addresses')
        .update({ is_default_billing: false })
        .eq('user_id', user.id);
    }

    // Create new address
    const { data: newAddress, error: insertError } = await supabase
      .from('addresses')
      .insert({
        user_id: user.id,
        name,
        address_line1: addressLine1,
        address_line2: addressLine2 || null,
        city,
        county: county || null,
        eircode: eircode || null,
        country: country || 'IE',
        phone: phone || null,
        is_default_shipping: isDefaultShipping || false,
        is_default_billing: isDefaultBilling || false,
      })
      .select()
      .single();

    if (insertError || !newAddress) {
      console.error('Error creating address:', insertError);
      return NextResponse.json(
        { error: 'Failed to create address' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Address added successfully',
      address: newAddress,
    });
  } catch (error) {
    console.error('Error creating address:', error);
    return NextResponse.json(
      { error: 'Failed to create address' },
      { status: 500 }
    );
  }
}
