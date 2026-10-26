(() => {
  'use strict';
  // Umami Cloud analytics for veydran.space. This public website ID comes
  // from the site's tracking code, and is not a secret API key.
  const websiteId = '313b5001-bd2d-4431-99fe-bbd3e084ca55';
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
