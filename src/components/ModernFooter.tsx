import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code2, Rocket, Zap, Sparkles } from "lucide-react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export const ModernFooter = () => {
  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/codex-th", gradient: "from-purple-500 via-pink-500 to-purple-500" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", gradient: "from-blue-500 via-cyan-500 to-blue-500" },
    { name: "Email", icon: Mail, href: "mailto:nathakorn.phikromsuk@gmail.com", gradient: "from-green-500 via-emerald-500 to-green-500" },
  ];

  const stats = [
    { icon: Code2, value: "6+", label: "Projects", color: "from-purple-400 to-pink-400", animation: { y: [0, -3, 0] } },
    { icon: Rocket, value: "100%", label: "Passion", color: "from-blue-400 to-cyan-400", animation: { rotate: [0, 15, -15, 0] } },
    { icon: Zap, value: "24/7", label: "Available", color: "from-green-400 to-emerald-400", animation: { scale: [1, 1.2, 1] } },
  ];

  return (
    <footer className="relative overflow-hidden mb-20 md:mb-0 border-t border-border/30">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-5 md:py-6">
        {/* Main Content - Spread Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          
          {/* Left: Brand with Sparkles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            </motion.div>
            <div className="h-10 w-40 md:h-12 md:w-48 flex items-center justify-center -my-2">
              <TextHoverEffect text="CodeX-TH" />
            </div>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            </motion.div>
          </motion.div>


          {/* Center: Stats with Animated Icons */}
          <div className="flex gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative group"
              >
                <motion.div
                  className="relative flex flex-col items-center gap-0.5 glass rounded-lg p-2 md:p-2.5 border border-border/50 min-w-[65px] md:min-w-[80px] overflow-hidden"
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {/* Animated gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  
                  {/* Animated Icon */}
                  <motion.div
                    animate={stat.animation}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                  >
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary relative z-10" />
                  </motion.div>
                  <div className={`text-base md:text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent relative z-10`}>
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground relative z-10">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Right: Social Icons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-2 md:gap-2.5"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.05, type: "spring" }}
                className="relative group"
              >
                {/* Animated gradient border */}
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${social.gradient} rounded-full opacity-0 group-hover:opacity-75 blur-sm transition-opacity`}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                <motion.a
                  href={social.href}
                  target={social.name !== "Email" ? "_blank" : undefined}
                  rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                  className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full glass border border-border/50 transition-all duration-300"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <social.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom: Copyright with Full-Width Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mt-4 pt-3"
        >
          {/* Full-width animated divider */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          
          <p className="text-sm md:text-base text-muted-foreground text-center">
            © 2025 Na-thakorn Pikromsuk
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
