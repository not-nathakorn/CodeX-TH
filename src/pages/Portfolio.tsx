import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Github,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Layout,
  Cpu,
  Server,
  Zap,
  GraduationCap,
  Briefcase,
  Award,
  Languages,
  Menu,
  X,
  CreditCard,
  FileText,
  ShoppingCart,
  Calendar,
  ShieldCheck,
  LifeBuoy,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// --- Types & Data ---
type Language = "TH" | "EN";

interface Content {
  name: string;
  role: string;
  education: {
    title: string;
    items: {
      degree: string;
      school: string;
      year: string;
      details: string[];
    }[];
  };
  experience: {
    title: string;
    items: { role: string; place?: string; year?: string; details: string[] }[];
  };
  projects: {
    title: string;
    items: {
      name: string;
      url: string;
      icon: React.ReactNode;
      color: string;
      desc: string;
    }[];
  };
  contact: string;
}

const contentData: Record<Language, Content> = {
  TH: {
    name: "ว่าที่ ร้อยตรี ณฐกร พิกรมสุข",
    role: "Full Stack Developer & Educator",
    education: {
      title: "ประวัติการศึกษา",
      items: [
        {
          degree:
            "ปริญญาโท (กำลังศึกษาอยู่) - M.Ed. in Innovation, Technology, and Learning Sciences",
          school: "คณะศึกษาศาสตร์ มหาวิทยาลัยขอนแก่น",
          year: "2568 – ปัจจุบัน",
          details: ["ได้รับทุน สควค. (PSMT) รุ่นที่ 23 ตลอดหลักสูตร"],
        },
        {
          degree:
            "ปริญญาตรี - B.Sc. in Information and Communication Technology",
          school: "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
          year: "2564 – 2567",
          details: [
            "ระยะเวลาเรียน 3 ปีครึ่ง",
            "เกรดเฉลี่ยสะสมมากกว่า 3.00",
            "ได้รับทุน ต้นกล้าบานบุรี (TKBS) รุ่นที่ 4 ตลอดหลักสูตร",
          ],
        },
      ],
    },
    experience: {
      title: "ประสบการณ์ทำงานและกิจกรรม",
      items: [
        {
          role: "นักเรียนแลกเปลี่ยน โครงการ Cultural Exchange",
          place: "Guangdong University of Science and Technology (GDUT), จีน",
          year: "2025",
          details: [],
        },
        {
          role: "ผู้ช่วยสอน (Teacher Assistant) - 3 ปี",
          details: [
            "รายวิชา: Algorithm & Basic Programming (C/C#)",
            "Computer System Organization & Architecture",
            "Computer Network System",
            "Frontend Application Development",
          ],
        },
        {
          role: "อุปนายกฝ่ายกิจการพิเศษ",
          place: "สโมสรนักศึกษาคณะวิทยาศาสตร์ ม.อ.",
          details: [],
        },
        {
          role: "คะแนนสอบภาษาอังกฤษ",
          details: ["IELTS Overall Band Score: 5.5 (ปี 2024–2026)"],
        },
      ],
    },
    projects: {
      title: "Project Hub (ผลงานระบบ)",
      items: [
        {
          name: "ระบบฟอร์มชำระเงิน",
          url: "https://psf.codex-th.com/",
          icon: <CreditCard />,
          color: "bg-blue-500",
          desc: "Payment Service Form",
        },
        {
          name: "ระบบบันทึกการสังเกตการณ์สอน",
          url: "https://tol.codex-th.com/",
          icon: <FileText />,
          color: "bg-emerald-500",
          desc: "Teacher Observation Log",
        },
        {
          name: "ระบบเปรียบเทียบราคาสินค้า",
          url: "https://cpn.codex-th.com/",
          icon: <ShoppingCart />,
          color: "bg-orange-500",
          desc: "Price Comparison System",
        },
        {
          name: "ระบบจัดการคาบสอนพิเศษ",
          url: "https://tms.codex-th.com/",
          icon: <Calendar />,
          color: "bg-purple-500",
          desc: "Tutoring Management System",
        },
        {
          name: "ระบบจัดการผู้ใช้และการยืนยันตัวตน",
          url: "https://bbh.codex-th.com/",
          icon: <ShieldCheck />,
          color: "bg-rose-500",
          desc: "Auth & User Management",
        },
        {
          name: "ระบบช่วยเหลือผู้ประสบอุทกภัยสตูล",
          url: "https://satun-sos.codex-th.com/",
          icon: <LifeBuoy />,
          color: "bg-cyan-500",
          desc: "Satun Flood SOS System",
        },
      ],
    },
    contact: "ช่องทางการติดต่อ",
  },
  EN: {
    name: "Acting Sub-Lt. Na-thakorn Pikromsuk",
    role: "Full Stack Developer & Educator",
    education: {
      title: "Education",
      items: [
        {
          degree:
            "Master's Degree - M.Ed. in Innovation, Technology, and Learning Sciences",
          school: "Faculty of Education, Khon Kaen University",
          year: "2025 – Present",
          details: ["Recipient of the PSMT Scholarship (23rd batch)"],
        },
        {
          degree:
            "Bachelor's Degree - B.Sc. in Information and Communication Technology",
          school: "Prince of Songkla University, Hatyai Campus",
          year: "2021 – 2024",
          details: [
            "Completed in 3.5 years",
            "Cumulative GPA: over 3.00",
            "Awarded the Ton Kla Banburi Scholarship (TKBS)",
          ],
        },
      ],
    },
    experience: {
      title: "Experience",
      items: [
        {
          role: "Exchange Student - Cultural Exchange Program",
          place: "Guangdong University of Science and Technology (GDUT), China",
          year: "2025",
          details: [],
        },
        {
          role: "Teacher Assistant (3 Years Experience)",
          details: [
            "Courses: Algorithm & Basic Programming (C/C#)",
            "Computer System Organization & Architecture",
            "Computer Network System",
            "Frontend Application Development",
          ],
        },
        {
          role: "Vice President for Special Affairs",
          place: "Faculty of Science Student Club, PSU",
          details: [],
        },
        {
          role: "English Proficiency",
          details: ["IELTS Overall Band Score: 5.5 (2024–2026)"],
        },
      ],
    },
    projects: {
      title: "Project Hub",
      items: [
        {
          name: "Payment Service Form",
          url: "https://psf.codex-th.com/",
          icon: <CreditCard />,
          color: "bg-blue-500",
          desc: "System for handling payments",
        },
        {
          name: "Teacher Observation Log",
          url: "https://tol.codex-th.com/",
          icon: <FileText />,
          color: "bg-emerald-500",
          desc: "Observation recording tool",
        },
        {
          name: "Price Comparison System",
          url: "https://cpn.codex-th.com/",
          icon: <ShoppingCart />,
          color: "bg-orange-500",
          desc: "Compare product prices",
        },
        {
          name: "Tutoring Management System",
          url: "https://tms.codex-th.com/",
          icon: <Calendar />,
          color: "bg-purple-500",
          desc: "Manage class schedules",
        },
        {
          name: "Auth & User Management",
          url: "https://bbh.codex-th.com/",
          icon: <ShieldCheck />,
          color: "bg-rose-500",
          desc: "Centralized authentication",
        },
        {
          name: "Satun Flood SOS System",
          url: "https://satun-sos.codex-th.com/",
          icon: <LifeBuoy />,
          color: "bg-cyan-500",
          desc: "Emergency assistance tool",
        },
      ],
    },
    contact: "Contact",
  },
};

