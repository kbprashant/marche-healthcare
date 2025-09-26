// Conditionally load Google Analytics based on cookie consent
// To enable, set VITE_GA_ID in your environment (e.g., Vite env files)

const STORAGE_KEY = 'mh_cookie_consent_v1';

function getConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function loadGAOnce(id) {
  if (!id || typeof document === 'undefined') return;
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  // gtag base
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id, { anonymize_ip: true });
}

export function setupConsentAnalytics() {
  const GA_ID = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GA_ID) || '';
  if (!GA_ID) return; // not configured; no-op

  const maybeLoad = (detail) => {
    if (detail && detail.performance) {
      loadGAOnce(GA_ID);
    }
  };

  // Load immediately if already consented
  const current = getConsent();
  if (current?.performance) {
    loadGAOnce(GA_ID);
  }

  // React to consent changes
  window.addEventListener('cookieconsent:ready', (e) => maybeLoad(e.detail));
  window.addEventListener('cookieconsent:change', (e) => maybeLoad(e.detail));

  // You can also listen for functional/targeting here to lazily load other vendors
  // Example:
  // if (detail.functional) loadIntercom();
  // if (detail.targeting) loadAdsPixels();
}
