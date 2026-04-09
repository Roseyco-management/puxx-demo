/**
 * Role-Based Access Control (RBAC) System
 * for PUXX Ireland Admin Dashboard
 */

export type Role = 'admin' | 'manager' | 'support';

export type Permission =
  | 'view_dashboard'
  | 'view_products' | 'create_products' | 'edit_products' | 'delete_products'
  | 'view_orders' | 'edit_orders' | 'delete_orders'
  | 'view_customers' | 'edit_customers' | 'delete_customers'
  | 'view_analytics'
  | 'view_marketing' | 'edit_marketing'
  | 'view_settings' | 'edit_settings'
  | 'manage_users';

const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    'view_dashboard',
    'view_products', 'create_products', 'edit_products', 'delete_products',
    'view_orders', 'edit_orders', 'delete_orders',
    'view_customers', 'edit_customers', 'delete_customers',
    'view_analytics',
    'view_marketing', 'edit_marketing',
    'view_settings', 'edit_settings',
    'manage_users'
  ],
  manager: [
    'view_dashboard',
    'view_products', 'create_products', 'edit_products', 'delete_products',
    'view_orders', 'edit_orders',
    'view_customers', 'edit_customers',
    'view_analytics'
  ],
  support: [
    'view_dashboard',
    'view_products',
    'view_orders', 'edit_orders',
    'view_customers'
  ]
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role].includes(permission);
}

export function canAccessRoute(role: Role, route: string): boolean {
  // Dashboard - all roles
  if (route === '/admin' || route.startsWith('/admin/dashboard')) {
    return true;
  }

  // Products
  if (route.startsWith('/admin/products')) {
    if (route.includes('/new') || route.includes('/edit')) {
      return hasPermission(role, 'create_products') || hasPermission(role, 'edit_products');
    }
    return hasPermission(role, 'view_products');
  }

  // Orders
  if (route.startsWith('/admin/orders')) {
    return hasPermission(role, 'view_orders');
  }

  // Customers
  if (route.startsWith('/admin/customers')) {
    return hasPermission(role, 'view_customers');
  }

  // Analytics
  if (route.startsWith('/admin/analytics')) {
    return hasPermission(role, 'view_analytics');
  }

  // Marketing
  if (route.startsWith('/admin/marketing')) {
    return hasPermission(role, 'view_marketing');
  }

  // Settings - admin only
  if (route.startsWith('/admin/settings')) {
    return role === 'admin';
  }

  // Account pages - all roles
  if (route.startsWith('/admin/account')) {
    return true;
  }

  return false;
}
