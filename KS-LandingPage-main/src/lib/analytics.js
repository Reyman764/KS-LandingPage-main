// ─────────────────────────────────────────────────────────────────────────
// Analytics & Tracking
// ─────────────────────────────────────────────────────────────────────────
// Replace these placeholder IDs with your real ones:
//   1. GA4 Measurement ID — https://analytics.google.com  (looks like G-XXXXXXX)
//   2. Hotjar Site ID     — https://insights.hotjar.com   (numeric, e.g. 1234567)
// ─────────────────────────────────────────────────────────────────────────

export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
export const HOTJAR_SITE_ID = 0; // e.g. 1234567
export const HOTJAR_VERSION = 6;

const CONSENT_KEY = 'ks-analytics-consent';

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY); // 'granted' | 'denied' | null
  } catch {
    return null;
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {}
}

let scriptsLoaded = false;

export function loadAnalyticsScripts() {
  if (scriptsLoaded || typeof window === 'undefined') return;
  scriptsLoaded = true;

  // ── Google Analytics 4 ──────────────────────────────────────────────
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true,
    });
  }

  // ── Hotjar ──────────────────────────────────────────────────────────
  if (HOTJAR_SITE_ID && HOTJAR_SITE_ID > 0) {
    (function (h, o, t, j) {
      h.hj =
        h.hj ||
        function () {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      h._hjSettings = { hjid: HOTJAR_SITE_ID, hjsv: HOTJAR_VERSION };
      const a = o.getElementsByTagName('head')[0];
      const r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  }
}

// ── Event tracking ────────────────────────────────────────────────────
// Safely fires events to any loaded provider. No-op if consent not granted
// or scripts haven't loaded yet — events simply aren't sent.
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;

  // Console mirror in dev for easy debugging
  if (import.meta.env?.DEV) {
    // eslint-disable-next-line no-console
    console.log('[analytics]', eventName, params);
  }

  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  // Hotjar custom events (string only)
  if (typeof window.hj === 'function') {
    window.hj('event', eventName);
  }
}

// Initialize on app load if consent was previously granted
export function initAnalytics() {
  if (getConsent() === 'granted') {
    loadAnalyticsScripts();
  }
}
