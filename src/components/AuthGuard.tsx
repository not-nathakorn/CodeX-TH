// src/components/AuthGuard.tsx
// --------------------------------------------------------
// Route Guard - Protects authenticated routes
// --------------------------------------------------------
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "client" | "admin";
}

export const AuthGuard = ({ children, requiredRole }: AuthGuardProps) => {
  const { isAuthenticated, isLoading, login, role } = useAuth();
  const location = useLocation();

  // Skip guard for callback page
  if (location.pathname === "/callback") return <>{children}</>;

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      sessionStorage.setItem("return_url", location.pathname + location.search);
      login();
    }
  }, [isAuthenticated, isLoading, login, location]);

  if (isLoading) return <div>Loading...</div>;

  // Role check
  if (isAuthenticated && requiredRole && role !== requiredRole) {
    return <div>Access Denied: Requires {requiredRole} role.</div>;
  }

  if (isAuthenticated) return <>{children}</>;
  
  return null;
};
