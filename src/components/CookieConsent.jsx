import React, { useEffect, useMemo, useState } from 'react';
import footerLogo from '../assets/footer-logo.png';

// Simple, dependency-free cookie consent component
// - Shows a bottom banner on first visit (or when expired)
// - Provides Accept (all), Reject (necessary only), and Settings (modal)
// - Stores preferences in localStorage with an expiration window

const STORAGE_KEY = 'mh_cookie_consent_v1';
const CONSENT_VERSION = 2; // bump when categories/logic change
const EXPIRES_DAYS = 180; // re-ask after 6 months

function inDays(days) {
  return days * 24 * 60 * 60 * 1000;
}

function readConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return null;
    if (data.version !== CONSENT_VERSION) return null;
    if (!data.timestamp) return null;
    const expired = Date.now() - Number(data.timestamp) > inDays(EXPIRES_DAYS);
    return expired ? null : data;
  } catch {
    return null;
  }
}

function saveConsent(consent) {
  const payload = {
    version: CONSENT_VERSION,
    timestamp: Date.now(),
    ...consent,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  // Inform listeners (analytics loader, etc.)
  window.dispatchEvent(new CustomEvent('cookieconsent:change', { detail: payload }));
  return payload;
}

export default function CookieConsent() {
  const existing = useMemo(readConsent, []);
  const [visible, setVisible] = useState(!existing);
  const [openPrefs, setOpenPrefs] = useState(false);

  // Preferences state (strictly necessary is always true + locked)
  const [performance, setPerformance] = useState(existing?.performance ?? false);
  const [functional, setFunctional] = useState(existing?.functional ?? false);
  const [targeting, setTargeting] = useState(existing?.targeting ?? false);

  useEffect(() => {
    // If consent already exists, broadcast on mount so any listeners can react.
    if (existing) {
      window.dispatchEvent(new CustomEvent('cookieconsent:ready', { detail: existing }));
    }
  }, [existing]);

  const acceptAll = () => {
    const payload = saveConsent({ necessary: true, performance: true, functional: true, targeting: true });
    setPerformance(payload.performance);
    setFunctional(payload.functional);
    setTargeting(payload.targeting);
    setVisible(false);
    setOpenPrefs(false);
  };

  const rejectAll = () => {
    const payload = saveConsent({ necessary: true, performance: false, functional: false, targeting: false });
    setPerformance(payload.performance);
    setFunctional(payload.functional);
    setTargeting(payload.targeting);
    setVisible(false);
    setOpenPrefs(false);
  };

  const confirmChoices = () => {
    saveConsent({ necessary: true, performance, functional, targeting });
    setVisible(false);
    setOpenPrefs(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Bottom banner */}
      <div className="cookie-consent-banner" role="dialog" aria-live="polite">
        <div className="cookie-consent-content">
          <div className="cookie-consent-text">
            This site uses cookies for personalization, measuring site traffic, and providing an
            optimal user experience. Click 'Accept' to opt into this enhanced experience or 'Reject'
            to reject all cookies except essential cookies required for the website to function.
          </div>
          <div className="cookie-consent-actions">
            <button className="cookie-btn ghost" onClick={() => setOpenPrefs(true)} aria-haspopup="dialog">
              Cookies Settings
            </button>
            <button className="cookie-btn outline" onClick={rejectAll}>
              Reject
            </button>
            <button className="cookie-btn primary" onClick={acceptAll}>
              Accept
            </button>
          </div>
        </div>
      </div>

      {/* Preferences modal */}
      {openPrefs && (
        <div className="cookie-consent-modal" role="dialog" aria-modal="true">
          <div className="cookie-consent-modal-card" role="document">
            <div className="cookie-consent-modal-header">
              <div className="brand">
                <img src={footerLogo} alt="Company Logo" className="brand-logo" />
              </div>
              <button className="close-x" aria-label="Close" onClick={() => setOpenPrefs(false)}>
                ×
              </button>
            </div>
            <div className="cookie-consent-modal-body">
              <h2 className="modal-title">Privacy Preference Center</h2>
              <p className="modal-desc">
                When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to. The information does not usually directly identify you, but it can give you a more personalized web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the different category headings to find out more and change our default settings. However, blocking some types of cookies may impact your experience of the site and the services we are able to offer.
              </p>

              <div className="cookie-group">
                <div className="cookie-group-row">
                  <div className="cookie-group-title">Strictly Necessary Cookies</div>
                  <div className="cookie-toggle always">Always Active</div>
                </div>
                <p className="cookie-group-desc">
                  These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.
                </p>
                <details className="cookie-details"><summary>Cookies Details</summary>
                  <div className="cookie-details-body">Examples include session identifiers, security tokens, and load-balancer cookies required to keep the site running.</div>
                </details>
              </div>

              <div className="cookie-group">
                <div className="cookie-group-row">
                  <div className="cookie-group-title">Performance Cookies</div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={!!performance}
                      onChange={(e) => setPerformance(e.target.checked)}
                      aria-label="Enable performance cookies"
                    />
                    <span className="slider" />
                  </label>
                </div>
                <p className="cookie-group-desc">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.
                </p>
                <details className="cookie-details"><summary>Cookies Details</summary>
                  <div className="cookie-details-body">Examples include analytics cookies such as Google Analytics (_ga, _gid) configured with IP anonymization.</div>
                </details>
              </div>

              <div className="cookie-group">
                <div className="cookie-group-row">
                  <div className="cookie-group-title">Functional Cookies</div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={!!functional}
                      onChange={(e) => setFunctional(e.target.checked)}
                      aria-label="Enable functional cookies"
                    />
                    <span className="slider" />
                  </label>
                </div>
                <p className="cookie-group-desc">
                  These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.
                </p>
                <details className="cookie-details"><summary>Cookies Details</summary>
                  <div className="cookie-details-body">Examples include remembering preferences, embedded video providers, or chat widgets.</div>
                </details>
              </div>

              <div className="cookie-group">
                <div className="cookie-group-row">
                  <div className="cookie-group-title">Targeting Cookies</div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={!!targeting}
                      onChange={(e) => setTargeting(e.target.checked)}
                      aria-label="Enable targeting cookies"
                    />
                    <span className="slider" />
                  </label>
                </div>
                <p className="cookie-group-desc">
                  These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.
                </p>
                <details className="cookie-details"><summary>Cookies Details</summary>
                  <div className="cookie-details-body">Examples include advertising and social media tracking pixels/cookies used for remarketing.</div>
                </details>
              </div>
            </div>

            <div className="cookie-consent-modal-footer">
              <button className="cookie-btn outline" onClick={rejectAll}>Reject</button>
              <button className="cookie-btn primary" onClick={confirmChoices}>Confirm My Choices</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
