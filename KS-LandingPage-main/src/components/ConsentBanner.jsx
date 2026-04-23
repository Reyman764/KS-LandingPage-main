import { useEffect, useState } from 'react';
import {
  getConsent,
  setConsent,
  loadAnalyticsScripts,
  trackEvent,
} from '../lib/analytics';
import './ConsentBanner.css';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if user hasn't made a choice yet
    if (getConsent() === null) {
      // Small delay so it doesn't flash during initial paint
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAccept = () => {
    setConsent('granted');
    loadAnalyticsScripts();
    setVisible(false);
    // Fire after scripts load on next tick
    setTimeout(() => trackEvent('consent_accepted'), 100);
  };

  const handleDecline = () => {
    setConsent('denied');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="consent-banner" role="dialog" aria-label="Cookie consent">
      <div className="consent-banner__inner">
        <div className="consent-banner__text">
          <strong>We use cookies 🍪</strong>
          <span>
            We use analytics cookies (Google Analytics &amp; Hotjar) to
            understand how you use KaryaSync and improve your experience.
            You can decline without affecting site functionality.
          </span>
        </div>
        <div className="consent-banner__actions">
          <button
            type="button"
            className="consent-banner__btn consent-banner__btn--ghost"
            onClick={handleDecline}
          >
            Decline
          </button>
          <button
            type="button"
            className="consent-banner__btn consent-banner__btn--primary"
            onClick={handleAccept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
