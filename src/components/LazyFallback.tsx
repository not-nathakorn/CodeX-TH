import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LazyFallbackProps {
  message?: string;
}

const LazyFallback: React.FC<LazyFallbackProps> = ({
  message = "กำลังโหลด...",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-black">
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Main loading card with glass effect */}
        <div className="bg-white/80 dark:bg-zinc-900/40 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-white/10 p-8 animate-pulse-glow">
          <div className="space-y-6">
            {/* Header skeleton with avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Skeleton className="w-14 h-14 rounded-full dark:bg-zinc-800" />
                {/* Subtle Glow restored */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-md animate-pulse"></div>
              </div>
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4 dark:bg-zinc-800" />
                <Skeleton className="h-4 w-1/2 dark:bg-zinc-800" />
              </div>
            </div>

            {/* Content skeletons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Skeleton className="h-32 w-full rounded-xl dark:bg-zinc-800" />
                <Skeleton className="h-4 w-full dark:bg-zinc-800" />
                <Skeleton className="h-4 w-2/3 dark:bg-zinc-800" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-32 w-full rounded-xl dark:bg-zinc-800" />
                <Skeleton className="h-4 w-full dark:bg-zinc-800" />
                <Skeleton className="h-4 w-3/4 dark:bg-zinc-800" />
              </div>
            </div>

            {/* Enhanced progress indicator */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="relative">
                <div className="w-8 h-8 border-2 border-slate-200 dark:border-zinc-800 border-t-slate-900 dark:border-t-white rounded-full animate-spin"></div>
                {/* Subtle Glow restored */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-lg animate-pulse"></div>
              </div>
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-slate-900 dark:bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-900 dark:bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-900 dark:bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>

            {/* Loading message */}
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-zinc-400 animate-pulse">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LazyFallback;
