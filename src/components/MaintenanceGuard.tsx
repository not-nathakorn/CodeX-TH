import { useLocation } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSupabaseRealtime";
import { useAuth } from "@/contexts/AuthContext";
import MaintenancePage from "@/pages/MaintenancePage";
import { Loader2 } from "lucide-react";

interface MaintenanceGuardProps {
  children: React.ReactNode;
}

export const MaintenanceGuard = ({ children }: MaintenanceGuardProps) => {
  const { settings, loading } = useSiteSettings();
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  // Always allow access to admin routes and auth callbacks
  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/callback')) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (settings.maintenance_mode) {
    // Check if user is authenticated (Admin)
    // role is already destructured at the top level
    
    // Allow admins to view the site even in maintenance mode
    // Strictly check for 'admin' role to prevent regular users from seeing it if they somehow login
    if (isAuthenticated && role === 'admin') {
      return (
        <>
          {/* Premium Admin Indicator */}
          {/* Premium Admin Indicator to match requested design with Theme Support */}
          <div className="fixed top-28 right-6 z-50 flex items-center gap-4 px-6 py-3 bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white text-xs font-bold rounded-full shadow-lg shadow-slate-200/50 dark:shadow-xl dark:shadow-black/20 border border-slate-200 dark:border-slate-700/50 transform transition-all duration-300 hover:scale-105 cursor-default select-none animate-in fade-in slide-in-from-top-10 duration-500">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-20 dark:opacity-20"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 uppercase tracking-widest text-[11px]">MAINTENANCE MODE</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-600"></div>
            <span className="text-slate-500 dark:text-slate-200 font-medium">Admin View</span>
          </div>
          {children}
        </>
      );
    }

    return (
      <MaintenancePage 
        title={settings.maintenance_title}
        message={settings.maintenance_message}
        detail={settings.maintenance_detail}
        duration={settings.maintenance_duration}
        availableForWork={settings.available_for_work}
        contactEmail={settings.contact_email}
        socialLine={settings.social_line}
        socialLinkedin={settings.social_linkedin}
      />
    );
  }

  return <>{children}</>;
};
