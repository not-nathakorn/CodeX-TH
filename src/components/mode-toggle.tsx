import { Moon, Sun, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.button
      onClick={cycleTheme}
      className={cn(
        "p-2 rounded-full transition-all duration-300",
        "bg-neutral-100/80 dark:bg-neutral-800/80",
        "text-neutral-800 dark:text-neutral-200",
        "hover:bg-primary/20 hover:text-primary",
        "border border-neutral-200/50 dark:border-neutral-700/50",
        "flex items-center justify-center"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      title={`Current: ${theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light"}`}
    >
      {/* Icon container with smooth transitions */}
      <div className="relative w-4 h-4 md:w-5 md:h-5">
        {/* Sun Icon - Light Mode */}
        <Sun
          className={cn(
            "absolute inset-0 h-full w-full transition-all duration-500",
            theme === "light"
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 rotate-90 opacity-0"
          )}
        />

        {/* Moon Icon - Dark Mode */}
        <Moon
          className={cn(
            "absolute inset-0 h-full w-full transition-all duration-500",
            theme === "dark"
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 -rotate-90 opacity-0"
          )}
        />

        {/* Monitor Icon - System Mode */}
        <Monitor
          className={cn(
            "absolute inset-0 h-full w-full transition-all duration-500",
            theme === "system"
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 rotate-180 opacity-0"
          )}
        />
      </div>
    </motion.button>
  );
}
