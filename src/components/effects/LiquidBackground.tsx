// LiquidBackground - Reduced intensity blobs (barely visible at edges)

export const LiquidBackground = () => {
  return (
    <>
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* Base Background Layer - Pure White */}
        <div className="absolute inset-0 bg-white dark:bg-[#0a0a0a] transition-colors duration-300" />

        {/* Colorful Blob Layer - Reduced Intensity, Centered More */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Blob 1: Blue - Centered more, lower opacity */}
          <div className="absolute top-[5%] left-[-5%] md:top-[0%] md:left-[5%] w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw]">
            <div
              className="w-full h-full rounded-full animate-blob-pulse blob-1 blur-[80px] md:blur-[120px]"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(59, 130, 246, 0.18) 0%, rgba(59, 130, 246, 0.08) 30%, transparent 55%)",
              }}
            />
          </div>

          {/* Blob 2: Pink - Centered more, lower opacity */}
          <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] md:w-[45vw] md:h-[45vw]">
            <div
              className="w-full h-full rounded-full animate-blob-pulse animation-delay-2000 blob-2 blur-[100px] md:blur-[150px]"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(236, 72, 153, 0.12) 0%, rgba(236, 72, 153, 0.05) 30%, transparent 55%)",
              }}
            />
          </div>

          {/* Blob 3: Green/Cyan - Centered more, lower opacity */}
          <div className="absolute top-[30%] right-[-10%] md:top-[20%] md:right-[5%] w-[70vw] h-[70vw] md:w-[35vw] md:h-[35vw]">
            <div
              className="w-full h-full rounded-full animate-blob-pulse animation-delay-4000 blob-3 blur-[80px] md:blur-[120px]"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(34, 197, 94, 0.12) 0%, rgba(34, 197, 94, 0.05) 30%, transparent 55%)",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .dark .blob-1 {
          background: radial-gradient(circle at center, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0.06) 30%, transparent 55%) !important;
        }
        .dark .blob-2 {
          background: radial-gradient(circle at center, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0.05) 30%, transparent 55%) !important;
        }
        .dark .blob-3 {
          background: radial-gradient(circle at center, rgba(20, 184, 166, 0.12) 0%, rgba(20, 184, 166, 0.05) 30%, transparent 55%) !important;
        }
      `}</style>
    </>
  );
};
