import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { hashPassword } from '@/lib/auth/session';

// Helper function to calculate age
function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }
  return age;
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/;

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address').max(255),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100)
    .regex(
      passwordRegex,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  referralSource: z.string().optional(),
  marketingConsent: z.boolean().default(false),
  ageVerified: z.boolean(),
  termsAccepted: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const body = await request.json();

    // Validate input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      referralSource,
      marketingConsent,
      ageVerified,
      termsAccepted,
    } = result.data;

    // Check terms acceptance
    if (!termsAccepted) {
      return NextResponse.json(
        { error: 'You must accept the Terms & Conditions' },
        { status: 400 }
      );
    }

    // Check age verification checkbox
    if (!ageVerified) {
      return NextResponse.json(
        { error: 'You must confirm you are 18 years or older' },
        { status: 400 }
      );
    }

    // Validate actual age
    const dob = new Date(dateOfBirth);
    const age = calculateAge(dob);

    if (age < 18) {
      return NextResponse.json(
        { error: 'You must be at least 18 years old to register' },
        { status: 400 }
      );
    }

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const fullName = `${firstName} ${lastName}`;
    const { data: createdUser, error: userError } = await supabase
      .from('users')
      .insert({
        name: fullName,
        email,
        password_hash: passwordHash,
        role: 'member',
      })
      .select()
      .single();

    if (userError || !createdUser) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        user_id: createdUser.id,
        date_of_birth: dob.toISOString(),
        age_verified: true,
        referral_source: referralSource || null,
        marketing_consent: marketingConsent,
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
