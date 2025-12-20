// src/contexts/AuthContext.tsx
// --------------------------------------------------------
// BlackBox Auth Provider - SECURE VERSION
// ✅ Uses server-side session verification
// --------------------------------------------------------
import { createContext, useContext, useEffect, useState } from "react";
import { User, checkAuth, logout as authLogout } from "../utils/auth";
import React from "react";

interface AuthContextType {
  user: User | null;
  role: string | null;
  isAuthenticated: boolean;
  login: () => void;
  loginAdmin: () => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const AUTH_URL = import.meta.env.VITE_BLACKBOX_AUTH_URL || "https://bbh.codex-th.com";
  const CLIENT_ID = import.meta.env.VITE_BLACKBOX_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_BLACKBOX_REDIRECT_URI || window.location.origin + "/callback";

  useEffect(() => { initAuth(); }, []);

  // ✅ Verify session with server on mount (No local cache)
  const initAuth = async () => {
    // Always fetch fresh data from server (HttpOnly Cookie)
    const serverUser = await checkAuth(); 
    if (serverUser) {
      setUser(serverUser);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  const refreshAuth = async () => {
    const serverUser = await checkAuth();
    setUser(serverUser);
  };

  const login = () => {
    if (!CLIENT_ID) return console.error("VITE_BLACKBOX_CLIENT_ID missing");
    window.location.href = `${AUTH_URL}/login?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  };

  const loginAdmin = () => {
    if (!CLIENT_ID) return;
    window.location.href = `${AUTH_URL}/child-admin/login?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  };

  const logout = () => {
    authLogout();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role: user?.role || null,
      isAuthenticated: !!user, 
      login, 
      loginAdmin, 
      logout,
      refreshAuth,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
