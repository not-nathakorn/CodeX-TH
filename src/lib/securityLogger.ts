/**
 * Security Logger Utility
 * Logs login activity and unauthorized access attempts to the database
 */

import { supabase } from './supabase';

// Parse user agent to get device and browser info
const parseUserAgent = (userAgent: string) => {
  let device = 'Unknown';
  let browser = 'Unknown';

  // Detect device
  if (/mobile/i.test(userAgent)) {
    device = 'Mobile';
  } else if (/tablet/i.test(userAgent)) {
    device = 'Tablet';
  } else {
    device = 'Desktop';
  }

  // Detect browser
  if (/chrome/i.test(userAgent) && !/edge/i.test(userAgent)) {
    browser = 'Chrome';
  } else if (/firefox/i.test(userAgent)) {
    browser = 'Firefox';
  } else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
    browser = 'Safari';
  } else if (/edge/i.test(userAgent)) {
    browser = 'Edge';
  } else if (/opera|opr/i.test(userAgent)) {
    browser = 'Opera';
  }

  return { device, browser };
};

// Cache for location to avoid rate limits
let cachedLocation: { ip: string; location: string; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Get client IP (best effort - may be masked by proxies)
const getClientIP = async (): Promise<string> => {
  // Check cache first
  if (cachedLocation && Date.now() - cachedLocation.timestamp < CACHE_DURATION) {
    return cachedLocation.ip;
  }
  
  try {
    // Try multiple APIs as fallback
    const apis = [
      'https://api.ipify.org?format=json',
      'https://api64.ipify.org?format=json'
    ];
    
    for (const api of apis) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(api, { signal: controller.signal });
        clearTimeout(timeout);
        
        if (response.ok) {
          const data = await response.json();
          return data.ip || 'Unknown';
        }
      } catch {
        continue;
      }
    }
    return 'Unknown';
  } catch {
    return 'Unknown';
  }
};

// Get location from IP using multiple fallback APIs
const getLocationFromIP = async (ip: string): Promise<string> => {
  // Check cache first
  if (cachedLocation && cachedLocation.ip === ip && Date.now() - cachedLocation.timestamp < CACHE_DURATION) {
    return cachedLocation.location;
  }
  
  if (ip === 'Unknown' || ip === '127.0.0.1' || ip === 'localhost') {
    return 'Local';
  }
  
  // Try multiple geolocation APIs
  const geoApis = [
    {
      url: `https://ipwho.is/${ip}`,
      parse: (data: Record<string, unknown>) => data.success !== false && data.city ? `${data.city}, ${data.country}` : null
    },
    {
      url: `https://ipapi.co/${ip}/json/`,
      parse: (data: Record<string, unknown>) => data.city && data.country_name ? `${data.city}, ${data.country_name}` : null
    },
    {
      url: `https://ip-api.com/json/${ip}`,
      parse: (data: Record<string, unknown>) => data.status === 'success' && data.city ? `${data.city}, ${data.country}` : null
    }
  ];
  
  for (const api of geoApis) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(api.url, { signal: controller.signal });
      clearTimeout(timeout);
      
      if (response.ok) {
        const data = await response.json();
        const location = api.parse(data);
        if (location) {
          // Cache the result
          cachedLocation = { ip, location, timestamp: Date.now() };
          return location;
        }
      }
    } catch {
      continue; // Try next API
    }
  }
  
  return 'Unknown';
};

export interface LoginActivityData {
  userId?: string;
  email: string;
  status: 'success' | 'failed' | 'unauthorized';
}

/**
 * Log login activity to the database using RPC
 */