// --- Components ---

const GlassCard = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden rounded-2xl border border-white/40 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/60 shadow-lg backdrop-blur-md transition-all duration-500 hover:border-white/60 dark:hover:border-slate-600/60 hover:shadow-xl hover:shadow-[rgba(210,230,255,0.4)] dark:hover:shadow-[rgba(0,0,0,0.4)] ${className}`}
    onClick={onClick}
  >
    <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-white/40 dark:from-slate-700/40 to-transparent blur-2xl" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const TechBadge = ({ name, color }: { name: string; color: string }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm ring-1 ring-inset ${color} backdrop-blur-sm bg-opacity-10`}
  >
    {name}
  </span>
);

const InfiniteMarquee = () => {
  const stack = [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Node.js",
    "Supabase",
    "PostgreSQL",
    "Python",
    "C++",
    "Framer Motion",
    "TypeScript",
  ];

  return (
    <div className="relative flex w-full overflow-hidden py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#EBF4FF] dark:from-black to-transparent z-10 transition-colors duration-500"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#EBF4FF] dark:from-black to-transparent z-10 transition-colors duration-500"></div>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {[...stack, ...stack, ...stack].map((tech, i) => (
          <div
            key={i}
            className="mx-4 flex items-center gap-2 rounded-full border border-blue-100 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur-sm transition-colors duration-500"
          >
            <Code2 size={16} className="text-blue-500 dark:text-blue-400" />
            {tech}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Portfolio() {
  const [lang, setLang] = useState<Language>("TH");
  const [activeTab, setActiveTab] = useState<"education" | "experience">(
    "education"
  );
  const { theme } = useTheme();
  const c = contentData[lang];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#EBF4FF] dark:bg-black text-slate-700 dark:text-slate-200 selection:bg-blue-200 dark:selection:bg-blue-800 transition-colors duration-500">
      {/* --- Liquid Background Blobs --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none transition-colors duration-500">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 dark:bg-blue-500/20 blur-3xl animate-blob mix-blend-multiply dark:mix-blend-screen transition-colors duration-500" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-200/40 dark:bg-cyan-500/20 blur-3xl animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen transition-colors duration-500" />
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-purple-200/40 dark:bg-purple-500/20 blur-3xl animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen transition-colors duration-500" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* --- Header --- */}
        <header className="sticky top-4 z-50 mt-4 rounded-full border border-white/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-900/70 shadow-lg backdrop-blur-xl px-6 py-3 flex justify-between items-center transition-colors duration-500">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md">
              C
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Codex-TH
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "TH" ? "EN" : "TH")}
              className="flex items-center gap-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 px-3 py-1.5 text-sm font-medium hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors duration-300 border border-white/40 dark:border-slate-700/40 shadow-sm text-slate-700 dark:text-slate-200"
            >
              <Languages size={14} />
              {lang}
            </button>
          </div>
        </header>

        {/* --- Hero Section --- */}
        <section className="mt-16 mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block rounded-full bg-blue-50/80 dark:bg-blue-900/30 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4 border border-blue-100 dark:border-blue-800/50 shadow-sm transition-colors duration-500">
              {lang === "TH" ? "สวัสดีครับ 👋" : "Hello World 👋"}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-white mb-4 transition-colors duration-500">
              {c.name}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto mb-8 transition-colors duration-500">
              {c.role}
            </p>
          </motion.div>

          <InfiniteMarquee />
        </section>

        {/* --- Project Hub (Bento Grid) --- */}
        <section className="mb-20">
          <div className="flex items-center gap-2 mb-8">
            <Layout className="text-blue-500 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-500">
              {c.projects.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.projects.items.map((project, idx) => (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className="block group"
              >
                <GlassCard className="h-full p-6 flex flex-col justify-between">
                  <div>
                    <div
                      className={`h-12 w-12 rounded-2xl ${project.color} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div
                        className={`${project.color.replace(
                          "bg-",
                          "text-"
                        )} opacity-100`}
                      >
                        {React.cloneElement(
                          project.icon as React.ReactElement,
                          { size: 24 }
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 transition-colors duration-500">
                      {project.desc}
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Launch App <ExternalLink size={12} className="ml-1" />
                  </div>
                </GlassCard>
              </a>
            ))}
          </div>
        </section>

        {/* --- Profile Section (Tabs) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Contact & Social */}
          <GlassCard className="p-8 lg:col-span-1 h-fit">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 transition-colors duration-500">
              {c.contact}
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:nathakorn.phikromsuk@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors duration-300"
              >
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors duration-500">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium transition-colors duration-500">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-500">
                    nathakorn.phikromsuk@gmail.com
                  </p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors duration-300"
              >
                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors duration-500">
                  <Github size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium transition-colors duration-500">
                    GitHub
                  </p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-500">
                    @codex-th
                  </p>
                </div>
              </a>
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mt-6 shadow-lg shadow-blue-200 dark:shadow-blue-900/50">
                <p className="text-xs font-medium opacity-80 mb-1">Status</p>
                <p className="font-bold flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  Open for work
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Right: Resume Tabs */}
          <GlassCard className="p-6 lg:col-span-2 min-h-[500px]">
            {/* Tab Switcher */}
            <div className="flex gap-2 p-1 rounded-xl bg-slate-100/50 dark:bg-slate-700/50 mb-6 w-fit transition-colors duration-500">
              <button
                onClick={() => setActiveTab("education")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeTab === "education"
                    ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  <GraduationCap size={16} /> {c.education.title}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeTab === "experience"
                    ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Briefcase size={16} /> {c.experience.title}
                </span>
              </button>
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                {activeTab === "education" ? (
                  <motion.div
                    key="edu"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    {c.education.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative pl-8 border-l-2 border-blue-100 dark:border-blue-800 last:border-0 pb-2 transition-colors duration-500"
                      >
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-800 transition-colors duration-500"></div>
                        <h4 className="text-lg font-bold text-slate-800 dark:text-white transition-colors duration-500">
                          {item.degree}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-1 transition-colors duration-500">
                          {item.school}
                        </p>
                        <p className="text-sm text-slate-400 dark:text-slate-500 mb-3 transition-colors duration-500">
                          {item.year}
                        </p>
                        <ul className="space-y-1">
                          {item.details.map((d, i) => (
                            <li
                              key={i}
                              className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2 transition-colors duration-500"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600 flex-shrink-0 transition-colors duration-500"></span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="exp"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    {c.experience.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative pl-8 border-l-2 border-cyan-100 dark:border-cyan-800 last:border-0 pb-2 transition-colors duration-500"
                      >
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-cyan-500 ring-4 ring-white dark:ring-slate-800 transition-colors duration-500"></div>
                        <h4 className="text-lg font-bold text-slate-800 dark:text-white transition-colors duration-500">
                          {item.role}
                        </h4>
                        {item.place && (
                          <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-1 transition-colors duration-500">
                            {item.place}
                          </p>
                        )}
                        {item.year && (
                          <p className="text-sm text-slate-400 dark:text-slate-500 mb-3 transition-colors duration-500">
                            {item.year}
                          </p>
                        )}
                        <ul className="space-y-1 mt-2">
                          {item.details.map((d, i) => (
                            <li
                              key={i}
                              className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2 transition-colors duration-500"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600 flex-shrink-0 transition-colors duration-500"></span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </GlassCard>
        </section>

        {/* --- Footer --- */}
        <footer className="mt-20 text-center text-sm text-slate-400 dark:text-slate-500 transition-colors duration-500">
          <p>© 2025 Na-thakorn Pikromsuk. All Rights Reserved.</p>
          <p className="text-xs mt-1 opacity-60">
            Designed with Liquid Glass UI
          </p>
        </footer>
      </div>

      {/* CSS for custom animations defined in tailwind config mostly, but inline styles for blob animation */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
