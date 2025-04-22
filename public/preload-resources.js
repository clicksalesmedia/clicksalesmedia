// Preload critical resources to ensure smooth initial loading
(function() {
  if (typeof window !== 'undefined') {
    // Define the resources to preload
    const criticalResources = {
      // Critical images
      images: [
        '/clicksalesmedia-marketing-agency.png',
        '/mesh-clicksalesmedia.png',
        '/images/logo.png',
        '/images/hero/hero-bg.jpg'
      ],
      // Critical CSS
      styles: [
        '/_next/static/css/app/layout.css',
        '/_next/static/css/app/page.css'
      ],
      // Critical scripts
      scripts: [
        '/_next/static/chunks/main-app.js',
        '/_next/static/chunks/webpack.js'
      ]
    };

    // Create a promise-based resource loader
    function preloadResource(url, type) {
      return new Promise((resolve, reject) => {
        let resource;

        if (type === 'image') {
          resource = new Image();
          resource.onload = resolve;
          resource.onerror = resolve; // Still resolve to avoid blocking
          resource.src = url;
        } else if (type === 'style') {
          resource = document.createElement('link');
          resource.rel = 'preload';
          resource.as = 'style';
          resource.href = url;
          resource.onload = resolve;
          resource.onerror = resolve; // Still resolve to avoid blocking
          document.head.appendChild(resource);
        } else if (type === 'script') {
          resource = document.createElement('link');
          resource.rel = 'preload';
          resource.as = 'script';
          resource.href = url;
          resource.onload = resolve;
          resource.onerror = resolve; // Still resolve to avoid blocking
          document.head.appendChild(resource);
        }

        // Set a timeout to avoid hanging forever
        setTimeout(resolve, 3000);
      });
    }

    // Browser detection
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    // Create preload promises
    const preloadPromises = [];

    // Add preload tasks based on browser
    criticalResources.images.forEach(url => {
      preloadPromises.push(preloadResource(url, 'image'));
    });

    // Safari/Firefox need extra help with CSS
    if (isSafari || isFirefox) {
      criticalResources.styles.forEach(url => {
        preloadPromises.push(preloadResource(url, 'style'));
      });
      criticalResources.scripts.forEach(url => {
        preloadPromises.push(preloadResource(url, 'script'));
      });
    }

    // Add to sessionStorage that we've started preloading
    sessionStorage.setItem('resources_preloaded', 'started');

    // Execute all preloads in parallel
    Promise.all(preloadPromises).then(() => {
      sessionStorage.setItem('resources_preloaded', 'complete');
      
      // Dispatch a custom event that other scripts can listen for
      const event = new CustomEvent('resourcesPreloaded');
      window.dispatchEvent(event);
    });
  }
})(); 