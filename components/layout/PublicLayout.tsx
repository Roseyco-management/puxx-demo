"use client";

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't show header/footer for admin and account dashboards (they have their own layouts)
  const isAdminRoute = pathname?.startsWith('/admin');
  const isAccountRoute = pathname?.startsWith('/account');
  
  if (isAdminRoute || isAccountRoute) {
    return <>{children}</>;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
