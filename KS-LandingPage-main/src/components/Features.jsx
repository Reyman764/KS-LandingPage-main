import { useEffect, useRef } from 'react';
import './Features.css';

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: 'Smart Kanban Boards',
    description: 'Visualize your workflow with intelligent boards that auto-suggest task movements and identify bottlenecks before they stall your sprint.',
    color: 'var(--primary-500)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Team Collaboration',
    description: 'Real-time comments, @mentions, and file sharing keep everyone on the same page — no more context-switching between tools.',
    color: '#3b82f6',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>
      </svg>
    ),
    title: 'Analytics Dashboard',
    description: 'Track velocity, burndown charts, and team performance with beautiful, real-time analytics you can actually act on.',
    color: '#a855f7',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Workflow Automation',
    description: 'Set up powerful rules and triggers to automate repetitive tasks — from status updates to Slack notifications and assignments.',
    color: '#22c55e',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Timeline & Gantt View',
    description: 'Plan and track project milestones with interactive timelines. Drag to reschedule, set dependencies, and keep projects on track.',
    color: '#f59e0b',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with SSO, 2FA, role-based access controls, and audit logs. Your data stays safe — always.',
    color: '#06b6d4',
  },
];

export default function Features() {
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
    <section className="features" id="features" ref={sectionRef}>
      <div className="container">
        <div className="features__header animate-in">
          <span className="section-label">Features</span>
          <h2 className="section-title">
            Everything you need to <br />manage work effectively
          </h2>
          <p className="section-subtitle">
            Powerful features designed to help your team collaborate, plan,
            and ship with confidence.
          </p>
        </div>

        <div className="features__grid">
          {features.map((f, i) => (
            <div
              className="features__card glass-card animate-in"
              key={i}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="features__icon"
                style={{ '--feat-color': f.color }}
              >
                {f.icon}
              </div>
              <h3 className="features__card-title">{f.title}</h3>
              <p className="features__card-desc">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
