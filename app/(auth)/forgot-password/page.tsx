'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import Link from 'next/link';
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { requestPasswordReset } from '../actions';
import { ActionState } from '@/lib/auth/middleware';

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    requestPasswordReset,
    { error: '' }
  );
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Forgot your password?
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          No worries, we'll send you reset instructions
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        {!emailSent ? (
          <form action={formAction} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={255}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Enter the email associated with your account
              </p>
            </div>

            {/* Error Message */}
            {state?.error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-800">{state.error}</p>
              </div>
            )}

            {/* Success Message */}
            {state?.success && (
              <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <p className="text-sm text-green-800">{state.success}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={pending}
              className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Sending...
                </>
              ) : (
                'Send reset link'
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Check your email
            </h3>
            <p className="text-sm text-gray-600">
              We've sent a password reset link to your email address.
              Please check your inbox and follow the instructions.
            </p>
            <p className="text-xs text-gray-500">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={() => setEmailSent(false)}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                try again
              </button>
            </p>
          </div>
        )}

        {/* Back to Sign In */}
        <div className="pt-4 border-t border-gray-200">
          <Link
            href="/login"
            className="flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to sign in
          </Link>
        </div>
      </div>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Need help?{' '}
          <Link
            href="/contact"
            className="font-medium text-green-600 hover:text-green-700"
          >
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
