import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AccessDeniedScreenProps {
  requiredRole?: string;
}

export const AccessDeniedScreen: React.FC<AccessDeniedScreenProps> = ({ requiredRole }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 dark:from-slate-950 dark:via-red-950/20 dark:to-orange-950/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-red-200 dark:border-red-900/50 p-8 text-center relative overflow-hidden">
          
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-600" />
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />

          {/* Icon */}
          <div className="mb-6 relative inline-block">
             <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
             <div className="relative bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
               <ShieldAlert className="w-12 h-12 text-red-600 dark:text-red-400" />
             </div>
          </div>

          {/* Text */}
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            You do not have permission to view this page.
            {requiredRole && (
              <span className="block mt-2 text-sm bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 py-1 px-3 rounded-full mx-auto w-fit">
                Required Role: <span className="font-bold">{requiredRole}</span>
              </span>
            )}
          </p>

          <div className="text-xs text-slate-500 dark:text-slate-400 mb-8 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg flex flex-col items-center">
             <span className="mb-1">Signed in as:</span>
             <span className="font-semibold text-slate-700 dark:text-slate-200">{user?.email || "Unknown User"}</span>
             <span className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">({user?.role || "No Role"})</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => navigate("/")}
              variant="default"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <Button 
              onClick={logout}
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign in with different account
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
