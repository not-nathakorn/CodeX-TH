import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.error("404 Error: Non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return navigate("/");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EBF4FF] dark:bg-black transition-colors duration-500 p-6">
      <div className="max-w-3xl w-full">
        <Card className="glass p-8 text-center shadow-2xl">
          <CardContent>
            <div className="mb-6">
              <img
                src="/Logo.png"
                alt="Logo"
                className="mx-auto w-28 h-28 mb-4 object-contain"
                loading="lazy"
              />
              <h1 className="text-6xl font-extrabold tracking-tight mb-2">
                404
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-3">
                ขอโทษด้วย — ไม่พบหน้าที่คุณกำลังค้นหา
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                เส้นทาง: <span className="font-mono">{location.pathname}</span>
              </p>
            </div>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ค้นหาหน้าเว็บ หรือหัวข้อที่เกี่ยวข้อง..."
                    aria-label="ค้นหาหน้าเว็บ"
                    className="pr-12"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
                <Button type="submit" className="shine">
                  ค้นหา
                </Button>
              </div>
            </form>
            <div className="mt-8 flex justify-center">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="w-full max-w-xs"
              >
                ย้อนกลับ
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              ถ้าปัญหายังคงอยู่ โปรดแจ้งผู้ดูแลระบบพร้อม url นี้
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
