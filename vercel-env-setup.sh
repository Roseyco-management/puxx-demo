#!/bin/bash
# Script to set up Vercel environment variables
# Run this with: bash vercel-env-setup.sh

echo "Setting up Vercel environment variables..."

# Supabase Configuration (REQUIRED)
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production

# Application Configuration (REQUIRED)
vercel env add BASE_URL production
vercel env add NEXT_PUBLIC_BASE_URL production
vercel env add NEXT_PUBLIC_SITE_URL production

# Authentication Secret (REQUIRED)
vercel env add AUTH_SECRET production

# Email Configuration (REQUIRED for password resets, order emails)
vercel env add RESEND_API_KEY production
vercel env add ADMIN_EMAIL production

# Google Analytics 4 (OPTIONAL - for tracking)
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production

# Meta (Facebook) Pixel & Conversions API (OPTIONAL - for ads)
vercel env add NEXT_PUBLIC_META_PIXEL_ID production
vercel env add META_CAPI_ACCESS_TOKEN production

# Microsoft Clarity (OPTIONAL - for heatmaps)
vercel env add NEXT_PUBLIC_CLARITY_ID production

# Worldpay Configuration (REQUIRED for payments)
vercel env add WORLDPAY_MERCHANT_CODE production
vercel env add WORLDPAY_INSTALLATION_ID production
vercel env add WORLDPAY_SECRET_KEY production
vercel env add WORLDPAY_TEST_MODE production

echo "Done! Now deploy with: vercel --prod"
