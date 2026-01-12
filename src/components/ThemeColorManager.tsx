import { useLayoutEffect } from 'react';
import { useTheme } from './theme-provider';

export function ThemeColorManager() {
  const { theme } = useTheme();

  useLayoutEffect(() => {
    const updateThemeColor = () => {
      // 1. Determine the active theme (light/dark)
      let activeTheme = theme;
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        activeTheme = systemTheme;
      }

      // 2. Define exact colors
      const lightColor = '#EBF4FF';
      const darkColor = '#000000';
      const color = activeTheme === 'dark' ? darkColor : lightColor;

      // 3. Update meta tag for theme-color (Aggressive replacement for Safari)
      // Remove ALL existing tags to prevent conflicts or stale values
      const existingMetas = document.querySelectorAll('meta[name="theme-color"]');
      existingMetas.forEach(m => m.remove());

      // Create fresh tag
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.head.appendChild(meta);

      // 4. Force HTML background color (Safari Overscroll / Fallback)
      document.documentElement.style.backgroundColor = color;
      
      // 5. Force Body background color (Double insurance for Safari Edge)
      document.body.style.backgroundColor = color;
    };

    // Run immediately
    updateThemeColor();

    // Listen for system changes if needed
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
       if (theme === 'system') {
         updateThemeColor();
       }
    };
    
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme]);

  return null;
}
