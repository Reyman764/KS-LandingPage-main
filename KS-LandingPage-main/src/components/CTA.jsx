import { useEffect, useRef } from 'react';
import './CTA.css';
import { trackEvent } from '../lib/analytics';

export default function CTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );
    const items = sectionRef.current.querySelectorAll('.animate-in');
    items.forEach((el) => observer.observe(el));
    return () => items.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section className="cta" id="cta" ref={sectionRef}>
      <div className="cta__bg">
        <div className="cta__orb cta__orb--1"></div>
        <div className="cta__orb cta__orb--2"></div>
      </div>
      <div className="container">
        <div className="cta__card animate-in">
          <div className="cta__content">
            <span className="section-label" style={{ justifyContent: 'center' }}>
              Ready to Start?
            </span>
            <h2 className="cta__title">
              Start managing tasks the
              <span className="cta__title-accent"> smarter way</span>
            </h2>
            <p className="cta__subtitle">
              Join 10,000+ teams already using KaryaSync to ship faster, 
              collaborate better, and stay in sync. Free forever for small teams.
            </p>
            <div className="cta__actions">
              <a
                href="#pricing"
                className="btn btn-primary btn--lg"
                id="cta-primary"
                onClick={() => trackEvent('cta_click', { id: 'cta-primary', label: 'Get Started Free', location: 'cta_section' })}
              >
                <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Get Started Free
              </a>
              <a
                href="#"
                className="btn btn-outline btn--lg"
                id="cta-demo"
                onClick={() => trackEvent('cta_click', { id: 'cta-demo', label: 'Book a Demo', location: 'cta_section' })}
              >
                Book a Demo
              </a>
            </div>
            <p className="cta__note">No credit card required · Free plan available · Setup in 2 minutes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
