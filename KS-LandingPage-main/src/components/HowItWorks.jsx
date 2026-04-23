import { useEffect, useRef } from 'react';
import './HowItWorks.css';

const steps = [
  {
    num: '01',
    title: 'Create Your Workspace',
    description:
      'Set up your team workspace in seconds. Invite members, configure permissions, and choose from pre-built templates to hit the ground running.',
    icon: (
      <svg aria-hidden="true" focusable="false" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Organize & Prioritize',
    description:
      'Drag, drop, and tag tasks across customizable boards. Set priorities, deadlines, and dependencies — all with an intuitive UI your team will love.',
    icon: (
      <svg aria-hidden="true" focusable="false" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Collaborate in Real-Time',
    description:
      'Comment, share files, and see updates as they happen. KaryaSync keeps your entire team synchronized — no matter where they work from.',
    icon: (
      <svg aria-hidden="true" focusable="false" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Track & Ship',
    description:
      'Monitor progress with real-time dashboards, burndown charts, and automated reports. Ship on time, every time.',
    icon: (
      <svg aria-hidden="true" focusable="false" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const items = sectionRef.current.querySelectorAll('.animate-in');
    items.forEach((el) => observer.observe(el));
    return () => items.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section className="how-it-works" id="how-it-works" ref={sectionRef}>
      <div className="container">
        <div className="how-it-works__header animate-in">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">
            From chaos to clarity <br /> in four simple steps
          </h2>
          <p className="section-subtitle">
            Get your team up and running in minutes — not weeks.
          </p>
        </div>

        <div className="how-it-works__steps">
          {steps.map((step, i) => (
            <div
              className="how-it-works__step animate-in"
              key={i}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="how-it-works__step-num">{step.num}</div>
              <div className="how-it-works__step-icon">{step.icon}</div>
              <h3 className="how-it-works__step-title">{step.title}</h3>
              <p className="how-it-works__step-desc">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="how-it-works__connector"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
