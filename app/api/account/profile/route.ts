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

    // Get user profile
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .limit(1)
      .single();

    return NextResponse.json({
      user,
      profile: userProfile || null,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseClient();
    const body = await request.json();
    const { firstName, lastName, phone, marketingConsent } = body;

    // Update user name
    const fullName = `${firstName} ${lastName}`.trim();
    await supabase
      .from('users')
      .update({
        name: fullName,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .limit(1)
      .single();

    if (existingProfile) {
      // Update existing profile
      await supabase
        .from('profiles')
        .update({
          phone: phone || null,
          marketing_consent: marketingConsent || false,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
    } else {
      // Create new profile
      await supabase.from('profiles').insert({
        user_id: user.id,
        phone: phone || null,
        marketing_consent: marketingConsent || false,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
