/**
 * Google OAuth Configuration and Setup
 *
 * This file contains the setup for Google OAuth authentication.
 * To enable Google Sign-In, you need to:
 *
 * 1. Create a Google Cloud Project:
 *    - Go to https://console.cloud.google.com/
 *    - Create a new project or select an existing one
 *
 * 2. Enable Google+ API:
 *    - In the Google Cloud Console, go to "APIs & Services" > "Library"
 *    - Search for "Google+ API" and enable it
 *
 * 3. Create OAuth 2.0 Credentials:
 *    - Go to "APIs & Services" > "Credentials"
 *    - Click "Create Credentials" > "OAuth client ID"
 *    - Select "Web application"
 *    - Add authorized redirect URIs:
 *      - http://localhost:3000/api/auth/callback/google (for development)
 *      - https://your-domain.com/api/auth/callback/google (for production)
 *
 * 4. Add credentials to .env:
 *    GOOGLE_CLIENT_ID=your_client_id
 *    GOOGLE_CLIENT_SECRET=your_client_secret
 *
 * 5. Install NextAuth.js (if not already installed):
 *    npm install next-auth
 *
 * 6. Create /app/api/auth/[...nextauth]/route.ts with the configuration below
 */

// NextAuth.js Configuration Example
// Uncomment and modify when ready to implement

/*
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db } from '@/lib/db/drizzle';
import { users, profiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if user exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email!))
        .limit(1);

      if (existingUser.length === 0) {
        // Create new user
        const [newUser] = await db
          .insert(users)
          .values({
            email: user.email!,
            name: user.name || '',
            passwordHash: '', // OAuth users don't have passwords
            role: 'member',
          })
          .returning();

        // Create profile (age verification will be required later)
        await db.insert(profiles).values({
          userId: newUser.id,
          ageVerified: false, // Require age verification after OAuth signup
          marketingConsent: false,
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub) {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, session.user.email!))
          .limit(1);

        if (user.length > 0) {
          session.user.id = user[0].id;
          session.user.role = user[0].role;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
*/

/**
 * Google OAuth Sign In Button Component
 *
 * To use this component in your login/register pages:
 */

/*
'use client';

import { signIn } from 'next-auth/react';

export function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/account' })}
      className="w-full flex justify-center items-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors"
    >
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Sign in with Google
    </button>
  );
}
*/

export const GOOGLE_OAUTH_CONFIG = {
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
  scope: ['email', 'profile'],
};

export function getGoogleAuthUrl(redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: GOOGLE_OAUTH_CONFIG.scope.join(' '),
    access_type: 'offline',
    prompt: 'consent',
  });

  return `${GOOGLE_OAUTH_CONFIG.authUrl}?${params.toString()}`;
}
