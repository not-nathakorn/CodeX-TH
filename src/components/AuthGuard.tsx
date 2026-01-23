// src/components/AuthGuard.tsx
// ============================================================
// Route Protection Component
// ============================================================
// Wrap any route with this to require authentication
// Works with: useBBHAuth hook
// ============================================================

import { ReactNode } from 'react';
import { useBBHAuth } from '../hooks/useBBHAuth';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;  // Custom loading component
  loginRedirect?: string; // Where to redirect after login
}

export function AuthGuard({ 
  children, 
  fallback,
  loginRedirect 
}: AuthGuardProps) {
  const { user, isLoading, login } = useBBHAuth();

  // Show loading state
  if (isLoading) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!user) {
    // Use setTimeout to avoid React state update during render
    setTimeout(() => {
      login(loginRedirect || window.location.pathname);
    }, 0);
    
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  // Authenticated - render children
  return <>{children}</>;
}
