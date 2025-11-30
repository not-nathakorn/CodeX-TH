import { motion } from "framer-motion";
import { ModernNavigation } from "@/components/ModernNavigation";
import { ModernHero } from "@/components/ModernHero";
import { ModernProjectCard } from "@/components/ModernProjectCard";
import { ModernTimelineItem } from "@/components/ModernTimelineItem";
import { ModernFooter } from "@/components/ModernFooter";
import { Meteors } from "@/components/effects/Meteors";
import { Award, BookOpen, Globe, Mail, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { GlowingFeatures } from "@/components/GlowingFeatures";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { LineButton } from "@/components/LineButton";
import { MessageCircle } from "lucide-react";

const projects = [
  {
    title: "Payment Form System",
    descriptionTh: "ระบบแบบฟอร์มการชำระเงิน - จัดการและติดตามการชำระเงินออนไลน์",
    descriptionEn: "Payment form system - Manage and track online payments",
    url: "https://psf.codex-th.com/",
    icon: "💳",
    tags: ["Payment", "Forms", "Analytics"],
  },
  {
    title: "Teaching Observation Log",
    descriptionTh: "ระบบบันทึกการสังเกตการสอน - ติดตามและประเมินการสอนแบบเรียลไทม์",
    descriptionEn: "Teaching observation log system - Track and assess teaching in real-time",
    url: "https://tol.codex-th.com/",
    icon: "📚",
    tags: ["Education", "Tracking", "Assessment"],
  },
  {
    title: "Product Price Comparison",
    descriptionTh: "ระบบเปรียบเทียบราคาสินค้า - เปรียบเทียบราคาจากหลายแหล่ง",
    descriptionEn: "Product price comparison system - Compare prices from multiple sources",
    url: "https://cpn.codex-th.com/",
    icon: "💰",
    tags: ["E-commerce", "Comparison", "Analytics"],
  },
  {
    title: "Tutorial Management System",
    descriptionTh: "ระบบจัดการบทเรียน - สร้างและจัดการเนื้อหาการสอน",
    descriptionEn: "Tutorial management system - Create and manage teaching content",
    url: "https://tms.codex-th.com/",
    icon: "🎓",
    tags: ["LMS", "Content", "Education"],
  },
  {
    title: "User Management & Identity",
    descriptionTh: "ระบบจัดการผู้ใช้และยืนยันตัวตน - ยืนยันและจัดการข้อมูลผู้ใช้",
    descriptionEn: "User management & identity verification system",
    url: "https://bbh.codex-th.com/",
    icon: "🔐",
    tags: ["Auth", "Security", "Identity"],
  },
  {
    title: "Satun-SOS Flood Assistance",
    descriptionTh: "ระบบช่วยเหลือผู้ประสบภัยน้ำท่วมสตูล - ประสานงานและติดตามสถานการณ์",
    descriptionEn: "Satun flood relief system - Coordinate and track emergency situations",
    url: "https://satun-sos.codex-th.com/",
    icon: "🆘",
    tags: ["Emergency", "Relief", "Coordination"],
  },
];

const educationData = [
  /* {
    year: "2025–Present",
    titleTh: "ปริญญาโท การศึกษา",
    titleEn: "Master of Education",
    subtitleTh: "นวัตกรรม เทคโนโลยีและสื่อสารการศึกษา, มหาวิทยาลัยขอนแก่น",
    subtitleEn: "Innovation, Technology & Learning Sciences, Khon Kaen University",
    descriptionTh: "ทุน PSMT (สควค.) รุ่น 23 - เน้นการวิจัยและพัฒนานวัตกรรมทางการศึกษา",
    descriptionEn: "PSMT Scholar (สควค.) Cohort 23 - Focus on educational innovation research and development",
    badge: "In Progress",
  }, */
  {
    year: "2021–2024",
    titleTh: "ปริญญาตรี วิทยาศาสตร์",
    titleEn: "Bachelor of Science",
    subtitleTh: "เทคโนโลยีสารสนเทศและการสื่อสาร, มหาวิทยาลัยสงขลานครินทร์",
    subtitleEn: "Information & Communication Technology, Prince of Songkla University",
    descriptionTh: "GPA > 3.00 | ทุน TKBS รุ่น 4 - ทุนต้นกล้าบานบุรี",
    descriptionEn: "GPA > 3.00 | TKBS Scholar Cohort 4 - Tonkla Banburi Scholarship",
    badge: undefined,
  },
];

const experienceData = [
  {
    year: "2025",
    titleTh: "นักศึกษาแลกเปลี่ยนวัฒนธรรม",
    titleEn: "Cultural Exchange Student",
    subtitleTh: "Guangdong University of Technology, ประเทศจีน",
    subtitleEn: "Guangdong University of Technology, China",
    descriptionTh: "แลกเปลี่ยนวัฒนธรรมและเทคโนโลยีในประเทศจีน",
    descriptionEn: "Cultural and technology exchange program in China",
    badge: "International",
  },
  {
    year: "2025",
    titleTh: "English on Tour",
    titleEn: "English on Tour",
    subtitleTh: "Penang, มาเลเซีย",
    subtitleEn: "Penang, Malaysia",
    descriptionTh: "โครงการพัฒนาภาษาอังกฤษผ่านการท่องเที่ยวเชิงวัฒนธรรม",
    descriptionEn: "English language development program through cultural tourism",
  },
  {
    year: "2023–2024",
    titleTh: "ผู้ช่วยสอน",
    titleEn: "Teaching Assistant",
    subtitleTh: "คณะวิทยาศาสตร์, มหาวิทยาลัยสงขลานครินทร์",
    subtitleEn: "Faculty of Science, PSU",
    descriptionTh: "ผู้ช่วยสอน 3 ปี: C/C#, System Architecture, Network, Frontend Development",
    descriptionEn: "3-year Teaching Assistant: C/C#, System Architecture, Network, Frontend Development",
    badge: "3 Years",
  },
  {
    year: "2023",
    titleTh: "PSU Backpacking ASEAN",
    titleEn: "PSU Backpacking ASEAN",
    subtitleTh: "มาเลเซีย และ สิงคโปร์",
    subtitleEn: "Malaysia & Singapore",
    descriptionTh: "การเดินทางศึกษาดูงานและแลกเปลี่ยนวัฒนธรรมในอาเซียน",
    descriptionEn: "Educational tour and cultural exchange program in ASEAN",
  },
  {
    year: "2022–2023",
    titleTh: "อุปนายกฝ่ายกิจการพิเศษ",
    titleEn: "Vice President for Special Affairs",
    subtitleTh: "สโมสรนักศึกษาวิทยาศาสตร์, มหาวิทยาลัยสงขลานครินทร์",
    subtitleEn: "Science Student Club, PSU",
    descriptionTh: "อุปนายกฝ่ายกิจการพิเศษ - ดูแลโครงการและกิจกรรมพิเศษ",
    descriptionEn: "Vice President for Special Affairs - Oversee special projects and activities",
    badge: "Leadership",
  },
];

const skills = [
  "React & TypeScript",
  "System Architecture",
  "Frontend Development",
  "C/C# Programming",
  "Network Design",
  "Educational Technology",
  "Project Management",
  "Technical Teaching",
];

const Index = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen relative">
      <ModernNavigation />

      {/* Hero Section */}
      <ModernHero />

      {/* Projects Section */}
      <section id="projects" className="relative py-8 md:py-12 lg:py-16 px-4 overflow-hidden scroll-mt-40">
        <Meteors number={15} />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 pt-6"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-3 glass-strong rounded-full text-sm font-bold text-primary border border-primary/30 mb-4 leading-relaxed"
            >
              <AnimatedText>{t("nav.projects")}</AnimatedText>
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 gradient-text leading-loose py-4">
              <AnimatedText>{t("projects.title")}</AnimatedText>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              <AnimatedText block>{t("projects.description")}</AnimatedText>
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, index) => (
              <ModernProjectCard
                key={index}
                {...project}
                description={language === "th" ? project.descriptionTh : project.descriptionEn}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-8 md:py-12 lg:py-16 px-4 scroll-mt-40">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 pt-6"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-3 glass-strong rounded-full text-sm font-bold text-primary border border-primary/30 mb-4 leading-relaxed"
            >
              <AnimatedText>{t("nav.about")}</AnimatedText>
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 gradient-text leading-loose py-4">
              <AnimatedText>{t("about.title")}</AnimatedText>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-8 lg:p-12 border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              {language === 'th' ? (
                <div>
                  <h3 className="text-2xl font-bold mb-4 gradient-text"><AnimatedText>{t("about.thaiTitle")}</AnimatedText></h3>
                  <p className="text-foreground font-semibold mb-4"><AnimatedText>{t("about.thaiName")}</AnimatedText></p>
                  {/* <p className="text-muted-foreground leading-relaxed mb-4">
                    <AnimatedText block>{t("about.thaiDesc1")}</AnimatedText>
                  </p> */}
                  <p className="text-muted-foreground leading-relaxed">
                    <AnimatedText block>{t("about.thaiDesc2")}</AnimatedText>
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold mb-4 gradient-text"><AnimatedText>{t("about.englishTitle")}</AnimatedText></h3>
                  <p className="text-foreground font-semibold mb-4"><AnimatedText>{t("about.englishName")}</AnimatedText></p>
                  {/* <p className="text-muted-foreground leading-relaxed mb-4">
                    <AnimatedText block>{t("about.englishDesc1")}</AnimatedText>
                  </p> */}
                  <p className="text-muted-foreground leading-relaxed">
                    <AnimatedText block>{t("about.englishDesc2")}</AnimatedText>
                  </p>
                </div>
              )}
            </div>

            <div className="relative z-10 mt-8 pt-8 border-t border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-primary" />
                <h4 className="text-lg font-bold text-foreground"><AnimatedText>{t("about.englishProf")}</AnimatedText></h4>
              </div>
              <p className="text-muted-foreground">IELTS Overall Band 5.5 (Valid: 2024–2026)</p>
            </div>

            <div className="relative z-10 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h4 className="text-lg font-bold text-foreground"><AnimatedText>{t("about.skills")}</AnimatedText></h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="px-4 py-2 glass-strong rounded-full text-sm font-medium text-foreground border border-border/30 hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

            <div className="relative z-10 mt-12 flex justify-center">
              <ToolsShowcase />
            </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-8 md:py-12 lg:py-16 px-4 scroll-mt-40">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 pt-6"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-3 glass-strong rounded-full text-sm font-bold text-primary border border-primary/30 mb-4 leading-relaxed"
            >
              <AnimatedText>{t("services.title")}</AnimatedText>
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 gradient-text leading-loose py-4">
              <AnimatedText>{t("services.heading")}</AnimatedText>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              <AnimatedText block>{t("services.description")}</AnimatedText>
            </p>
          </motion.div>

          <GlowingFeatures />
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="relative py-8 md:py-12 lg:py-16 px-4 scroll-mt-40">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 pt-6"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-3 glass-strong rounded-full text-sm font-bold text-primary border border-primary/30 mb-4 leading-relaxed"
            >
              <AnimatedText>{t("nav.education")}</AnimatedText>
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 gradient-text leading-loose py-4">
              <AnimatedText>{t("education.title")}</AnimatedText>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg"><AnimatedText block>{t("education.description")}</AnimatedText></p>
          </motion.div>

          <div>
            {educationData.map((item, index) => (
              <ModernTimelineItem
                key={index}
                year={item.year}
                title={language === "th" ? item.titleTh : item.titleEn}
                subtitle={language === "th" ? item.subtitleTh : item.subtitleEn}
                description={language === "th" ? item.descriptionTh : item.descriptionEn}
                badge={item.badge}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-8 md:py-12 lg:py-16 px-4 scroll-mt-40">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 pt-6"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-3 glass-strong rounded-full text-sm font-bold text-primary border border-primary/30 mb-4 leading-relaxed"
            >
              <AnimatedText>{t("nav.experience")}</AnimatedText>
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 gradient-text leading-loose py-4">
              <AnimatedText>{t("experience.title")}</AnimatedText>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg"><AnimatedText block>{t("experience.description")}</AnimatedText></p>
          </motion.div>

          <div>
            {experienceData.map((item, index) => (
              <ModernTimelineItem
                key={index}
                year={item.year}
                title={language === "th" ? item.titleTh : item.titleEn}
                subtitle={language === "th" ? item.subtitleTh : item.subtitleEn}
                description={language === "th" ? item.descriptionTh : item.descriptionEn}
                badge={item.badge}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-8 md:py-12 lg:py-16 px-4 scroll-mt-40 overflow-hidden">
        <Meteors number={10} />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 pt-6"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-3 glass-strong rounded-full text-sm font-bold text-primary border border-primary/30 mb-4 leading-relaxed"
            >
              <AnimatedText>{t("nav.contact")}</AnimatedText>
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 gradient-text leading-loose py-4">
              <AnimatedText>{t("contact.title")}</AnimatedText>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg"><AnimatedText block>{t("contact.description")}</AnimatedText></p>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12 lg:p-16 border border-border/50 relative overflow-hidden"
          >
            {/* Animated background gradient */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 15, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            />

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Text & Status */}
              <div className="text-center lg:text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <AnimatedText>{t("contact.available")}</AnimatedText>
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black gradient-text leading-tight">
                  <AnimatedText>{t("contact.letsConnect")}</AnimatedText>
                </h3>

                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                  <AnimatedText block>{t("contact.message")}</AnimatedText>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <motion.a
                    href="mailto:contact@codex-th.com"
                    className="group px-6 py-3 rounded-xl font-bold bg-gradient-primary text-white inline-flex items-center gap-2 justify-center shadow-lg hover:shadow-2xl hover:shadow-primary/50 transition-all relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="w-5 h-5" />
                    <span><AnimatedText>{t("contact.emailMe")}</AnimatedText></span>
                  </motion.a>
                  
                  <CopyEmailButton t={t} />

                  <LineButton t={t} />

                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-6 py-3 rounded-xl font-bold glass-strong border border-border/50 hover:border-primary/50 inline-flex items-center gap-2 justify-center transition-all text-foreground"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <span>LinkedIn</span>
                  </motion.a>
                </div>
              </div>

              {/* Right Column: Visuals */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  {/* Globe Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Globe className="w-32 h-32 md:w-40 md:h-40 text-primary/80 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" strokeWidth={1} />
                  </div>
                  
                  {/* Orbiting Elements */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-8 h-8 glass rounded-full flex items-center justify-center border border-white/20 shadow-lg">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-8 h-8 glass rounded-full flex items-center justify-center border border-white/20 shadow-lg">
                      <Linkedin className="w-4 h-4 text-blue-600" />
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 glass rounded-full flex items-center justify-center border border-white/20 shadow-lg">
                      <MessageCircle className="w-4 h-4 text-green-500" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Footer */}
      <ModernFooter />
    </div>
  );
};

export default Index;
