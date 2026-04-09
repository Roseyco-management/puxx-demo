"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster } from "sonner";

export const dynamic = 'force-dynamic';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me');

        if (!response.ok) {
          router.push('/login');
          return;
        }

        const { user } = await response.json();

        if (!user || user.role !== 'retailer') {
          router.push('/login');
          return;
        }

        setUserName(user.name || user.email);
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/login');
      }
    }

    checkAuth();
  }, [router]);

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    router.push('/login');
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-emerald-600">PUXX</span>
          <span className="text-gray-400">|</span>
          <span className="text-sm font-medium text-gray-600">Retailer Portal</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/portal/products" className="text-sm font-medium text-gray-700 hover:text-emerald-600">
            Products
          </Link>
          <Link href="/portal/orders" className="text-sm font-medium text-gray-700 hover:text-emerald-600">
            Orders
          </Link>
          <span className="text-sm text-gray-500">{userName}</span>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </nav>
      </header>
      <main className="p-6 mx-auto max-w-screen-xl">{children}</main>
    </div>
  );
}
