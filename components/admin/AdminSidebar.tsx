"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Mail,
  Settings,
  UserCircle,
  LogOut,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string }[];
  roles?: string[]; // Roles that can access this item
};

interface AdminSidebarProps {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
  toggleMobileSidebar: () => void;
  userRole: string | null;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isExpanded,
  isMobileOpen,
  isHovered,
  setIsHovered,
  toggleMobileSidebar,
  userRole,
}) => {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<number, number>>({});
  const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const navItems: NavItem[] = [
    {
      icon: <LayoutDashboard size={20} />,
      name: "Dashboard",
      path: "/admin",
    },
    {
      name: "E-commerce",
      icon: <ShoppingCart size={20} />,
      subItems: [
        { name: "Products", path: "/admin/products" },
        { name: "Orders", path: "/admin/orders" },
        { name: "Customers", path: "/admin/customers" },
      ],
      roles: ["admin", "manager"],
    },
    {
      icon: <BarChart3 size={20} />,
      name: "Analytics",
      subItems: [
        { name: "Overview", path: "/admin/analytics" },
        { name: "Revenue", path: "/admin/analytics/revenue" },
        { name: "Products", path: "/admin/analytics/products" },
        { name: "Traffic", path: "/admin/analytics/traffic" },
      ],
      roles: ["admin", "manager"],
    },
    {
      icon: <Mail size={20} />,
      name: "Marketing",
      subItems: [
        { name: "Email Subscribers", path: "/admin/marketing/subscribers" },
      ],
      roles: ["admin"],
    },
    {
      icon: <Settings size={20} />,
      name: "Settings",
      subItems: [
        { name: "General", path: "/admin/settings/general" },
        { name: "Payments", path: "/admin/settings/payments" },
        { name: "Shipping", path: "/admin/settings/shipping" },
        { name: "Taxes", path: "/admin/settings/taxes" },
        { name: "Email Templates", path: "/admin/settings/email-templates" },
        { name: "Users & Roles", path: "/admin/settings/users" },
      ],
      roles: ["admin"],
    },
  ];

  const accountItems: NavItem[] = [
    {
      icon: <UserCircle size={20} />,
      name: "Account",
      subItems: [
        { name: "Profile", path: "/admin/account/profile" },
        { name: "Security", path: "/admin/account/security" },
        { name: "Activity Log", path: "/admin/account/activity" },
      ],
    },
  ];

  const isActive = useCallback((path: string) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(path);
  }, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    navItems.concat(accountItems).forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu(index);
          }
        });
      }
    });
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null && subMenuRefs.current[openSubmenu]) {
      setSubMenuHeight((prevHeights) => ({
        ...prevHeights,
        [openSubmenu]: subMenuRefs.current[openSubmenu]?.scrollHeight || 0,
      }));
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu === index) {
        return null;
      }
      return index;
    });
  };

  const hasPermission = (item: NavItem) => {
    if (!item.roles) return true;
    return userRole && item.roles.includes(userRole);
  };

  const renderMenuItems = (items: NavItem[], startIndex: number = 0) => (
    <ul className="flex flex-col gap-1">
      {items.map((nav, idx) => {
        const index = startIndex + idx;

        if (!hasPermission(nav)) return null;

        return (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index)}
                className={`flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition-all rounded-lg group ${
                  openSubmenu === index
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                } ${!isExpanded && !isHovered ? "xl:justify-center" : "xl:justify-start"}`}
              >
                <span
                  className={`${
                    openSubmenu === index
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <>
                    <span className="flex-1 text-left">{nav.name}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        openSubmenu === index ? "rotate-180 text-emerald-600 dark:text-emerald-400" : ""
                      }`}
                    />
                  </>
                )}
              </button>
            ) : (
              nav.path && (
                <Link
                  href={nav.path}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all rounded-lg group ${
                    isActive(nav.path)
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  } ${!isExpanded && !isHovered ? "xl:justify-center" : "xl:justify-start"}`}
                >
                  <span
                    className={`${
                      isActive(nav.path)
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span>{nav.name}</span>
                  )}
                </Link>
              )
            )}
            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[index] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height: openSubmenu === index ? `${subMenuHeight[index]}px` : "0px",
                }}
              >
                <ul className="mt-2 ml-9 space-y-1">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.path}
                        className={`block px-4 py-2 text-sm transition-colors rounded-lg ${
                          isActive(subItem.path)
                            ? "text-emerald-700 bg-emerald-50 font-medium dark:bg-emerald-900/20 dark:text-emerald-400"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed flex flex-col top-0 left-0 bg-white dark:bg-gray-900 text-gray-900 h-full transition-all duration-300 ease-in-out z-50 border-r border-gray-200 dark:border-gray-800
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        xl:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-6 px-5 flex border-b border-gray-200 dark:border-gray-800 ${
          !isExpanded && !isHovered ? "xl:justify-center" : "justify-start"
        }`}
      >
        <Link href="/admin">
          {isExpanded || isHovered || isMobileOpen ? (
            <Image
              src="/images/logo/puxx-logo-full.svg"
              alt="PUXX Ireland"
              width={150}
              height={40}
              className="dark:hidden"
            />
          ) : (
            <Image
              src="/images/logo/puxx-logo-icon.svg"
              alt="PUXX"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      <div className="flex flex-col flex-1 px-5 py-4 overflow-y-auto">
        <nav className="flex-1 space-y-6">
          <div>
            <h2
              className={`mb-3 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 ${
                !isExpanded && !isHovered ? "xl:text-center" : ""
              }`}
            >
              {isExpanded || isHovered || isMobileOpen ? "Main Menu" : <MoreHorizontal size={16} />}
            </h2>
            {renderMenuItems(navItems, 0)}
          </div>

          <div>
            <h2
              className={`mb-3 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 ${
                !isExpanded && !isHovered ? "xl:text-center" : ""
              }`}
            >
              {isExpanded || isHovered || isMobileOpen ? "Account" : <MoreHorizontal size={16} />}
            </h2>
            {renderMenuItems(accountItems, navItems.length)}
          </div>
        </nav>

        {/* Logout Button */}
        {(isExpanded || isHovered || isMobileOpen) && (
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium text-red-600 transition-all rounded-lg hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
