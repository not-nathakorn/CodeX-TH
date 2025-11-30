import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { AnimatedText } from "@/components/ui/AnimatedText";

interface LineButtonProps {
  t: (key: string) => string;
}

export const LineButton = ({ t }: LineButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className="group px-6 py-3 rounded-xl font-bold glass-strong border border-border/50 hover:border-primary/50 inline-flex items-center gap-2 justify-center transition-all text-foreground relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle className="w-5 h-5 group-hover:text-primary transition-colors" />
          <span>Line ID</span>
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-border/50 bg-background/80 backdrop-blur-xl p-0 overflow-hidden gap-0">
        <div className="p-6 text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold text-center">
              <AnimatedText>{t("contact.linePopupTitle")}</AnimatedText>
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              <AnimatedText>{t("contact.linePopupMessage")}</AnimatedText>
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center pt-2">
            <DialogClose asChild>
              <motion.button
                className="px-8 py-2.5 rounded-full font-bold bg-gradient-primary text-white shadow-lg hover:shadow-primary/25 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                OK
              </motion.button>
            </DialogClose>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary" />
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      </DialogContent>
    </Dialog>
  );
};
