import { useEffect } from 'react';
import { useTheme } from './theme-provider';

export function ThemeColorManager() {
  const { theme } = useTheme();

  useEffect(() => {
    const updateThemeColor = () => {
      // Determine the current active theme (system or explicit)
      let activeTheme = theme;
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        activeTheme = systemTheme;
      }

      // Define colors
      const lightColor = '#EBF4FF'; // Top status bar color for light mode
      const darkColor = '#0a0a0a';  // Top status bar color for dark mode

      const color = activeTheme === 'dark' ? darkColor : lightColor;

      // Aggressively clean up existing meta tags to prevent conflicts
      const existingMetas = document.querySelectorAll('meta[name="theme-color"]');
      existingMetas.forEach(meta => {
        // Remove media attribute to make it unconditional
        meta.removeAttribute('media');
        // Update content
        meta.setAttribute('content', color);
      });

      // If no tag exists (rare), create one
      if (existingMetas.length === 0) {
         const newMeta = document.createElement('meta');
         newMeta.setAttribute('name', 'theme-color');
         newMeta.setAttribute('content', color);
         document.head.appendChild(newMeta);
      }
    };

    updateThemeColor();

    // Listen for system theme changes if using 'system'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateThemeColor);

    return () => mediaQuery.removeEventListener('change', updateThemeColor);
  }, [theme]);

  return null;
}
