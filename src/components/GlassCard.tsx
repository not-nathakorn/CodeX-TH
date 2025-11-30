import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const GlassCard = ({ children, className, hover = true, glow = false }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass rounded-lg p-6 shadow-[var(--shadow-glass)]",
        hover && "hover-lift cursor-pointer",
        glow && "hover:glow-primary",
        "transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};
