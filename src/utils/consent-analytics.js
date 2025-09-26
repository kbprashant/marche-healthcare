// Consent-aware analytics bootstrapper
// Supports Google Tag Manager (preferred) or Google Analytics (fallback)
// Configure via Vite env:
//   - VITE_GTM_ID: e.g. GTM-XXXXXXX
//   - VITE_GA_ID:  e.g. G-XXXXXXXX (only used if no GTM id present)

const STORAGE_KEY = 'mh_cookie_consent_v1';

function getConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ---------- Google Consent Mode v2 helpers ----------
function ensureDataLayer() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
  }
}

function setConsentDefaults() {
  // Default all storages to denied except security_storage (always granted)
  // This runs before user makes a choice.
  ensureDataLayer();
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    // v2 fields
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

function updateConsentFromChoices(detail) {
  if (!detail) return;
  ensureDataLayer();
  const update = {
    // map our categories to Google storages
    analytics_storage: detail.performance ? 'granted' : 'denied',
    functionality_storage: detail.functional ? 'granted' : 'denied',
    ad_storage: detail.targeting ? 'granted' : 'denied',
    personalization_storage: detail.targeting ? 'granted' : 'denied',
    // Consent Mode v2
    ad_user_data: detail.targeting ? 'granted' : 'denied',
    ad_personalization: detail.targeting ? 'granted' : 'denied',
  };
  window.gtag('consent', 'update', update);
}

// ---------- Google Tag Manager ----------
function loadGTMOnce(id) {
  if (!id || typeof document === 'undefined') return;
  if (window.__gtmLoaded) return;
  window.__gtmLoaded = true;
  ensureDataLayer();
  // Standard GTM snippet (head) with dataLayer support
  (function(w,d,s,l,i){
    w[l]=w[l]||[];
    w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),
        dl=l!='dataLayer'?'&l='+l:'';
    j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer',id);
}

// ---------- Google Analytics fallback (if no GTM) ----------
function loadGAOnce(id) {
  if (!id || typeof document === 'undefined') return;
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  // gtag base
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  ensureDataLayer();
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
}

export function setupConsentAnalytics() {
  const GTM_ID = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GTM_ID) || '';
  const GA_ID = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GA_ID) || '';

  // Initialize Consent Mode defaults early
  setConsentDefaults();

  const maybeLoadVendors = (detail) => {
    // Always push consent updates
    updateConsentFromChoices(detail);

    // Prefer GTM when configured; it can manage GA and other tags
    if (GTM_ID) {
      if (detail && detail.performance) {
        loadGTMOnce(GTM_ID);
      }
      return;
    }

    // Fallback: direct GA if GTM not used
    if (GA_ID && detail && detail.performance) {
      loadGAOnce(GA_ID);
    }
  };

  // Load immediately if already consented
  const current = getConsent();
  if (current) {
    maybeLoadVendors(current);
  }

  // React to consent lifecycle events from our banner
  window.addEventListener('cookieconsent:ready', (e) => maybeLoadVendors(e.detail));
  window.addEventListener('cookieconsent:change', (e) => maybeLoadVendors(e.detail));

  // Note: The official GTM <noscript> iframe is only useful when JS is disabled.
  // Because this is an SPA and we gate loading by consent, we omit the noscript
  // snippet here (it wouldn't run without JS anyway). If you want it for parity,
  // you can add it in index.html right after <body>, but be aware it would load
  // before consent unless you wrap it in server-side gating.
}
