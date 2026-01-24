import { useState, useEffect } from 'react';
import { supabase, Experience } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface ExperienceFormProps {
  experience: Experience | null;
  onClose: () => void;
  onSave: () => void;
}

export const ExperienceForm = ({ experience, onClose, onSave }: ExperienceFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    year: '',
    title_th: '',
    title_en: '',
    subtitle_th: '',
    subtitle_en: '',
    description_th: '',
    description_en: '',
    description_long_th: '',
    description_long_en: '',
    badge: '',
    images: [] as string[],
    order_index: 0,
    is_visible: true,
  });

  const [imagesInput, setImagesInput] = useState('');

  useEffect(() => {
    if (experience) {
      setFormData({
        year: experience.year,
        title_th: experience.title_th,
        title_en: experience.title_en,
        subtitle_th: experience.subtitle_th,
        subtitle_en: experience.subtitle_en,
        description_th: experience.description_th || '',
        description_en: experience.description_en || '',
        description_long_th: experience.description_long_th || '',
        description_long_en: experience.description_long_en || '',
        badge: experience.badge || '',
        images: experience.images || [],
        order_index: experience.order_index,
        is_visible: experience.is_visible,
      });
      setImagesInput((experience.images || []).join('\n'));
    }
  }, [experience]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setLoading(true);
    const files = Array.from(e.target.files);
    const newUrls: string[] = [];

    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `experience/${fileName}`;

        // Upload to 'images' bucket (public)
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload Error:', uploadError);
          // Try 'public' bucket if 'images' fails or handle error
           if (uploadError.message.includes("Bucket not found")) {
             toast.error("ไม่พบ Storage Bucket 'images' กรุณาสร้าง Bucket ก่อน");
             continue;
           }
           throw uploadError;
        }

        // Get Public URL
        const { data } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);
          
        if (data.publicUrl) {
          newUrls.push(data.publicUrl);
        }
      }

      if (newUrls.length > 0) {
        setImagesInput(prev => prev ? `${prev}\n${newUrls.join('\n')}` : newUrls.join('\n'));
        toast.success(`อัปโหลดรูปภาพ ${newUrls.length} รูปสำเร็จ`);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('การอัปโหลดรูปภาพล้มเหลว');
    } finally {
      setLoading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const processedImages = imagesInput
         .split(/[\n,]+/)
         .map(url => url.trim())
         .filter(url => url.length > 0);

      const dataToSave = {
        ...formData,
        description_long_th: formData.description_long_th || null,
        description_long_en: formData.description_long_en || null,
        badge: formData.badge || null,
        images: processedImages,
      };

      if (experience) {
        const { error } = await supabase
          .from('experience')
          .update(dataToSave)
          .eq('id', experience.id);

        if (error) throw error;
        toast.success('อัพเดทประสบการณ์สำเร็จ');
      } else {
        const { error } = await supabase
          .from('experience')
          .insert([dataToSave]);

        if (error) throw error;
        toast.success('เพิ่มประสบการณ์สำเร็จ');
      }

      onSave();
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('เกิดข้อผิดพลาดในการบันทึกประสบการณ์');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1E293B] border-slate-200 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle>{experience ? 'แก้ไขประสบการณ์' : 'เพิ่มประสบการณ์ใหม่'}</DialogTitle>
          <DialogDescription>
            กรอกข้อมูลประสบการณ์ ทั้งภาษาไทยและภาษาอังกฤษ
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="year">ปี/ช่วงเวลา *</Label>
            <Input
              id="year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="2023–2024"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title_th">ตำแหน่ง/กิจกรรม (ไทย) *</Label>
              <Input
                id="title_th"
                value={formData.title_th}
                onChange={(e) => setFormData({ ...formData, title_th: e.target.value })}
                placeholder="ผู้ช่วยสอน"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title_en">ตำแหน่ง/กิจกรรม (อังกฤษ) *</Label>
              <Input
                id="title_en"
                value={formData.title_en}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                placeholder="Teaching Assistant"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle_th">สถานที่/องค์กร (ไทย) *</Label>
            <Input
              id="subtitle_th"
              value={formData.subtitle_th}
              onChange={(e) => setFormData({ ...formData, subtitle_th: e.target.value })}
              placeholder="คณะวิทยาศาสตร์, มหาวิทยาลัยสงขลานครินทร์"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle_en">สถานที่/องค์กร (อังกฤษ) *</Label>
            <Input
              id="subtitle_en"
              value={formData.subtitle_en}
              onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
              placeholder="Faculty of Science, PSU"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description_th">รายละเอียด (ไทย)</Label>
            <Textarea
              id="description_th"
              value={formData.description_th}
              onChange={(e) => setFormData({ ...formData, description_th: e.target.value })}
              rows={3}
              placeholder="ผู้ช่วยสอน 3 ปี: C/C#, System Architecture, Network, Frontend Development"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description_en">รายละเอียด (อังกฤษ)</Label>
            <Textarea
              id="description_en"
              value={formData.description_en}
              onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
              rows={3}
              placeholder="3-year Teaching Assistant: C/C#, System Architecture, Network, Frontend Development"
            />
          </div>

          <div className="space-y-4 pt-2 border-t border-dashed border-slate-200">
             <div className="space-y-2">
              <Label htmlFor="description_long_th">รายละเอียดแบบยาว (ไทย) - แสดงใน Popup</Label>
              <Textarea
                id="description_long_th"
                value={formData.description_long_th}
                onChange={(e) => setFormData({ ...formData, description_long_th: e.target.value })}
                rows={5}
                placeholder="รายละเอียดเพิ่มเติมที่ต้องการแสดงเมื่อกดดู"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_long_en">รายละเอียดแบบยาว (อังกฤษ) - แสดงใน Popup</Label>
              <Textarea
                id="description_long_en"
                value={formData.description_long_en}
                onChange={(e) => setFormData({ ...formData, description_long_en: e.target.value })}
                rows={5}
                placeholder="Additional details shown in popup"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="badge">Badge (ถ้ามี)</Label>
              <Input
                id="badge"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Leadership, International, 3 Years"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order_index">ลำดับการแสดง</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">รูปภาพ (อัปโหลด หรือ ลิงก์ URL)</Label>
            
            <div className="flex gap-2 mb-2">
               <Input 
                 type="file" 
                 id="image_upload" 
                 multiple 
                 accept="image/*"
                 onChange={handleFileUpload}
                 className="cursor-pointer file:cursor-pointer"
               />
            </div>

            <Textarea
              id="images"
              value={imagesInput}
              onChange={(e) => setImagesInput(e.target.value)}
              rows={4}
              placeholder={`https://example.com/image1.jpg\nhttps://example.com/image2.jpg`}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              ใส่ URL ของรูปภาพที่จะแสดงใน Gallery
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_visible"
              checked={formData.is_visible}
              onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
            />
            <Label htmlFor="is_visible">แสดงบนเว็บไซต์</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {experience ? 'บันทึกการแก้ไข' : 'เพิ่มประสบการณ์'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
