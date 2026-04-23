import { useState, useEffect, useRef } from 'react';
import './Pricing.css';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for individuals and small teams getting started.',
    monthly: 0,
    yearly: 0,
    features: [
      'Up to 5 team members',
      '3 project boards',
      'Basic Kanban view',
      'Email notifications',
      '500 MB file storage',
      'Community support',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    description: 'For growing teams that need advanced collaboration tools.',
    monthly: 12,
    yearly: 9,
    features: [
      'Up to 50 team members',
      'Unlimited project boards',
      'Kanban, Timeline & Gantt',
      'Workflow automation',
      'Analytics dashboard',
      '50 GB file storage',
      'Priority email support',
      'Custom fields & labels',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    description: 'For organizations that need security, control, and scale.',
    monthly: 29,
    yearly: 24,
    features: [
      'Unlimited team members',
      'Unlimited everything',
      'SSO & SAML',
      'Advanced security & audit logs',
      'Custom workflows',
      'Unlimited storage',
      'Dedicated account manager',
      'SLA guarantee (99.99%)',
      'API access & webhooks',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
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
    <section className="pricing" id="pricing" ref={sectionRef}>
      <div className="container">
        <div className="pricing__header animate-in">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">
            Simple, transparent pricing
          </h2>
          <p className="section-subtitle">
            No hidden fees. No surprises. Start free and upgrade when you're ready.
          </p>

          <div className="pricing__toggle" id="pricing-toggle">
            <span className={!yearly ? 'pricing__toggle-active' : ''}>Monthly</span>
            <button
              className={`pricing__switch ${yearly ? 'pricing__switch--on' : ''}`}
              onClick={() => setYearly(!yearly)}
              aria-label="Toggle billing period"
            >
              <span className="pricing__switch-thumb"></span>
            </button>
            <span className={yearly ? 'pricing__toggle-active' : ''}>
              Yearly <span className="pricing__save-badge">Save 25%</span>
            </span>
          </div>
        </div>

        <div className="pricing__grid">
          {plans.map((plan, i) => (
            <div
              className={`pricing__card glass-card animate-in ${
                plan.highlighted ? 'pricing__card--highlighted' : ''
              }`}
              key={i}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {plan.badge && (
                <span className="pricing__badge">{plan.badge}</span>
              )}
              <h3 className="pricing__plan-name">{plan.name}</h3>
              <p className="pricing__plan-desc">{plan.description}</p>

              <div className="pricing__price">
                <span className="pricing__currency">$</span>
                <span className="pricing__amount">
                  {yearly ? plan.yearly : plan.monthly}
                </span>
                <span className="pricing__period">
                  {plan.monthly === 0 ? ' forever' : ' / user / mo'}
                </span>
              </div>

              <ul className="pricing__features">
                {plan.features.map((f, j) => (
                  <li key={j}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`btn ${
                  plan.highlighted ? 'btn-primary' : 'btn-secondary'
                } pricing__cta`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
