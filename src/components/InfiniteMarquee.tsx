import React from 'react';

import { 
  SiNextdotjs, 
  SiReact, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiPostgresql, 
  SiPython, 
  SiCplusplus, 
  SiFramer, 
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit
} from 'react-icons/si';

const technologies = [
  { name: "Next.js", icon: SiNextdotjs, color: "text-black dark:text-white" },
  { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#38BDF8]" }, // Removed class, will use style
  { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933] dark:text-[#68A063]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1] dark:text-[#6fa8dc]" },
  { name: "Python", icon: SiPython, color: "text-[#3776AB] dark:text-[#4B8BBE]" },
  { name: "C++", icon: SiCplusplus, color: "text-[#00599C] dark:text-[#5E97D0]" },
  { name: "Framer Motion", icon: SiFramer, color: "text-black dark:text-white" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
  { name: "HTML5", icon: SiHtml5, color: "text-[#E34F26]" },
  { name: "CSS3", icon: SiCss3, color: "text-[#1572B6] dark:text-[#3C99DC]" },
  { name: "Git", icon: SiGit, color: "text-[#F05032]" },
];

const renderIcon = (tech: typeof technologies[0]) => {
  if (tech.name === "Tailwind CSS") {
    return <tech.icon size={24} style={{ color: '#38BDF8' }} />;
  }
  if (tech.name === "PostgreSQL") {
    return <tech.icon size={28} className={`${tech.color} scale-110`} />;
  }
  if (tech.name === "Framer Motion") {
    return <tech.icon size={24} className="text-black dark:text-white" />;
  }
  return <tech.icon size={24} className={tech.color} />;
};

const Card = ({ tech }: { tech: typeof technologies[0] }) => (
  <div className="mx-4 flex items-center gap-3 rounded-full border border-white/50 dark:border-white/10 bg-white/20 dark:bg-black/20 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-lg backdrop-blur-sm hover:scale-105 transition-all cursor-default hover:shadow-xl hover:bg-white/40 dark:hover:bg-neutral-800/40 hover:border-white/60">
    {renderIcon(tech)}
    <span>{tech.name}</span>
  </div>
);

export const InfiniteMarquee = () => {
  const firstRow = technologies.slice(0, Math.ceil(technologies.length / 2));
  const secondRow = technologies.slice(Math.ceil(technologies.length / 2));

  return (
    <div className="relative flex flex-col w-full overflow-hidden py-6 mt-6">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }
        /* Pause on hover optional */
        /* .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        } */
      `}</style>

      {/* Gradient Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f0f4f8] dark:from-neutral-950 to-transparent z-20"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f0f4f8] dark:from-neutral-950 to-transparent z-20"></div>
      
      {/* First Row - Left Direction */}
      <div className="flex w-max animate-marquee-left relative z-10 will-change-transform">
        {[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((tech, i) => (
          <Card key={`row1-${i}`} tech={tech} />
        ))}
      </div>

      {/* Second Row - Right Direction */}
      <div className="flex w-max animate-marquee-right -mt-1 relative z-0 will-change-transform">
        {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((tech, i) => (
          <Card key={`row2-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
};