export const logLoginActivity = async (data: LoginActivityData): Promise<void> => {
  try {
    const userAgent = navigator.userAgent;
    const { device, browser } = parseUserAgent(userAgent);
    const ip = await getClientIP();
    const location = await getLocationFromIP(ip);

    const { error } = await supabase.rpc('log_login_activity', {
      p_user_id: data.userId || null,
      p_email: data.email,
      p_status: data.status,
      p_ip_address: ip,
      p_user_agent: userAgent,
      p_device: device,
      p_browser: browser,
      p_location: location,
    });

    if (error) {
      console.error('Failed to log login activity:', error);
    } else {
      console.log(`📝 Login activity logged: ${data.status} for ${data.email}`);
    }
  } catch (error) {
    console.error('Error logging login activity:', error);
  }
};

/**
 * Log unauthorized access attempt
 */
export const logUnauthorizedAccess = async (attemptedPath: string): Promise<void> => {
  try {
    const userAgent = navigator.userAgent;
    const { device, browser } = parseUserAgent(userAgent);
    const ip = await getClientIP();
    const location = await getLocationFromIP(ip);

    const { error } = await supabase.rpc('log_login_activity', {
      p_user_id: null,
      p_email: `Attempted: ${attemptedPath}`,
      p_status: 'unauthorized',
      p_ip_address: ip,
      p_user_agent: userAgent,
      p_device: device,
      p_browser: browser,
      p_location: location,
    });

    if (error) {
      console.error('Failed to log unauthorized access:', error);
    } else {
      console.warn(`⚠️ Unauthorized access attempt logged: ${attemptedPath} from ${ip}`);
    }
  } catch (error) {
    console.error('Error logging unauthorized access:', error);
  }
};

/**
 * Create or update active session using RPC
 */
export const createActiveSession = async (userId: string): Promise<string | null> => {
  try {
    const userAgent = navigator.userAgent;
    const { device, browser } = parseUserAgent(userAgent);
    const ip = await getClientIP();
    const location = await getLocationFromIP(ip);
    const sessionToken = crypto.randomUUID();

    const { error } = await supabase.rpc('create_session', {
      p_user_id: userId,
      p_session_token: sessionToken,
      p_device: device,
      p_browser: browser,
      p_ip_address: ip,
      p_location: location,
    });

    if (error) {
      console.error('Failed to create session:', error);
      return null;
    }

    return sessionToken;
  } catch (error) {
    console.error('Error creating session:', error);
    return null;
  }
};

/**
 * Clear old login activity records
 */
export const clearOldLoginActivity = async (daysOld: number = 30): Promise<number> => {
  try {
    const { data, error } = await supabase.rpc('clear_old_login_activity', {
      p_days_old: daysOld
    });

    if (error) {
      console.error('Failed to clear old login activity:', error);
      return 0;
    }

    return data || 0;
  } catch (error) {
    console.error('Error clearing old login activity:', error);
    return 0;
  }
};

/**
 * Clear old sessions
 */
export const clearOldSessions = async (daysOld: number = 7): Promise<number> => {
  try {
    const { data, error } = await supabase.rpc('clear_old_sessions', {
      p_days_old: daysOld
    });

    if (error) {
      console.error('Failed to clear old sessions:', error);
      return 0;
    }

    return data || 0;
  } catch (error) {
    console.error('Error clearing old sessions:', error);
    return 0;
  }
};

/**
 * Update session last active time
 */
export const updateSessionActivity = async (sessionToken: string): Promise<void> => {
  try {
    await supabase
      .from('active_sessions')
      .update({ last_active: new Date().toISOString() })
      .eq('session_token', sessionToken);
  } catch (error) {
    console.error('Error updating session activity:', error);
  }
};

/**
 * End session (logout)
 */
export const endSession = async (sessionToken: string): Promise<void> => {
  try {
    await supabase
      .from('active_sessions')
      .delete()
      .eq('session_token', sessionToken);
  } catch (error) {
    console.error('Error ending session:', error);
  }
};

/**
 * End all sessions for a user
 */
export const endAllSessions = async (userId: string): Promise<void> => {
  try {
    await supabase
      .from('active_sessions')
      .delete()
      .eq('user_id', userId);
  } catch (error) {
    console.error('Error ending all sessions:', error);
  }
};
