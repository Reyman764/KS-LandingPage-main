import { useState, useEffect } from 'react';
import './Navbar.css';
import { trackEvent } from '../lib/analytics';
import useActiveSection from '../hooks/useActiveSection';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Read saved preference; fall back to dark
    return localStorage.getItem('ks-theme') || 'dark';
  });

  // Apply theme to <html> on mount and whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ks-theme', theme);
  }, [theme]);

  // ── Cross-tab theme sync ──
  // Uses BroadcastChannel where supported (instant, in-process), and falls
  // back to the `storage` event for older browsers / private modes.
  useEffect(() => {
    let bc;
    try {
      if ('BroadcastChannel' in window) {
        bc = new BroadcastChannel('ks-theme');
        bc.onmessage = (e) => {
          const next = e?.data?.theme;
          if (next === 'dark' || next === 'light') {
            setTheme((cur) => (cur === next ? cur : next));
          }
        };
      }
    } catch { /* ignore */ }

    const onStorage = (e) => {
      if (e.key === 'ks-theme' && (e.newValue === 'dark' || e.newValue === 'light')) {
        setTheme((cur) => (cur === e.newValue ? cur : e.newValue));
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
      if (bc) bc.close();
    };
  }, []);

  // Broadcast theme changes to other tabs
  useEffect(() => {
    if (!('BroadcastChannel' in window)) return;
    let bc;
    try {
      bc = new BroadcastChannel('ks-theme');
      bc.postMessage({ theme });
    } catch { /* ignore */ }
    return () => { if (bc) bc.close(); };
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark';
      trackEvent('theme_toggle', { from: t, to: next });
      return next;
    });
  };

  const handleAuthClick = (action) => {
    setMobileOpen(false);
    trackEvent('auth_cta_click', { action });
  };

  const links = [
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
  ];

  // Highlight current section in navbar as the user scrolls
  const activeId = useActiveSection(links.map(l => l.id));

  // Smooth scroll on anchor click (anchor href fallback still works without JS)
  const handleNavClick = (e, link) => {
    setMobileOpen(false);
    trackEvent('nav_link_click', { label: link.label, href: link.href });

    const el = document.getElementById(link.id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navOffset = document.getElementById('navbar')?.offsetHeight || 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset - 8;
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', link.href);
  };

  const SunIcon = () => (
    <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );

  const MoonIcon = () => (
    <svg aria-hidden="true" focusable="false" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );

  const SparkleIcon = () => (
    <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9z"/>
    </svg>
  );

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner container">
        <a href="#" className="navbar__brand" id="navbar-brand">
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img
              src="/logo.png"
              alt="KaryaSync logo"
              className="navbar__logo"
              width="20"
              height="20"
              fetchpriority="high"
              decoding="async"
            />
          </picture>
          <span className="navbar__name">KaryaSync</span>
        </a>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`} id="navbar-links">
          {links.map((l) => {
            const isActive = activeId === l.id;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => handleNavClick(e, l)}
                >
                  {l.label}
                </a>
              </li>
            );
          })}

          {/* Auth CTAs — visible inside mobile overlay too */}
          <li className="navbar__auth navbar__auth--mobile">
            <a
              href="/login"
              className="navbar__btn navbar__btn--ghost"
              onClick={() => handleAuthClick('login')}
            >
              Log in
            </a>
            <a
              href="/signup"
              className="navbar__btn navbar__btn--primary"
              onClick={() => handleAuthClick('signup')}
            >
              <SparkleIcon />
              <span>Get Started</span>
            </a>
          </li>
        </ul>

        <div className="navbar__actions">
          {/* Auth CTAs — desktop */}
          <div className="navbar__auth navbar__auth--desktop">
            <a
              href="/login"
              className="navbar__btn navbar__btn--ghost"
              onClick={() => handleAuthClick('login')}
            >
              Log in
            </a>
            <a
              href="/signup"
              className="navbar__btn navbar__btn--primary"
              onClick={() => handleAuthClick('signup')}
            >
              <SparkleIcon />
              <span>Get Started</span>
            </a>
          </div>

          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--active' : ''}`}
            onClick={() => {
              const next = !mobileOpen;
              setMobileOpen(next);
              trackEvent('mobile_menu_toggle', { open: next });
            }}
            aria-label="Toggle menu"
            id="navbar-hamburger"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
