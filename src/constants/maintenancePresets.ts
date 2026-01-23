export const MAITENANCE_PRESETS = {
  titles: [
    { en: 'Under Maintenance', th: 'ปิดปรับปรุงเว็บไซต์' },
    { en: 'System Upgrade', th: 'อัปเดตระบบ' },
    { en: 'Coming Soon', th: 'เร็วๆ นี้' },
    { en: 'Scheduled Maintenance', th: 'ปิดปรับปรุงตามกำหนดการ' }
  ],
  messages: [
    { en: 'Website is under maintenance...', th: 'เว็บไซต์กำลังปิดปรับปรุงชั่วคราว...' },
    { en: 'We are updating our servers...', th: 'เรากำลังอัปเดตเซิร์ฟเวอร์เพื่อประสิทธิภาพที่ดีขึ้น...' },
    { en: 'We are fixing some bugs...', th: 'เรากำลังแก้ไขข้อผิดพลาดบางอย่าง...' },
    { en: 'We will be back shortly...', th: 'เราจะกลับมาเปิดให้บริการในไม่ช้า...' }
  ],
  details: [
    { en: 'We apologize for the inconvenience. We are working hard to improve the system. Please come back later.', th: 'ขออภัยในความไม่สะดวก เรากำลังพัฒนาระบบเพื่อให้ดียิ่งขึ้น กรุณากลับมาใหม่ในภายหลัง' },
    { en: 'Please check back later.', th: 'กรุณากลับมาตรวจสอบใหม่ภายหลัง' },
    { en: 'Thank you for your patience.', th: 'ขอบคุณที่รอคอยและเข้าใจ' }
  ],
  durations: [
    { en: 'A few minutes', th: 'ไม่กี่นาที' },
    { en: '30 Minutes', th: '30 นาที' },
    { en: '1 Hour', th: '1 ชั่วโมง' },
    { en: '2 Hours', th: '2 ชั่วโมง' },
    { en: 'A few hours', th: 'ไม่กี่ชั่วโมง' },
    { en: '1 Day', th: '1 วัน' },
    { en: 'A few days', th: 'ไม่กี่วัน' },
    { en: '1 Week', th: '1 สัปดาห์' }
  ]
};

export const getMaintenanceTranslation = (text: string, lang: 'th' | 'en' = 'en') => {
  if (!text) return text;

  // Helper to find match in any category
  const findMatch = (list: { en: string, th: string }[]) => 
    list.find(item => item.en === text || item.th === text);

  const match = 
    findMatch(MAITENANCE_PRESETS.titles) ||
    findMatch(MAITENANCE_PRESETS.messages) ||
    findMatch(MAITENANCE_PRESETS.details) ||
    findMatch(MAITENANCE_PRESETS.durations);

  if (match) {
    return lang === 'th' ? match.th : match.en;
  }
  
  return text; // Return original if no match found (custom text)
};
