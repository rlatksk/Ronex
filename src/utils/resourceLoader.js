// Preload critical resources for better performance
export const preloadCriticalResources = () => {
  // Preload critical images
  const criticalImages = [
    '/RonexLogo.svg',
    '/RonexLogo.jpeg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Preload route components for better navigation
export const preloadRouteComponents = () => {
  // Use dynamic imports to preload components
  const routes = [
    () => import('../pages/Home'),
    () => import('../pages/About'),
    () => import('../pages/Projects'),
    () => import('../pages/Admin')
  ];

  // Preload after a short delay to not block initial render
  setTimeout(() => {
    routes.forEach(importFunc => {
      importFunc().catch(() => {
        // Silently handle preload failures
      });
    });
  }, 2000);
};

// Optimize font loading
export const optimizeFontLoading = () => {
  // Add font-display: swap to existing fonts
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: system-ui;
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
};
