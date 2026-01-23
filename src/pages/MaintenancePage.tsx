import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Hammer, Wrench, Clock, ArrowLeft, Mail, 
  Copy, Check, Linkedin, Globe, MessageCircle, Code
} from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { getMaintenanceTranslation } from "@/constants/maintenancePresets";

interface MaintenancePageProps {
  title?: string;
  message?: string;
  detail?: string;
  duration?: string;
  availableForWork?: boolean;
  contactEmail?: string;
  socialLine?: string;
  socialLinkedin?: string;
}

const MaintenancePage = ({ 
  title,
  message, 
  detail,
  duration,
  availableForWork = true,
  contactEmail,
  socialLine,
  socialLinkedin
}: MaintenancePageProps) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const displayEmail = contactEmail || "contact@codex.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(displayEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto w-24 h-24 mb-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl opacity-20 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Wrench className="w-12 h-12 text-slate-700 dark:text-slate-200" />
            <motion.div
              animate={{ rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -right-2 -top-2"
            >
              <Hammer className="w-8 h-8 text-orange-500" />
            </motion.div>
            


          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-4 h-4 bg-yellow-500 rounded-full shadow-[0_0_12px_rgba(234,179,8,0.6)]"
          />
          <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            {getMaintenanceTranslation(title || "Under Maintenance", language)}
          </h1>
        </div>
        
        <div className="space-y-4 mb-8">
          <p className="text-xl font-medium text-slate-700 dark:text-slate-200">
            {getMaintenanceTranslation(message || "We are currently improving our website.", language)}
          </p>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {getMaintenanceTranslation(detail || "ขออภัยในความไม่สะดวก เรากำลังพัฒนาระบบเพื่อให้ดียิ่งขึ้น กรุณากลับมาใหม่ในภายหลัง", language)}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>Estimated time: {getMaintenanceTranslation(duration || "A few hours", language)}</span>
            </div>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex justify-center"
        >
          <Dialog>
            <DialogTrigger asChild>
              <button 
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm hover:bg-white dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group shadow-sm"
              >
                  <Mail className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span>{language === 'th' ? 'ติดต่อเรา' : 'Contact Support'}</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[900px] p-0 overflow-hidden bg-white dark:bg-slate-900 border-none shadow-2xl rounded-3xl gap-0">
              <div className="grid md:grid-cols-2 h-full min-h-[450px]">
                {/* Left Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
                    
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold w-fit mb-6 ${
                      availableForWork 
                        ? "bg-[#E6F6EC] dark:bg-emerald-500/10 text-[#1D9F57] dark:text-emerald-400" 
                        : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        availableForWork 
                          ? "bg-[#1D9F57] dark:bg-emerald-500" 
                          : "bg-red-500 animate-pulse"
                      }`}></div>
                      {availableForWork ? "Available for Work" : "Not Available for Work"}
                    </div>
                    
                    <DialogTitle className="text-[40px] font-bold text-slate-900 dark:text-white mb-4 leading-tight tracking-tight">
                      Let&apos;s <span className="text-blue-500">Connect</span>
                    </DialogTitle>
                    
                    <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed text-[16px]">
                      {language === 'th' 
                        ? 'สนใจร่วมงาน สอบถามข้อมูลโปรเจกต์ หรือแวะมาทักทาย? ผมพร้อมเสมอสำหรับการพูดคุยถึงโอกาสและไอเดียใหม่ๆ'
                        : "Interested in collaboration, project inquiries, or just want to say hello? I'm always open to discussing new opportunities and ideas."}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <a href={`mailto:${displayEmail}`} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white text-[15px] font-semibold transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5">
                          <Mail className="w-5 h-5" />
                          Email Me
                      </a>
                      
                      <button onClick={handleCopy} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 text-[15px] font-medium transition-all hover:bg-slate-50 dark:hover:bg-slate-700">
                          {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                          {copied ? (language === 'th' ? 'คัดลอกแล้ว' : 'Copied') : (language === 'th' ? 'คัดลอกอีเมล' : 'Copy Email')}
                      </button>
                      
                      <div className="flex gap-2">
                        {socialLine && (
                          <a href={socialLine} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-[50px] h-[50px] rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-[#00B900] hover:text-white transition-all">
                              <MessageCircle className="w-5 h-5" />
                          </a>
                        )}
                        {socialLinkedin && (
                          <a href={socialLinkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-[50px] h-[50px] rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-[#0077B5] hover:text-white transition-all">
                              <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                </div>

                {/* Right Visual */}
                <div className="bg-[#EAF5FF] dark:bg-slate-800/50 relative overflow-hidden flex items-center justify-center min-h-[200px] md:min-h-full">
                    {/* Globe */}
                    <div className="relative w-72 h-72 text-[#BFDBFE] dark:text-slate-700 select-none">
                       <Globe className="w-full h-full opacity-100" strokeWidth={0.8} />
                    </div>

                     {/* Floating Cards */}
                    <motion.div 
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-[25%] right-[20%] w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center text-blue-500"
                    >
                        <Code className="w-6 h-6" />
                    </motion.div>

                    <motion.div 
                      animate={{ y: [5, -5, 5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute bottom-[25%] left-[20%] w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center text-emerald-500"
                    >
                        <Mail className="w-6 h-6" />
                    </motion.div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <div className="mt-12 text-xs text-slate-400 dark:text-slate-600">
           &copy; 2025 Na-thakorn Phikromsuk. All rights reserved.
        </div>
      </motion.div>
    </div>
  );
};

export default MaintenancePage;
