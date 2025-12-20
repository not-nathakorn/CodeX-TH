// src/components/AuthGuard.tsx
// --------------------------------------------------------
// Route Guard - Protects authenticated routes
// --------------------------------------------------------
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import React from "react";

import LazyFallback from "@/components/LazyFallback";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "client" | "admin";
}

export const AuthGuard = ({ children, requiredRole }: AuthGuardProps) => {
  const { isAuthenticated, isLoading, login, role, user } = useAuth();
  const location = useLocation();

  console.log("AuthGuard Check:", { 
    path: location.pathname,
    isLoading, 
    isAuthenticated, 
    userRole: role, 
    requiredRole,
    user: user
  });

  useEffect(() => {
    // Skip guard for callback page
    if (location.pathname === "/callback" || location.pathname === "/admin/callback") return;

    if (isLoading) {
      console.log("AuthGuard: Still loading...");
      return;
    }

    if (!isAuthenticated) {
      console.log("AuthGuard: User not authenticated. Redirecting to login.");
      sessionStorage.setItem("return_url", location.pathname + location.search);
      login();
    }
  }, [isAuthenticated, isLoading, login, location]);
  
  // Skip guard for callback page
  if (location.pathname === "/callback" || location.pathname === "/admin/callback") return <>{children}</>;

  if (isLoading) return <LazyFallback message="Verifying access..." />;

  // Role check
  if (isAuthenticated && requiredRole && role !== requiredRole) {
    console.warn(`AuthGuard: Role mismatch! Required: ${requiredRole}, Got: ${role}`);
    return (
        <div className="flex items-center justify-center h-screen flex-col gap-4">
            <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
            <p>Requires role: <strong>{requiredRole}</strong></p>
            <p>Your role: <strong>{role || "None"}</strong></p>
            <button onClick={login} className="px-4 py-2 bg-blue-600 text-white rounded">
                Login with different account
            </button>
        </div>
    );
  }

  if (isAuthenticated) return <>{children}</>;
  
  // Return fallback while redirecting to avoid white flash
  return <LazyFallback message="Redirecting to login..." />;
};
