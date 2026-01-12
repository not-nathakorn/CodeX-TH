import React from 'react';

export const LiquidBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Layer 1: Seamless Base Background - matches body/html colors exactly */}
      <div className="absolute inset-0 bg-[#EBF4FF] dark:bg-black transition-colors duration-500 ease-in-out" />
      
      {/* Layer 2: Soft Ambient Glow (Light Mode only) */}
      <div className="absolute inset-0 dark:opacity-0 transition-opacity duration-500" 
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 40%, rgba(147, 197, 253, 0.4) 0%, transparent 70%), radial-gradient(ellipse 50% 35% at 75% 60%, rgba(196, 181, 253, 0.3) 0%, transparent 60%), radial-gradient(ellipse 45% 30% at 25% 55%, rgba(165, 243, 252, 0.25) 0%, transparent 55%)'
        }} 
      />
      
      {/* Layer 3: Animated Blobs - contained in center, away from edges */}
      <div 
        className="absolute inset-0"
        style={{
          // Mask to fade out blobs at edges - prevents color bleed to safari address bar
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      >
        <div className="absolute top-[15%] left-[5%] w-[45%] h-[40%] rounded-full bg-blue-300/40 dark:bg-blue-500/20 blur-[80px] animate-blob mix-blend-multiply dark:mix-blend-screen will-change-transform" />
        <div className="absolute top-[30%] right-[5%] w-[40%] h-[35%] rounded-full bg-sky-300/35 dark:bg-cyan-500/20 blur-[80px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen will-change-transform" />
        <div className="absolute bottom-[25%] left-[25%] w-[45%] h-[35%] rounded-full bg-violet-300/35 dark:bg-purple-500/20 blur-[80px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen will-change-transform" />
        <div className="absolute top-[40%] left-[30%] w-[35%] h-[30%] rounded-full bg-indigo-200/30 dark:bg-indigo-500/10 blur-[70px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen will-change-transform" />
      </div>
    </div>
  );
};
