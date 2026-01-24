import { lazy, ComponentType, LazyExoticComponent } from 'react';

export const lazyWithRetry = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): LazyExoticComponent<T> => {
  return lazy(() => {
    return new Promise((resolve, reject) => {
      factory()
        .then(resolve)
        .catch((error) => {
          // Check for chunk load errors
          const isChunkError = 
            error.message?.includes('Failed to fetch dynamically imported module') ||
            error.message?.includes('Importing a module script failed') ||
            error.name === 'ChunkLoadError';

          if (isChunkError) {
             // Check if we already retried to avoid infinite loops
             const hasRetried = window.sessionStorage.getItem('retry-chunk-load');
             if (!hasRetried) {
               window.sessionStorage.setItem('retry-chunk-load', 'true');
               window.location.reload();
               return; // Pending reload
             }
          }
          
          reject(error);
        });
    });
  });
};
