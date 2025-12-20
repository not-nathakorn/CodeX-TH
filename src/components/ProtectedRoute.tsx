import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isBypassed, isLoading, login } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;
    
    // Check if skipped_login flag exists (from Bypass mode)
    const skippedLogin = searchParams.get("skipped_login") === "true";
    
    // If not Logged in AND not Bypassed AND not returning from Bypass -> Trigger Login
    if (!isAuthenticated && !isBypassed && !skippedLogin) {
      console.log("Not authenticated, redirecting to login...");
      // Save the URL user tried to access
      localStorage.setItem("return_url", location.pathname + location.search);
      login();
    }
  }, [isAuthenticated, isBypassed, isLoading, login, searchParams, location]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const skippedLogin = searchParams.get("skipped_login") === "true";

  if (isAuthenticated || isBypassed || skippedLogin) {
    return <>{children}</>;
  }

  // Render nothing while redirecting
  return null;
};
