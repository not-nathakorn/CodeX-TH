import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";

interface CopyEmailButtonProps {
  t: (key: string) => string;
}

export const CopyEmailButton = ({ t }: CopyEmailButtonProps) => {
  const [copied, setCopied] = useState(false);
  const email = "nathakorn.phikromsuk@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleCopy}
      className="group px-6 py-3 rounded-xl font-bold glass-strong border border-border/50 hover:border-primary/50 inline-flex items-center gap-2 justify-center transition-all text-foreground relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex items-center gap-2 text-green-500"
          >
            <Check className="w-5 h-5" />
            <span><AnimatedText>{t("contact.copied")}</AnimatedText></span>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Copy className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span><AnimatedText>{t("contact.copyEmail")}</AnimatedText></span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
