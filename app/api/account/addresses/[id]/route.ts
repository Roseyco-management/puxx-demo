import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';
import { getSupabaseClient } from '@/lib/db/supabase';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const addressId = parseInt(id);
    const supabase = getSupabaseClient();

    const { data: address, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('id', addressId)
      .eq('user_id', user.id)
      .single();

    if (error || !address) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    return NextResponse.json({ address });
  } catch (error) {
    console.error('Error fetching address:', error);
    return NextResponse.json(
      { error: 'Failed to fetch address' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const addressId = parseInt(id);
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

    // Verify address belongs to user
    const { data: existingAddress } = await supabase
      .from('addresses')
      .select('id')
      .eq('id', addressId)
      .eq('user_id', user.id)
      .single();

    if (!existingAddress) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    // If setting as default, unset other defaults
    if (isDefaultShipping) {
      await supabase
        .from('addresses')
        .update({ is_default_shipping: false })
        .eq('user_id', user.id)
        .eq('is_default_shipping', true);
    }

    if (isDefaultBilling) {
      await supabase
        .from('addresses')
        .update({ is_default_billing: false })
        .eq('user_id', user.id)
        .eq('is_default_billing', true);
    }

    // Update address
    const { data: updatedAddress, error: updateError } = await supabase
      .from('addresses')
      .update({
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
        updated_at: new Date().toISOString(),
      })
      .eq('id', addressId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError || !updatedAddress) {
      console.error('Error updating address:', updateError);
      return NextResponse.json(
        { error: 'Failed to update address' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Address updated successfully',
      address: updatedAddress,
    });
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json(
      { error: 'Failed to update address' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const addressId = parseInt(id);
    const supabase = getSupabaseClient();

    // Verify address belongs to user
    const { data: existingAddress } = await supabase
      .from('addresses')
      .select('id')
      .eq('id', addressId)
      .eq('user_id', user.id)
      .single();

    if (!existingAddress) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    // Delete address
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', addressId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting address:', error);
      return NextResponse.json(
        { error: 'Failed to delete address' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json(
      { error: 'Failed to delete address' },
      { status: 500 }
    );
  }
}
