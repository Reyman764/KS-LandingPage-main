import { useEffect, useState } from 'react';
import './BackToTop.css';
import { trackEvent } from '../lib/analytics';

/**
 * Floating "back to top" button.
 * - Appears after the user has scrolled > 300px.
 * - Smooth-scrolls to top on click (respects prefers-reduced-motion).
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setVisible(window.scrollY > 300);
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const handleClick = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    trackEvent('back_to_top_click', { from_y: Math.round(window.scrollY) });
  };

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'back-to-top--visible' : ''}`}
      onClick={handleClick}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
