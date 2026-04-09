import { ReactNode } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Authentication | PUXX Ireland',
  description: 'Sign in or create an account with PUXX Ireland - Premium nicotine pouches',
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-emerald group-hover:scale-105 transition-transform">
                  <span className="text-2xl font-bold text-white">P</span>
                </div>
                <span className="text-2xl font-heading text-gray-900">
                  PUXX Ireland
                </span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-primary transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600 font-medium">
                18+ only. By using PUXX Ireland, you confirm you are of legal age.
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
                <span>•</span>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
