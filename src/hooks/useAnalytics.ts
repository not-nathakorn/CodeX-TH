import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { UAParser } from 'ua-parser-js';

export const useAnalytics = () => {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    // ป้องกันการยิงซ้ำ
    if (lastPath.current === location.pathname) return;
    lastPath.current = location.pathname;

    const trackVisit = async () => {
      try {
        // 1. จัดการ Session ID (เก็บใน sessionStorage เพื่อจำว่าเป็น User คนเดิมจนกว่าจะปิด Browser)
        let sessionId = sessionStorage.getItem('analytics_session_id');
        if (!sessionId) {
          sessionId = crypto.randomUUID();
          sessionStorage.setItem('analytics_session_id', sessionId);
        }

        // 2. Parse User Agent
        const parser = new UAParser(navigator.userAgent);
        const result = parser.getResult();

        let deviceType = result.device.type || 'desktop';
        if (!result.device.type && window.innerWidth < 768) {
          deviceType = 'mobile';
        }

        // 3. หา Country จาก IP using fallback APIs
        let country = 'Thailand'; // Default
        
        // Try multiple geolocation APIs
        const geoApis = [
          { url: 'https://ipwho.is/', key: 'country' },
          { url: 'https://ip-api.com/json/', key: 'country' },
          { url: 'https://ipapi.co/json/', key: 'country_name' }
        ];
        
        for (const api of geoApis) {
          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 2000);
            
            const response = await fetch(api.url, { signal: controller.signal });
            clearTimeout(timeout);
            
            if (response.ok) {
              const data = await response.json();
              if (data[api.key]) {
                country = data[api.key];
                break; // Success, stop trying
              }
            }
          } catch {
            continue; // Try next API
          }
        }

        // 4. ส่งข้อมูล
        await supabase.from('website_visits').insert({
          page_path: location.pathname,
          referrer: document.referrer || 'Direct',
          user_agent: navigator.userAgent,
          device_type: deviceType,
          browser: result.browser.name || 'Unknown',
          os: result.os.name || 'Unknown',
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          country: country, // บันทึกประเทศ
          session_id: sessionId,
        });

        console.log('📊 Analytics tracked:', location.pathname, '| Country:', country);
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, [location]);
};
