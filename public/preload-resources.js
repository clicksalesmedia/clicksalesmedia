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

    // Create a promise-based resource loader with improved performance
    function preloadResource(url, type) {
      return new Promise((resolve, reject) => {
        let resource;

        if (type === 'image') {
          // Use fetchpriority for images
          resource = new Image();
          resource.fetchPriority = 'high';
          resource.decoding = 'async'; // Use async decoding
          resource.onload = resolve;
          resource.onerror = resolve; // Still resolve to avoid blocking
          resource.src = url;
        } else if (type === 'style') {
          resource = document.createElement('link');
          resource.rel = 'preload';
          resource.as = 'style';
          resource.href = url;
          resource.onload = resolve;
          resource.onerror = resolve;
          document.head.appendChild(resource);
        } else if (type === 'script') {
          resource = document.createElement('link');
          resource.rel = 'preload';
          resource.as = 'script';
          resource.href = url;
          resource.onload = resolve;
          resource.onerror = resolve;
          document.head.appendChild(resource);
        }

        // Reduce timeout to improve perceived performance
        setTimeout(resolve, 1500);
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

    // Execute all preloads in parallel with a race condition
    // This ensures we don't wait for ALL resources if some are slow
    Promise.all(preloadPromises.map(p => Promise.race([p, new Promise(r => setTimeout(r, 1000))])))
      .then(() => {
        sessionStorage.setItem('resources_preloaded', 'complete');
        
        // Dispatch a custom event that other scripts can listen for
        const event = new CustomEvent('resourcesPreloaded');
        window.dispatchEvent(event);
        
        // Add a second wave of preloading for non-critical resources
        setTimeout(() => {
          // Preload additional resources after the initial render
          const secondaryImages = [
            '/images/about/team-bg.jpg',
            '/images/services/services-bg.jpg'
          ];
          
          secondaryImages.forEach(url => {
            const img = new Image();
            img.src = url;
          });
        }, 2000);
      });
  }
})(); 