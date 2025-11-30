import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  block?: boolean;
  element?: keyof JSX.IntrinsicElements;
}

export const AnimatedText = ({ children, className, block = false, element = "span" }: AnimatedTextProps) => {
  const MotionComponent = motion[element as keyof typeof motion] as React.ElementType || motion.span;

  return (
    <AnimatePresence mode="wait">
      <MotionComponent
        key={children?.toString()}
        initial={{ opacity: 0, y: 5, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -5, filter: "blur(8px)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={className}
        style={{ display: block ? "block" : "inline-block" }}
      >
        {children}
      </MotionComponent>
    </AnimatePresence>
  );
};
