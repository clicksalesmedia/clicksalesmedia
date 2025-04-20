'use client';

import { useState, useEffect } from 'react';
import { FaCode, FaInfoCircle } from 'react-icons/fa';

export interface TrackingScript {
  id: string;
  name: string;
  type: 'analytics' | 'conversion' | 'remarketing' | 'pixel' | 'tag_manager' | 'custom';
  provider: 'google' | 'meta' | 'linkedin' | 'twitter' | 'other';
  script: string;
  active: boolean;
  location: 'head' | 'body' | 'custom';
  loadType: 'sync' | 'async' | 'defer';
  createdAt: string;
  updatedAt: string;
  lastVerified?: string;
  notes?: string;
  triggerConditions?: {
    urlPattern?: string;
    pageType?: string;
    event?: string;
  };
}

interface ScriptFormProps {
  script?: TrackingScript | null;
  onSave: (script: Partial<TrackingScript>) => void;
  onCancel: () => void;
}

const typeOptions = [
  { value: 'analytics', label: 'Analytics' },
  { value: 'conversion', label: 'Conversion Tracking' },
  { value: 'remarketing', label: 'Remarketing' },
  { value: 'pixel', label: 'Pixel' },
  { value: 'tag_manager', label: 'Tag Manager' },
  { value: 'custom', label: 'Custom Script' }
];

const providerOptions = [
  { value: 'google', label: 'Google' },
  { value: 'meta', label: 'Meta (Facebook)' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'other', label: 'Other' }
];

const locationOptions = [
  { value: 'head', label: 'Head (Before closing </head> tag)' },
  { value: 'body', label: 'Body (Before closing </body> tag)' },
  { value: 'custom', label: 'Custom (Specific DOM element or condition)' }
];

const loadTypeOptions = [
  { value: 'sync', label: 'Synchronous (Blocks page rendering)' },
  { value: 'async', label: 'Asynchronous (Non-blocking)' },
  { value: 'defer', label: 'Deferred (Executes after HTML parsing)' }
];

export default function ScriptForm({ script, onSave, onCancel }: ScriptFormProps) {
  const [formData, setFormData] = useState<Partial<TrackingScript>>({
    name: '',
    type: 'analytics',
    provider: 'google',
    script: '',
    active: true,
    location: 'head',
    loadType: 'async',
    notes: '',
    triggerConditions: {
      urlPattern: '',
      pageType: '',
      event: ''
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  // If editing an existing script, populate the form with its data
  useEffect(() => {
    if (script) {
      setFormData({
        ...script,
        triggerConditions: script.triggerConditions || {
          urlPattern: '',
          pageType: '',
          event: ''
        }
      });
      
      // If existing script has trigger conditions, show the advanced section
      if (script.triggerConditions && 
          (script.triggerConditions.urlPattern || 
           script.triggerConditions.pageType || 
           script.triggerConditions.event)) {
        setShowAdvanced(true);
      }
    }
  }, [script]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.script?.trim()) {
      newErrors.script = 'Script code is required';
    } else if (!formData.script.includes('<script') && !formData.script.includes('</script>')) {
      newErrors.script = 'Script must contain <script> tags';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof TrackingScript] as Record<string, unknown>),
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const getScriptTemplates = () => {
    switch (formData.provider) {
      case 'google':
        switch (formData.type) {
          case 'analytics':
            return `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`;
          case 'conversion':
            return `<!-- Google Ads Conversion Tracking -->
<script>
  gtag('event', 'conversion', {
      'send_to': 'AW-XXXXXXXXXX/XXXXXXXXXX',
      'value': 1.0,
      'currency': 'USD'
  });
</script>`;
          case 'remarketing':
            return `<!-- Google Ads Remarketing Tag -->
<script>
  gtag('config', 'AW-XXXXXXXXXX', {
    'send_page_view': false
  });
  gtag('event', 'page_view', {
    'send_to': 'AW-XXXXXXXXXX'
  });
</script>`;
          case 'tag_manager':
            return `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->`;
          default:
            return '';
        }
      case 'meta':
        return `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'XXXXXXXXXXXXXXX');
fbq('track', 'PageView');
</script>`;
      case 'linkedin':
        return `<!-- LinkedIn Insight Tag -->
<script type="text/javascript">
_linkedin_partner_id = "XXXXXXX";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script><script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>`;
      case 'twitter':
        return `<!-- Twitter Universal Website Tag -->
<script>
!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('init','TWITTER_PIXEL_ID');
twq('track','PageView');
</script>`;
      default:
        return '<!-- Insert your custom script here -->\n<script>\n  // Your script code\n</script>';
    }
  };

  const handleUseTemplate = () => {
    setFormData({
      ...formData,
      script: getScriptTemplates()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.name ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="e.g., Google Analytics 4"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Active</label>
          <div className="mt-1 flex items-center">
            <input
              type="checkbox"
              name="active"
              checked={formData.active || false}
              onChange={handleToggle}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">
              Enable this script
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type || 'analytics'}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          >
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Provider</label>
          <select
            name="provider"
            value={formData.provider || 'google'}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          >
            {providerOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <select
            name="location"
            value={formData.location || 'head'}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          >
            {locationOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Load Type</label>
          <select
            name="loadType"
            value={formData.loadType || 'async'}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          >
            {loadTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">Script Code</label>
          <button
            type="button"
            onClick={handleUseTemplate}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Use Template
          </button>
        </div>
        <div className="mt-1 relative">
          <textarea
            name="script"
            rows={8}
            value={formData.script || ''}
            onChange={handleChange}
            className={`block w-full px-3 py-2 border ${
              errors.script ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm`}
            placeholder="<script>\n  // Your tracking code here\n</script>"
          />
          <div className="absolute top-2 right-2">
            <FaCode className="text-gray-400" />
          </div>
        </div>
        {errors.script && <p className="mt-1 text-sm text-red-600">{errors.script}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          name="notes"
          rows={3}
          value={formData.notes || ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Additional information about this tracking script"
        />
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
        >
          <FaInfoCircle className="mr-1" />
          {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
        </button>
      </div>

      {showAdvanced && (
        <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Trigger Conditions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700">URL Pattern</label>
              <input
                type="text"
                name="triggerConditions.urlPattern"
                value={formData.triggerConditions?.urlPattern || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="e.g., /checkout*, /thank-you"
              />
              <p className="mt-1 text-xs text-gray-500">Load script only on pages matching this pattern</p>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700">Page Type</label>
              <input
                type="text"
                name="triggerConditions.pageType"
                value={formData.triggerConditions?.pageType || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="e.g., product, checkout, homepage"
              />
              <p className="mt-1 text-xs text-gray-500">Load script only on specific page types</p>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-xs font-medium text-gray-700">Event Trigger</label>
            <input
              type="text"
              name="triggerConditions.event"
              value={formData.triggerConditions?.event || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="e.g., form_submit, button_click"
            />
            <p className="mt-1 text-xs text-gray-500">Load script only when specific event occurs</p>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {script ? 'Update Script' : 'Save Script'}
        </button>
      </div>
    </form>
  );
} 