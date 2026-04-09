'use server';

import { z } from 'zod';
import { getSupabaseClient } from '@/lib/db/supabase';
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { validatedAction } from '@/lib/auth/middleware';

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

// Password validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/;

// Sign In Schema
const signInSchema = z.object({
  email: z.string().email('Invalid email address').min(3).max(255),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  const supabase = getSupabaseClient();

  // Find user by email
  const { data: userResult, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .limit(1)
    .single();

  if (userError || !userResult) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password: ''
    };
  }

  const foundUser = userResult;

  // Verify password
  const isPasswordValid = await comparePasswords(password, foundUser.password_hash);

  if (!isPasswordValid) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password: ''
    };
  }

  // Check if user is deleted
  if (foundUser.deleted_at) {
    return {
      error: 'This account has been deactivated. Please contact support.',
      email,
      password: ''
    };
  }

  // Set session
  await setSession(foundUser);

  // Redirect based on user role
  if (foundUser.role === 'admin' || foundUser.role === 'manager' || foundUser.role === 'support') {
    redirect('/admin');
  } else {
    redirect('/account');
  }
});

// Sign Up Schema
const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address').max(255),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100)
    .regex(
      passwordRegex,
      'Password must contain at least 1 uppercase letter, 1 number, and 1 special character'
    ),
  confirmPassword: z.string(),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  referralSource: z.string().optional(),
  ageVerified: z.string().optional(),
  marketingConsent: z.string().optional(),
  termsAccepted: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    referralSource,
    ageVerified,
    marketingConsent,
    termsAccepted,
  } = data;

  const supabase = getSupabaseClient();

  // Check if terms are accepted
  if (termsAccepted !== 'on') {
    return {
      error: 'You must accept the Terms & Conditions to create an account.',
    };
  }

  // Check if age is verified
  if (ageVerified !== 'on') {
    return {
      error: 'You must confirm you are 18 years or older.',
    };
  }

  // Validate age
  const dob = new Date(dateOfBirth);
  const age = calculateAge(dob);

  if (age < 18) {
    return {
      error: 'You must be at least 18 years old to create an account.',
    };
  }

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .limit(1)
    .single();

  if (existingUser) {
    return {
      error: 'An account with this email already exists. Please sign in instead.',
    };
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
      role: 'member', // Default role for e-commerce users
    })
    .select()
    .single();

  if (userError || !createdUser) {
    console.error('Error creating user:', userError);
    return {
      error: 'Failed to create user. Please try again.',
    };
  }

  // Create profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      user_id: createdUser.id,
      date_of_birth: dob.toISOString(),
      age_verified: true, // Already verified above
      referral_source: referralSource || null,
      marketing_consent: marketingConsent === 'on',
    });

  if (profileError) {
    console.error('Error creating profile:', profileError);
  }

  // Return success message (don't auto-login, send to login page)
  return {
    success: 'Account created successfully! Please sign in to continue.',
  };
});

// Request Password Reset Schema
const requestPasswordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const requestPasswordReset = validatedAction(
  requestPasswordResetSchema,
  async (data) => {
    const { email } = data;

    const supabase = getSupabaseClient();

    // Check if user exists
    const { data: userResult } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .limit(1)
      .single();

    // Always return success message to prevent email enumeration
    // In production, you would send an email here with a reset token
    // For now, we'll just return a success message

    if (userResult) {
      // TODO: Generate reset token and send email
      // const resetToken = await generateResetToken(userResult.id);
      // await sendPasswordResetEmail(email, resetToken);
      console.log('Password reset requested for:', email);
    }

    return {
      success: 'If an account exists with this email, you will receive password reset instructions shortly.',
    };
  }
);

// Reset Password Schema
const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100)
    .regex(
      passwordRegex,
      'Password must contain at least 1 uppercase letter, 1 number, and 1 special character'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const resetPassword = validatedAction(
  resetPasswordSchema,
  async (data) => {
    const { token, password } = data;

    // TODO: Implement token validation
    // In production, you would:
    // 1. Verify the token hasn't expired
    // 2. Find the user associated with the token
    // 3. Update their password
    // 4. Invalidate the token

    // For now, we'll just return an error
    return {
      error: 'Password reset functionality is currently being set up. Please contact support.',
    };

    // When implemented:
    // const newPasswordHash = await hashPassword(password);
    // await db.update(users).set({ passwordHash: newPasswordHash }).where(eq(users.id, userId));
    // return { success: 'Password reset successfully! Redirecting to sign in...' };
  }
);

// Sign Out
export async function signOut() {
  (await cookies()).delete('session');
  redirect('/login');
}
