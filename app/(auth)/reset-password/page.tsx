'use client';

import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Lock, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { resetPassword } from '../actions';
import { ActionState } from '@/lib/auth/middleware';

// Password strength checker
function getPasswordStrength(password: string): { score: number; text: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  if (score <= 2) return { score, text: 'Weak', color: 'red' };
  if (score === 3) return { score, text: 'Fair', color: 'yellow' };
  if (score === 4) return { score, text: 'Good', color: 'blue' };
  return { score, text: 'Strong', color: 'green' };
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    resetPassword,
    { error: '' }
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: '' });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
    }
  }, [token]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(getPasswordStrength(newPassword));
    if (confirmPassword) {
      setPasswordsMatch(newPassword === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
  };

  if (!tokenValid) {
    return (
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Invalid reset link
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              This link is invalid or has expired
            </h3>
            <p className="text-sm text-gray-600">
              Password reset links are only valid for 1 hour. Please request a new one.
            </p>
            <Link
              href="/forgot-password"
              className="inline-flex justify-center items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors"
            >
              Request new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Reset your password
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter your new password below
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="token" value={token || ''} />

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={100}
                value={password}
                onChange={handlePasswordChange}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-400"
                placeholder="Min. 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Password strength:</span>
                  <span className={`text-xs font-medium text-${passwordStrength.color}-600`}>
                    {passwordStrength.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full bg-${passwordStrength.color}-600 transition-all duration-300`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Must contain at least 8 characters, 1 uppercase, 1 number, and 1 special character
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={100}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-400"
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {confirmPassword && (
              <div className="mt-2 flex items-center">
                {passwordsMatch ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">Passwords match</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-600 mr-1" />
                    <span className="text-xs text-red-600">Passwords do not match</span>
                  </>
                )}
              </div>
            )}
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
                <div>
                  <p className="text-sm text-green-800">{state.success}</p>
                  <p className="text-xs text-green-700 mt-1">
                    Redirecting to sign in...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={pending || !passwordsMatch}
            className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {pending ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Resetting password...
              </>
            ) : (
              'Reset password'
            )}
          </button>
        </form>

        {/* Back to Sign In */}
        <div className="pt-4 border-t border-gray-200">
          <Link
            href="/login"
            className="flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
