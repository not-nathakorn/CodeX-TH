import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Spotlight = ({ className }: { className?: string }) => {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute -top-40 left-0 z-0 h-[169%] w-[138%]",
        className
      )}
      style={{
        background:
          "conic-gradient(from 90deg at 50% 50%, hsla(var(--primary), 0) 50%, hsla(var(--primary), 0.3) 100%)",
        filter: "blur(60px)",
      }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};
