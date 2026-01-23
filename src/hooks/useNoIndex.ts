import { useEffect } from 'react';

export const useNoIndex = () => {
  useEffect(() => {
    // Create meta tag
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    
    // Add to head
    document.head.appendChild(meta);
    
    // Cleanup on unmount
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
};
