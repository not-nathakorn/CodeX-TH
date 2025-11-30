import { createContext, useContext, useState, useMemo, useCallback } from "react";

type Language = "th" | "en";

type TranslationNode = string | { [key: string]: TranslationNode };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  th: {
    nav: {
      home: "หน้าหลัก",
      projects: "โครงการ",
      about: "เกี่ยวกับ",
      education: "การศึกษา",
      experience: "ประสบการณ์",
      contact: "ติดต่อ",
    },
    viewProjects: "ดูโครงการ",
    getInTouch: "ติดต่อเรา",
    hero: {
      badge: "Portfolio + Project Hub",
      role: "นักพัฒนาระบบเว็บไซต์ Full-Stack",
      description: "นักศึกษาปริญญาโท มหาวิทยาลัยขอนแก่น | ทุน สควค. | สร้างระบบนวัตกรรมเพื่อการศึกษาและชุมชน",
    },
    projects: {
      title: "โครงการที่พัฒนา",
      description: "ระบบและแพลตฟอร์มที่ผมได้พัฒนาเพื่อแก้ปัญหาในโลกจริง",
    },
    about: {
      title: "เกี่ยวกับฉัน",
      thaiTitle: "ภาษาไทย",
      englishTitle: "English",
      thaiName: "ว่าที่ ร้อยตรี ณฐกร พิกรมสุข",
      thaiDesc1: "นักศึกษาปริญญาโท สาขานวัตกรรม เทคโนโลยีและสื่อสารการศึกษา มหาวิทยาลัยขอนแก่น ได้รับทุนพัฒนาครูวิทยาศาสตร์คณิตศาสตร์และเทคโนโลยี (สควค.) รุ่น 23",
      thaiDesc2: "สำเร็จการศึกษา วท.บ. เทคโนโลยีสารสนเทศและการสื่อสาร (ICT) ม.อ. หาดใหญ่ เน้นการพัฒนาแอปพลิเคชัน, การออกแบบ UX/UI, การจัดการข้อมูล และนวัตกรรม ผ่านการเรียนรู้แบบลงมือปฏิบัติจริง (Active & Project-based Learning)",
      englishName: "Acting Sub-Lieutenant Na-thakorn Pikromsuk",
      englishDesc1: "M.Ed. student in Innovation, Technology & Learning Sciences at Khon Kaen University, PSMT Scholar (สควค.) Cohort 23",
      englishDesc2: "Graduated with a B.Sc. in ICT from PSU Hat Yai. Specialized in Application Development, UX/UI Design, Data Management, and Innovation through Active and Project-based Learning.",
      skills: "ทักษะและความเชี่ยวชาญ",
      englishProf: "ความสามารถทางภาษาอังกฤษ",
    },
    education: {
      title: "การศึกษา",
      description: "เส้นทางการศึกษาและความสำเร็จ",
    },
    experience: {
      title: "ประสบการณ์",
      description: "กิจกรรมด้านวิชาชีพและหลักสูตร",
    },
    contact: {
      title: "ติดต่อเรา",
      description: "ติดต่อเพื่อความร่วมมือหรือสอบถามข้อมูล",
      letsConnect: "มาเชื่อมต่อกัน",
      message: "สนใจร่วมงาน สอบถามโครงการ หรือแค่อยากทักทายก็ได้ครับ ผมพร้อมรับฟังโอกาสและไอเดียใหม่ๆ เสมอ",
      emailMe: "ส่งอีเมล",
      available: "พร้อมรับงาน",
      copyEmail: "คัดลอกอีเมล",
      copied: "คัดลอกแล้ว!",
      lineUnavailable: "ยังไม่เปิดให้บริการ",
      linePopupTitle: "ขออภัย",
      linePopupMessage: "ช่องทางติดต่อนี้ยังไม่พร้อมให้บริการ",
    },
    services: {
      title: "ความถนัด",
      heading: "สิ่งที่ผมทำ",
      description: "มุ่งเน้นการพัฒนาผลงานที่มีคุณภาพ ใส่ใจในรายละเอียด ความปลอดภัย และประสบการณ์การใช้งานที่ดี",
      features: {
        fullstack: {
          title: "Full Stack Development",
          description: "พัฒนาเว็บแอปพลิเคชันด้วยเทคโนโลยีสมัยใหม่ เช่น React, Next.js และ Node.js"
        },
        architecture: {
          title: "สถาปัตยกรรมระบบ",
          description: "วางโครงสร้างระบบให้มีประสิทธิภาพ ดูแลรักษาง่าย และรองรับการขยายตัวในอนาคต"
        },
        security: {
          title: "ให้ความสำคัญกับความปลอดภัย",
          description: "คำนึงถึงความปลอดภัยของข้อมูลและการทำงานของระบบตามมาตรฐานความปลอดภัย"
        },
        uiux: {
          title: "ออกแบบ UI/UX ที่ใช้งานง่าย",
          description: "สร้างหน้าเว็บที่สวยงามและใช้งานสะดวก โดยคำนึงถึงประสบการณ์ของผู้ใช้งานเป็นหลัก"
        },
        seo: {
          title: "รองรับ SEO",
          description: "ปรับปรุงโครงสร้างเว็บไซต์ให้รองรับการค้นหา (SEO) เพื่อให้เข้าถึงเนื้อหาได้ง่ายขึ้น"
        }
      }
    },
    tools: {
      title: "เครื่องมือและเทคโนโลยี",
      description: "รวบรวมเครื่องมือและเทคโนโลยีที่มีประสิทธิภาพที่ผมใช้เพื่อสร้างสรรค์นวัตกรรม",
    },
    footer: {
      rights: "สงวนลิขสิทธิ์",
      built: "สร้างด้วย React, TypeScript & Modern UI Effects",
    },
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      education: "Education",
      experience: "Experience",
      contact: "Contact",
    },
    viewProjects: "View Projects",
    getInTouch: "Get in Touch",
    hero: {
      badge: "Portfolio + Project Hub",
      role: "Full-Stack Developer",
      description: "M.Ed. Student @ KKU | PSMT Scholar | Building innovative systems for education and community",
    },
    projects: {
      title: "Projects",
      description: "Systems and platforms I've developed to solve real-world problems",
    },
    about: {
      title: "About Me",
      thaiTitle: "ภาษาไทย",
      englishTitle: "English",
      thaiName: "ว่าที่ ร้อยตรี ณฐกร พิกรมสุข",
      thaiDesc1: "นักศึกษาปริญญาโท สาขานวัตกรรม เทคโนโลยีและสื่อสารการศึกษา มหาวิทยาลัยขอนแก่น ได้รับทุนพัฒนาครูวิทยาศาสตร์คณิตศาสตร์และเทคโนโลยี (สควค.) รุ่น 23",
      thaiDesc2: "สำเร็จการศึกษา วท.บ. เทคโนโลยีสารสนเทศและการสื่อสาร (ICT) ม.อ. หาดใหญ่ เน้นการพัฒนาแอปพลิเคชัน, การออกแบบ UX/UI, การจัดการข้อมูล และนวัตกรรม ผ่านการเรียนรู้แบบลงมือปฏิบัติจริง (Active & Project-based Learning)",
      englishName: "Acting Sub-Lieutenant Na-thakorn Pikromsuk",
      englishDesc1: "M.Ed. student in Innovation, Technology & Learning Sciences at Khon Kaen University, PSMT Scholar (สควค.) Cohort 23",
      englishDesc2: "Graduated with a B.Sc. in ICT from PSU Hat Yai. Specialized in Application Development, UX/UI Design, Data Management, and Innovation through Active and Project-based Learning.",
      skills: "Skills & Expertise",
      englishProf: "English Proficiency",
    },
    education: {
      title: "Education",
      description: "Academic journey and achievements",
    },
    experience: {
      title: "Experience",
      description: "Professional and extracurricular activities",
    },
    contact: {
      title: "Get in Touch",
      description: "Feel free to reach out for collaborations or inquiries",
      letsConnect: "Let's Connect",
      message: "Interested in collaboration, project inquiries, or just want to say hello? I'm always open to discussing new opportunities and ideas.",
      emailMe: "Email Me",
      available: "Available for Work",
      copyEmail: "Copy Email",
      copied: "Copied!",
      lineUnavailable: "Not Available Yet",
      linePopupTitle: "Notice",
      linePopupMessage: "This contact channel is not available yet.",
    },
    services: {
      title: "Expertise",
      heading: "What I Do",
      description: "Passionate about building quality software with a focus on performance, security, and user experience.",
      features: {
        fullstack: {
          title: "Full Stack Development",
          description: "Developing scalable web applications using modern technologies like React, Next.js, and Node.js."
        },
        architecture: {
          title: "System Architecture",
          description: "Designing clean and maintainable system architectures for better performance and reliability."
        },
        security: {
          title: "Security Conscious",
          description: "Prioritizing security best practices to protect data and ensure system integrity."
        },
        uiux: {
          title: "User-Centric Design",
          description: "Crafting intuitive and aesthetic user interfaces with a focus on accessibility."
        },
        seo: {
          title: "SEO Friendly",
          description: "Structuring websites to be search-engine friendly for better visibility."
        }
      }
    },
    tools: {
      title: "Tools & Technologies",
      description: "A collection of powerful tools and technologies I use to build innovative solutions.",
    },
    footer: {
      rights: "All rights reserved",
      built: "Built with React, TypeScript & Modern UI Effects",
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language;
    return saved || "en";
  });

  const t = useCallback((key: string): string => {
    const keys = key.split(".");
    let value: TranslationNode | undefined = translations[language] as TranslationNode;
    
    for (const k of keys) {
      if (typeof value === "object" && value !== null) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }
    
    return typeof value === "string" ? value : key;
  }, [language]);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  }, []);

  const value = useMemo(() => ({ language, setLanguage: handleSetLanguage, t }), [language, handleSetLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
