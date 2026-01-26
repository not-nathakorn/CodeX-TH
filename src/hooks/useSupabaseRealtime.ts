import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';


/**
 * Custom hook for subscribing to Supabase Realtime changes
 * ใช้สำหรับ auto-refresh data เมื่อ Admin ทำการเปลี่ยนแปลงใน database
 * 
 * @param tableName - ชื่อ table ที่ต้องการ subscribe
 * @param onUpdate - callback function เมื่อมีการเปลี่ยนแปลง
 * @param options - options เพิ่มเติม
 */
interface UseRealtimeOptions {
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  schema?: string;
  filter?: string;
  enabled?: boolean;
}

export function useSupabaseRealtime<T>(
  tableName: string,
  onUpdate: (payload: { eventType: string; new: T | null; old: T | null }) => void,
  options: UseRealtimeOptions = {}
) {
  const { event = '*', schema = 'public', filter, enabled = true } = options;
  const [isConnected, setIsConnected] = useState(false);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  // Use a ref to track the latest onUpdate callback
  // This prevents the subscription effect from re-running when the callback function identity changes
  const onUpdateRef = useRef(onUpdate);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    if (!enabled) return;

    const channelName = `realtime-${tableName}-${Date.now()}`;
    
    // Explicitly create the channel first
    const channelInstance = supabase.channel(channelName);
    
    const subscription = channelInstance
      .on(
        'postgres_changes',
        {
          event,
          schema,
          table: tableName,
          ...(filter && { filter }),
        },
        (payload: { eventType: string; new: T | null; old: T | null; [key: string]: unknown }) => {
          console.log(`[Realtime] ${tableName} updated:`, payload.eventType);
          onUpdateRef.current({
            eventType: payload.eventType,
            new: payload.new,
            old: payload.old,
          });
        }
      )
      .subscribe((status) => {
        console.log(`[Realtime] ${tableName} subscription status:`, status);
        setIsConnected(status === 'SUBSCRIBED');
      });

    setChannel(subscription);

    return () => {
      console.log(`[Realtime] Unsubscribing from ${tableName}`);
      supabase.removeChannel(subscription);
      setIsConnected(false);
    };
  }, [tableName, event, schema, filter, enabled]);

  const unsubscribe = useCallback(() => {
    if (channel) {
      supabase.removeChannel(channel);
      setChannel(null);
      setIsConnected(false);
    }
  }, [channel]);

  return { isConnected, unsubscribe };
}

/**
 * Hook สำหรับดึงข้อมูลพร้อม auto-refresh
 * ใช้สำหรับ data ที่ต้องการ update อัตโนมัติเมื่อ Admin เปลี่ยนแปลง
 */
export function useRealtimeData<T>(
  tableName: string,
  fetchFn: () => Promise<T>,
  options: UseRealtimeOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchFn();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Subscribe to realtime updates
  const { isConnected } = useSupabaseRealtime(
    tableName,
    () => {
      // Re-fetch data when table changes
      fetchData();
    },
    options
  );

  return { data, loading, error, refetch: fetchData, isConnected };
}

/**
 * Hook สำหรับ Map Settings โดยเฉพาะ
 * ใช้ใน ThailandEducationMap component
 */
export function useMapSettings() {
  const [mapVisible, setMapVisible] = useState(true);
  const [enabledUniversities, setEnabledUniversities] = useState<string[]>([
    'north', 'northeast', 'central', 'south'
  ]);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('map_settings')
        .select('*')
        .single();

      if (!error && data) {
        setMapVisible(data.is_visible);
        setEnabledUniversities(data.enabled_universities || []);
      }
    } catch (error) {
      console.error('Error fetching map settings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Subscribe to realtime changes
  useSupabaseRealtime<{ is_visible: boolean; enabled_universities: string[] }>(
    'map_settings',
    (payload) => {
      if (payload.new) {
        console.log('[Realtime] Map settings updated:', payload.new);
        setMapVisible(payload.new.is_visible);
        setEnabledUniversities(payload.new.enabled_universities || []);
      }
    }
  );

  return { mapVisible, enabledUniversities, loading, refetch: fetchSettings };
}


