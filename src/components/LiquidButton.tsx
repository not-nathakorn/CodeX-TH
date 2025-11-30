import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface LiquidButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const LiquidButton = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: LiquidButtonProps) => {
  const baseStyles = "rounded-full font-medium transition-all duration-300 shine-effect";
  
  const variants = {
    primary: "bg-gradient-primary text-primary-foreground shadow-[var(--shadow-glass)] hover:shadow-[var(--shadow-hover)] hover:scale-105 hover:glow-primary",
    secondary: "glass text-foreground hover:bg-secondary hover:scale-105",
    ghost: "text-foreground hover:bg-secondary/50 hover:scale-105",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
