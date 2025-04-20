interface TrackingScript {
  id: string;
  name: string;
  type: string;
  provider: string;
  script: string;
  active: boolean;
  location: string;
  loadType: string;
  notes?: string;
  triggerConditions?: {
    urlPattern?: string;
    pageType?: string;
    event?: string;
  };
}

/**
 * Loads all active tracking scripts into the page
 * @param scripts The array of tracking scripts to load
 */
export const loadTrackingScripts = (scripts: TrackingScript[]): void => {
  // Filter only active scripts
  const activeScripts = scripts.filter(script => script.active);
  
  // Process scripts by location
  const headScripts = activeScripts.filter(script => script.location === 'head');
  const bodyScripts = activeScripts.filter(script => script.location === 'body');
  const customScripts = activeScripts.filter(script => script.location === 'custom');
  
  // Load head scripts
  headScripts.forEach(script => {
    insertScript(script, 'head');
  });
  
  // Load body scripts
  bodyScripts.forEach(script => {
    insertScript(script, 'body');
  });
  
  // Load custom scripts (with conditions)
  customScripts.forEach(script => {
    if (shouldLoadScript(script)) {
      insertScript(script, 'body');
    }
  });
};

/**
 * Check if a script should be loaded based on its trigger conditions
 */
const shouldLoadScript = (script: TrackingScript): boolean => {
  const { triggerConditions } = script;
  
  if (!triggerConditions) {
    return true;
  }
  
  // Check URL pattern
  if (triggerConditions.urlPattern) {
    const urlRegex = new RegExp(triggerConditions.urlPattern.replace('*', '.*'));
    if (!urlRegex.test(window.location.pathname)) {
      return false;
    }
  }
  
  // Check page type (would need to be set in page data)
  if (triggerConditions.pageType) {
    const pageType = document.body.dataset.pageType;
    if (pageType !== triggerConditions.pageType) {
      return false;
    }
  }
  
  // Event-based scripts are handled differently
  if (triggerConditions.event) {
    setupEventListener(script, triggerConditions.event);
    return false; // Don't load immediately
  }
  
  return true;
};

/**
 * Set up event listeners for event-triggered scripts
 */
const setupEventListener = (script: TrackingScript, eventName: string): void => {
  document.addEventListener(eventName, () => {
    insertScript(script, 'body');
  });
};

/**
 * Insert script into the DOM
 */
const insertScript = (script: TrackingScript, target: 'head' | 'body'): void => {
  try {
    const container = document.createElement('div');
    container.innerHTML = script.script;
    
    // Extract all script tags
    const scriptElements = container.querySelectorAll('script');
    
    scriptElements.forEach(el => {
      const newScript = document.createElement('script');
      
      // Copy attributes
      Array.from(el.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      
      // Set loading type
      if (script.loadType === 'async') {
        newScript.async = true;
      } else if (script.loadType === 'defer') {
        newScript.defer = true;
      }
      
      // Copy content
      newScript.textContent = el.textContent;
      
      // Add to DOM
      if (target === 'head') {
        document.head.appendChild(newScript);
      } else {
        document.body.appendChild(newScript);
      }
    });
    
    // Add non-script elements
    const nonScriptElements = Array.from(container.children).filter(
      el => el.tagName !== 'SCRIPT'
    );
    
    nonScriptElements.forEach(el => {
      if (target === 'head') {
        document.head.appendChild(el);
      } else {
        document.body.appendChild(el);
      }
    });
    
    console.log(`Loaded tracking script: ${script.name}`);
  } catch (error) {
    console.error(`Error loading tracking script ${script.name}:`, error);
  }
};

/**
 * Track a custom event (for use with conversion tracking)
 */
export const trackEvent = (eventName: string, data?: Record<string, any>): void => {
  // Google Analytics / GTM
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...data
    });
  }
  
  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', eventName, data);
  }
  
  // LinkedIn
  if (window.lintrk) {
    window.lintrk('track', { conversion_id: eventName });
  }
  
  // Twitter
  if (window.twq) {
    window.twq('track', eventName, data);
  }
  
  // Fire a custom event for event-triggered scripts
  const customEvent = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(customEvent);
  
  console.log(`Tracked event: ${eventName}`, data);
};

/**
 * Track a page view
 */
export const trackPageView = (data?: Record<string, any>): void => {
  // Google Analytics / GTM
  if (window.gtag) {
    window.gtag('config', window.GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
      ...data
    });
  }
  
  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'PageView', data);
  }
  
  // LinkedIn
  if (window.lintrk) {
    window.lintrk('track', { page_view: true });
  }
  
  // Twitter
  if (window.twq) {
    window.twq('track', 'PageView', data);
  }
  
  console.log('Tracked page view:', window.location.pathname);
};

// Add TypeScript declarations for global variables
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    GA_MEASUREMENT_ID?: string;
    fbq?: (...args: any[]) => void;
    lintrk?: any;
    twq?: (...args: any[]) => void;
  }
} 