import { roleRoutes } from '@/lib/constants/routes';
import type { Role } from '@/lib/constants/roles';

const storefrontPaths = ['/', '/about', '/contact', '/policies', '/products'];
const authPaths = ['/auth', '/login', '/register'];
const utilityPaths = ['/forbidden', '/not-found'];

export function isAuthenticated(role: Role | null | undefined) {
  return role && role !== 'GUEST';
}

export function canAccessPath(role: Role | null | undefined, path: string) {
  if (!role || role === 'GUEST') {
    return [...storefrontPaths, ...authPaths, ...utilityPaths].some((allowed) => path === allowed || (allowed === '/products' && path.startsWith('/products/')));
  }

  if (authPaths.includes(path)) {
    return false;
  }

  if (role === 'ADMIN') {
    return roleRoutes.ADMIN.some((prefix) => path === prefix || path.startsWith(`${prefix}/`)) || utilityPaths.includes(path);
  }

  if (role === 'STAFF') {
    return roleRoutes.STAFF.some((prefix) => path === prefix || path.startsWith(`${prefix}/`)) || utilityPaths.includes(path);
  }

  if (role === 'CUSTOMER') {
    return [...storefrontPaths, ...roleRoutes.CUSTOMER, ...utilityPaths].some((allowed) => path === allowed || (allowed === '/products' && path.startsWith('/products/')));
  }

  return false;
}

export function redirectForRole(role: Role | null | undefined) {
  if (role === 'ADMIN') return '/admin/dashboard';
  if (role === 'STAFF') return '/staff/products';
  if (role === 'CUSTOMER') return '/account';
  return '/';
}

export function isRoleAtLeast(role: Role | null | undefined, target: Role) {
  const order: Role[] = ['GUEST', 'CUSTOMER', 'STAFF', 'ADMIN'];
  return (role ? order.indexOf(role) : 0) >= order.indexOf(target);
}
