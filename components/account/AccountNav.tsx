'use client';

import { User, Profile } from '@/lib/db/schema';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  UserCircle,
  MapPin,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AccountNavProps {
  user: User;
  profile: Profile | null;
}

const navItems = [
  {
    name: 'Dashboard',
    href: '/account/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Order History',
    href: '/account/orders',
    icon: Package,
  },
  {
    name: 'Account Details',
    href: '/account/details',
    icon: UserCircle,
  },
  {
    name: 'Saved Addresses',
    href: '/account/addresses',
    icon: MapPin,
  },
];

export function AccountNav({ user, profile }: AccountNavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full justify-between"
        >
          <span>Menu</span>
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={cn(
          'lg:block lg:w-64 lg:flex-shrink-0',
          mobileMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* User Info */}
          <div className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                {(user.name || user.email).charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">
                  {user.name || 'User'}
                </p>
                <p className="text-sm text-green-100 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                  )}
                >
                  <Icon className={cn(
                    'h-5 w-5',
                    isActive ? 'text-green-600' : 'text-gray-400'
                  )} />
                  {item.name}
                </Link>
              );
            })}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
}
