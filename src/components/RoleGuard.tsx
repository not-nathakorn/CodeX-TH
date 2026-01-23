// src/components/RoleGuard.tsx
// ============================================================
// Role-Based Access Control Component
// ============================================================
// Only allows users with specific roles to access content
// ============================================================

import { ReactNode } from 'react';
import { useBBHAuth } from '../hooks/useBBHAuth';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;  // What to show if role not allowed
}

export function RoleGuard({ 
  children, 
  allowedRoles,
  fallback 
}: RoleGuardProps) {
  const { user, isLoading } = useBBHAuth();

  // Still loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return fallback || (
      <div className="p-4 text-center text-muted-foreground">
        Please login to access this content.
      </div>
    );
  }

  // Check role
  if (!allowedRoles.includes(user.role || '')) {
    return fallback || (
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-destructive">Access Denied</h3>
        <p className="text-muted-foreground mt-1">
          You don&apos;t have permission to access this content.
        </p>
        <p className="text-sm mt-2">
          Required roles: {allowedRoles.join(', ')}
        </p>
      </div>
    );
  }

  // Role allowed - render children
  return <>{children}</>;
}
