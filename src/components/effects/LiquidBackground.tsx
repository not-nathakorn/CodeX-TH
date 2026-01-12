import React from 'react';

export const LiquidBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Layer 1: Base Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EBF4FF] via-[#F0F7FF] to-[#E8F4FD] dark:from-black dark:via-[#0a0a0f] dark:to-black transition-colors duration-500 ease-in-out" />
      
      {/* Layer 2: Subtle Radial Gradient Overlay (Light Mode Enhancement) */}
      <div className="absolute inset-0 opacity-60 dark:opacity-0 transition-opacity duration-500" 
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(147, 197, 253, 0.4) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(196, 181, 253, 0.3) 0%, transparent 40%), radial-gradient(ellipse 50% 30% at 0% 80%, rgba(165, 243, 252, 0.25) 0%, transparent 35%)'
        }} 
      />
      
      {/* Layer 3: Animated Blobs with Edge Masking */}
      <div className="absolute inset-0" style={{ 
        maskImage: 'linear-gradient(180deg, transparent 0, #000 150px, #000 calc(100% - 150px), transparent 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0, #000 150px, #000 calc(100% - 150px), transparent 100%)'
      }}>
        {/* Light mode: More saturated & visible blobs */}
        <div className="absolute -top-[20%] -left-[10%] w-[55%] h-[55%] rounded-full bg-blue-300/50 dark:bg-blue-500/20 blur-3xl animate-blob mix-blend-multiply dark:mix-blend-screen will-change-transform" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-sky-300/45 dark:bg-cyan-500/20 blur-3xl animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen will-change-transform" />
        <div className="absolute -bottom-[20%] left-[20%] w-[55%] h-[55%] rounded-full bg-violet-300/40 dark:bg-purple-500/20 blur-3xl animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen will-change-transform" />
        
        {/* Extra accent blob for light mode depth */}
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 dark:bg-transparent blur-3xl animate-blob animation-delay-2000 mix-blend-multiply will-change-transform" />
      </div>
      
      {/* Layer 4: Subtle noise texture overlay for premium feel */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
        }}
      />
    </div>
  );
};
