import { motion } from "framer-motion";

export const Meteors = ({ number = 20 }: { number?: number }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(number)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-0.5 w-0.5 rotate-[215deg] bg-primary/50"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: "0 0 0 1px hsla(var(--primary), 0.1)",
          }}
          animate={{
            x: [-400, 400],
            y: [-400, 400],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          <div className="w-14 h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 rotate-[215deg]" />
        </motion.span>
      ))}
    </div>
  );
};
