// src/contexts/AuthContext.tsx
// ============================================================
// Auth Context Adapter (BFF Compatibility Layer)
// ============================================================
// Adapts the new useBBHAuth hook to the old AuthContext interface
// so that existing components continue to work without refactoring.
// ============================================================

import { useBBHAuth } from "../hooks/useBBHAuth";

// Re-export User type if needed, or define a compatible one
export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  blackbox_id?: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // This component is legacy. The app is wrapped in BBHAuthProvider in App.tsx
  return <>{children}</>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    login, 
    logout, 
    refreshUser 
  } = useBBHAuth();

  // Adapter to match the old interface
  return {
    user: user as User | null,
    role: user?.role || null,
    isAuthenticated,
    isLoading,
    
    // Auth Actions
    login: () => login(),
    loginWithRole: (_role: string) => login(), // Role selection not supported in basic BFF yet
    loginForAdmins: () => login(),
    loginForUsers: () => login(),
    logout: () => logout(),
    
    // Refresh
    refreshAuth: refreshUser,
    
    // Legacy / Deprecated methods
    setUserDirectly: () => console.warn("setUserDirectly is deprecated in BFF mode"),
    getAccessToken: () => null, // Token is hidden in HttpOnly cookie
  };
};
