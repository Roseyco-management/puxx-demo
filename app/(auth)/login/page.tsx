'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Star, Leaf } from 'lucide-react';
import { signIn } from '../actions';
import { ActionState } from '@/lib/auth/middleware';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    signIn,
    { error: '' }
  );
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[700px]">
        {/* Left Side - Branding & Image */}
        <div className="relative hidden lg:flex flex-col justify-center p-12 xl:p-16 gradient-emerald overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Logo/Brand */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <span className="text-3xl font-bold text-white">P</span>
                </div>
                <span className="text-3xl font-heading text-white">
                  PUXX Ireland
                </span>
              </div>
              <h2 className="text-4xl xl:text-5xl font-heading text-white leading-tight mb-4">
                Welcome Back to<br />Ireland's Premium<br />Nicotine Pouches
              </h2>
              <p className="text-xl text-white/90">
                Sign in to access exclusive flavors and special offers
              </p>
            </div>

            {/* Marketing Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8">
              <Image
                src="/images/marketing/puxx-why.png"
                alt="PUXX Premium Nicotine Pouches"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 1024px) 0vw, 50vw"
              />
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm mb-3">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm text-white/90 font-medium">100% Tobacco-Free</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm mb-3">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm text-white/90 font-medium">Premium Quality</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm mb-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm text-white/90 font-medium">Age Verified</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center p-8 sm:p-12 xl:p-16">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-emerald">
                <span className="text-2xl font-bold text-white">P</span>
              </div>
              <span className="text-2xl font-heading text-gray-900">
                PUXX Ireland
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-heading text-gray-900 mb-3">
              Welcome back
            </h1>
            <p className="text-lg text-gray-600">
              Sign in to your account to continue shopping
            </p>
          </div>

          {/* Form */}
          <form action={formAction} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={255}
                  className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 text-base"
                  placeholder="you@example.com"
                  defaultValue={state.email}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  minLength={8}
                  maxLength={100}
                  className="block w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 text-base"
                  placeholder="Enter your password"
                  defaultValue={state.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 cursor-pointer font-medium"
                >
                  Remember me
                </label>
              </div>

              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {state?.error && (
              <div className="rounded-xl bg-red-50 border-2 border-red-200 p-4">
                <p className="text-sm text-red-800 font-medium">{state.error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={pending}
              className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white gradient-emerald hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            disabled
            className="w-full flex justify-center items-center px-6 py-3.5 border-2 border-gray-200 rounded-xl shadow-sm text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
            <span className="ml-2 text-xs text-gray-400">(Coming soon)</span>
          </button>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-base text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
