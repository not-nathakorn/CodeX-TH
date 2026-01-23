import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthGuard } from "@/components/AuthGuard";
import { RoleGuard } from "@/components/RoleGuard";
import { BBHAuthProvider } from "@/hooks/useBBHAuth";
import { NavigationDock } from "@/components/NavigationDock";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useAnalytics } from "@/hooks/useAnalytics";
import LazyFallback from "@/components/LazyFallback";
import React from "react";

// Lazy load pages to improve performance
import { ThemeColorManager } from "@/components/ThemeColorManager";

// Lazy load pages to improve performance
import Index from "./pages/Index";
const AdminLayout = React.lazy(() => import("./pages/AdminLayout").then(module => ({ default: module.AdminLayout })));
const CallbackPage = React.lazy(() => import("./pages/CallbackPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Component แยกเพื่อใช้ hook ภายใน Router context
const AnalyticsTracker = () => {
  useAnalytics();
  return null;
};

import { LiquidBackground } from "@/components/effects/LiquidBackground";

import { MaintenanceGuard } from "@/components/MaintenanceGuard";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter
            future={{
              v7_relativeSplatPath: true,
              v7_startTransition: true,
            }}
          >
            <BBHAuthProvider>
              <ThemeColorManager />
              <LiquidBackground />
              <AnalyticsTracker />
              <MaintenanceGuard>
                <React.Suspense fallback={<LazyFallback />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    {/* Callback - OAuth redirect handler */}
                    <Route path="/callback" element={<CallbackPage />} />
                    {/* Admin Route - Protected with AuthGuard requiring admin role */}
                    <Route path="/admin" element={
                      <AuthGuard>
                        <RoleGuard allowedRoles={['admin']}>
                          <AdminLayout />
                        </RoleGuard>
                      </AuthGuard>
                    } />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </React.Suspense>
                <NavigationDock />
              </MaintenanceGuard>
            </BBHAuthProvider>
          </BrowserRouter>
          <Analytics />
          <SpeedInsights />
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
