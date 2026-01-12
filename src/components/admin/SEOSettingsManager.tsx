import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Loader2, Save, Globe, Share2, Image as ImageIcon, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface SEOSettings {
  id?: string;
  page_name: string;
  meta_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  og_image: string;
  keywords: string;
}

const defaultPages = [
  { name: 'home', label: 'หน้าหลัก (Home)' },
  { name: 'projects', label: 'โปรเจกต์ (Projects)' },
  { name: 'about', label: 'เกี่ยวกับ (About)' },
  { name: 'contact', label: 'ติดต่อ (Contact)' },
];

export const SEOSettingsManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Record<string, SEOSettings>>({});
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    fetchSEOSettings();
  }, []);

  const fetchSEOSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*');

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching SEO settings:', error);
      }

      const settingsMap: Record<string, SEOSettings> = {};
      
      // Initialize with defaults
      defaultPages.forEach(page => {
        settingsMap[page.name] = {
          page_name: page.name,
          meta_title: '',
          meta_description: '',
          og_title: '',
          og_description: '',
          og_image: '',
          keywords: '',
        };
      });

      // Override with data from database
      if (data) {
        data.forEach((item: SEOSettings) => {
          settingsMap[item.page_name] = item;
        });
      }

      setSettings(settingsMap);
    } catch (error) {
      console.error('Error:', error);
      toast.error('ไม่สามารถโหลดข้อมูล SEO ได้');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (page: string, field: keyof SEOSettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      ...prev,
      [page]: {
        // eslint-disable-next-line security/detect-object-injection
        ...prev[page],
        [field]: value,
      },
    }));
  };

  const handleSave = async (pageName: string) => {
    setSaving(true);
    try {
      // eslint-disable-next-line security/detect-object-injection
      const pageSettings = settings[pageName];
      
      const { error } = await supabase
        .from('seo_settings')
        .upsert({
          page_name: pageName,
          meta_title: pageSettings.meta_title,
          meta_description: pageSettings.meta_description,
          og_title: pageSettings.og_title,
          og_description: pageSettings.og_description,
          og_image: pageSettings.og_image,
          keywords: pageSettings.keywords,
        }, {
          onConflict: 'page_name',
        });

      if (error) throw error;

      toast.success('บันทึกการตั้งค่า SEO สำเร็จ!');
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      toast.error('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // eslint-disable-next-line security/detect-object-injection
  const currentSettings = settings[activePage] || {
    page_name: activePage,
    meta_title: '',
    meta_description: '',
    og_title: '',
    og_description: '',
    og_image: '',
    keywords: '',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="bg-white dark:bg-[#1E293B] border-slate-200 dark:border-slate-700 shadow-sm">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30">
              <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-2xl gradient-text">SEO Settings</CardTitle>
              <CardDescription className="text-muted-foreground">
                ตั้งค่า Meta Tags และ Open Graph สำหรับ Social Sharing
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activePage} onValueChange={setActivePage}>
            <TabsList className="bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl mb-6">
              {defaultPages.map(page => (
                <TabsTrigger
                  key={page.name}
                  value={page.name}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 rounded-lg px-4"
                >
                  {page.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {defaultPages.map(page => (
              <TabsContent key={page.name} value={page.name} className="space-y-6">
                {/* Meta Tags Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Meta Tags
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="meta_title">Meta Title</Label>
                      <Input
                        id="meta_title"
                        placeholder="ชื่อหน้าที่จะแสดงใน Search Results"
                        value={currentSettings.meta_title}
                        onChange={(e) => handleChange(page.name, 'meta_title', e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800"
                      />
                      <p className="text-xs text-muted-foreground">
                        แนะนำ: 50-60 ตัวอักษร | ปัจจุบัน: {currentSettings.meta_title.length} ตัวอักษร
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <Textarea
                        id="meta_description"
                        placeholder="คำอธิบายสั้นๆ ที่จะแสดงใน Search Results"
                        value={currentSettings.meta_description}
                        onChange={(e) => handleChange(page.name, 'meta_description', e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 min-h-[80px]"
                      />
                      <p className="text-xs text-muted-foreground">
                        แนะนำ: 150-160 ตัวอักษร | ปัจจุบัน: {currentSettings.meta_description.length} ตัวอักษร
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords (คั่นด้วย comma)</Label>
                      <Input
                        id="keywords"
                        placeholder="portfolio, developer, projects, ..."
                        value={currentSettings.keywords}
                        onChange={(e) => handleChange(page.name, 'keywords', e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Open Graph Section */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Share2 className="w-5 h-5 text-purple-500" />
                    Open Graph (Social Sharing)
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="og_title">OG Title</Label>
                      <Input
                        id="og_title"
                        placeholder="ชื่อที่จะแสดงเมื่อแชร์บน Social Media"
                        value={currentSettings.og_title}
                        onChange={(e) => handleChange(page.name, 'og_title', e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="og_description">OG Description</Label>
                      <Textarea
                        id="og_description"
                        placeholder="คำอธิบายที่จะแสดงเมื่อแชร์บน Social Media"
                        value={currentSettings.og_description}
                        onChange={(e) => handleChange(page.name, 'og_description', e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="og_image">OG Image URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id="og_image"
                          placeholder="https://example.com/image.jpg"
                          value={currentSettings.og_image}
                          onChange={(e) => handleChange(page.name, 'og_image', e.target.value)}
                          className="bg-slate-50 dark:bg-slate-800 flex-1"
                        />
                        {currentSettings.og_image && (
                          <div className="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <img 
                              src={currentSettings.og_image} 
                              alt="OG Preview" 
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        แนะนำขนาด: 1200x630 pixels
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <ImageIcon className="w-5 h-5 text-orange-500" />
                    Preview
                  </div>
                  
                  {/* Google Search Preview */}
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-muted-foreground mb-2">Google Search Result Preview:</p>
                    <div className="space-y-1">
                      <p className="text-blue-600 dark:text-blue-400 text-lg hover:underline cursor-pointer truncate">
                        {currentSettings.meta_title || 'Page Title'}
                      </p>
                      <p className="text-green-700 dark:text-green-500 text-sm">
                        https://yoursite.com/{page.name === 'home' ? '' : page.name}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {currentSettings.meta_description || 'Meta description will appear here...'}
                      </p>
                    </div>
                  </div>

                  {/* Social Share Preview */}
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-muted-foreground mb-2">Social Media Share Preview:</p>
                    <div className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 max-w-sm">
                      {currentSettings.og_image ? (
                        <img 
                          src={currentSettings.og_image} 
                          alt="OG Preview" 
                          className="w-full h-40 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-40 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-slate-400" />
                        </div>
                      )}
                      <div className="p-3">
                        <p className="font-semibold text-sm truncate">
                          {currentSettings.og_title || currentSettings.meta_title || 'Page Title'}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {currentSettings.og_description || currentSettings.meta_description || 'Description...'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">yoursite.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => handleSave(page.name)}
                    disabled={saving}
                    className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold px-6"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    บันทึกการตั้งค่า
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};
