(() => {
  'use strict';
  // Optional Cloudflare Web Analytics manual beacon. This is a public SITE token,
  // not a secret API key. Obtain it under Cloudflare > Web Analytics > Manage site.
  // Leave blank when using Cloudflare's automatic script injection.
  const siteToken = '';
  if (!siteToken || !/^[a-zA-Z0-9_-]+$/.test(siteToken)) return;
  // Prevent duplicate reporting if Cloudflare auto-injects its own beacon.
  if (document.querySelector('script[src*="static.cloudflareinsights.com/beacon.min.js"]')) return;
  const beacon = document.createElement('script');
  beacon.defer = true;
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.dataset.cfBeacon = JSON.stringify({token:siteToken});
  document.head.appendChild(beacon);
})();
