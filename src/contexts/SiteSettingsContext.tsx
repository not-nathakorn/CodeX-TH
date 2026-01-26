
import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { SiteSettings } from '@/types/database.types';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';

interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  refetch: () => Promise<void>;
}

const defaultSettings: SiteSettings = {
  id: '',
  site_name: 'CodeX',
  site_tagline: 'Developer Portfolio',
  contact_email: '',
  maintenance_mode: false,
  maintenance_message: 'เว็บไซต์กำลังปรับปรุง กรุณากลับมาใหม่ภายหลัง',
  maintenance_title: 'Under Maintenance',
  maintenance_detail: 'ขออภัยในความไม่สะดวก เรากำลังพัฒนาระบบเพื่อให้ดียิ่งขึ้น กรุณากลับมาใหม่ในภายหลัง',
  maintenance_duration: 'A few hours',
  google_analytics_id: '',
  available_for_work: true,
  social_linkedin: '',
  social_line: '',
  hero_image_url: '/Dev.png',
  created_at: '',
  updated_at: ''
};

const SiteSettingsContext = createContext<SiteSettingsContextType | null>(null);

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from localStorage if available
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const cached = localStorage.getItem('site_settings_cache');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn('Failed to parse site settings cache', e);
    }
    return defaultSettings;
  });

  // If we had cached data, start as not loading (stale-while-revalidate)
  // Otherwise, start as loading
  const [loading, setLoading] = useState(() => {
    return !localStorage.getItem('site_settings_cache');
  });

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (!error && data) {
        setSettings(data);
        // Update cache
        localStorage.setItem('site_settings_cache', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Listen for cross-tab updates (e.g. from Admin tab)
  useEffect(() => {
    const channel = new BroadcastChannel('site_settings_updates');
    channel.onmessage = () => {
      console.log('[Broadcast] Received update signal');
      fetchSettings();
    };
    return () => channel.close();
  }, [fetchSettings]);

  // Polling fallback to ensure freshness if Realtime fails
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSettings();
    }, 30000); // Poll every 30 seconds (reduced freq from 5s to save resources)
    return () => clearInterval(interval);
  }, [fetchSettings]);

  // Subscribe to realtime changes with aggressive update
  useSupabaseRealtime<SiteSettings>(
    'site_settings',
    (payload) => {
      console.log('[Realtime] Site settings event received:', payload);
      // Trigger a re-fetch to ensure we get the full valid data including new columns
      fetchSettings();
      
      if (payload.new) {
        // Optimistically merge, but trust fetchSettings for final truth
        const newSettings = { ...settings, ...(payload.new as SiteSettings) };
        setSettings(newSettings);
        localStorage.setItem('site_settings_cache', JSON.stringify(newSettings));
      }
    }
  );

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, refetch: fetchSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
