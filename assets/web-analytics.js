(() => {
  'use strict';
  // Optional Umami Cloud analytics. Obtain this public website ID in Umami
  // Settings > Websites > Edit > Tracking code. It is NOT an API key.
  // Until configured, no visitor statistics are collected by this file.
  const websiteId = '';
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(websiteId)) return;

  // Do not duplicate a tracker installed separately.
  if (document.querySelector('script[data-website-id]')) return;
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://cloud.umami.is/script.js';
  script.dataset.websiteId = websiteId;
  script.dataset.domains = 'veydran.space,www.veydran.space';
  script.dataset.doNotTrack = 'true';
  document.head.appendChild(script);
})();
