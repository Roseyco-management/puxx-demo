"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Toaster } from "sonner";

// Force dynamic rendering for all admin pages
export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        // Check if user is authenticated using custom auth
        const response = await fetch('/api/auth/me');

        if (!response.ok) {
          router.push('/login');
          return;
        }

        const { user } = await response.json();

        if (!user) {
          router.push('/login');
          return;
        }

        // Check user role
        if (!['admin', 'manager', 'support'].includes(user.role)) {
          router.push('/');
          return;
        }

        setUserRole(user.role);
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/login');
      }
    }

    checkAuth();
  }, [router]);

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  // Route-specific styles for the main content container
  const getRouteSpecificStyles = () => {
    return "p-4 mx-auto max-w-screen-2xl md:p-6";
  };

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "xl:ml-[290px]"
    : "xl:ml-[90px]";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 xl:flex">
      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />

      {/* Sidebar */}
      <AdminSidebar
        isExpanded={isExpanded}
        isMobileOpen={isMobileOpen}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        toggleMobileSidebar={toggleMobileSidebar}
        userRole={userRole}
      />

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 xl:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AdminHeader
          toggleSidebar={toggleSidebar}
          toggleMobileSidebar={toggleMobileSidebar}
          isMobileOpen={isMobileOpen}
        />

        {/* Page Content */}
        <div className={getRouteSpecificStyles()}>{children}</div>
      </div>
    </div>
  );
}
