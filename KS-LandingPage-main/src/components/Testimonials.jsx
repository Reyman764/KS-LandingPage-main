import { useEffect, useRef } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    quote:
      "KaryaSync completely transformed how our engineering team works. We shipped 40% more features in the first quarter after switching.",
    name: 'Priya Sharma',
    role: 'CTO, TechVista',
    avatar: '👩‍💻',
  },
  {
    quote:
      "The automation workflows alone save us 10+ hours a week. It's like having an extra team member that never sleeps.",
    name: 'James Chen',
    role: 'Product Lead, Nexora',
    avatar: '👨‍💼',
  },
  {
    quote:
      "We tried every tool out there. KaryaSync is the only one that's both powerful enough for devs and intuitive enough for designers.",
    name: 'Anika Patel',
    role: 'Design Director, Craftly',
    avatar: '👩‍🎨',
  },
  {
    quote:
      "The analytics dashboard gives me real-time visibility into our sprints. No more guessing — I know exactly where we stand.",
    name: 'Marcus Williams',
    role: 'VP Engineering, DataFlow',
    avatar: '👨‍🔬',
  },
  {
    quote:
      "Enterprise-grade security with a startup-friendly UX. KaryaSync checks every box for our compliance team and our engineers.",
    name: 'Sarah Kim',
    role: 'CISO, SecureStack',
    avatar: '🔒',
  },
  {
    quote:
      "Migrating from Jira was seamless. Our entire team was productive on Day 1, and happier about their tooling by Day 2.",
    name: 'Rajesh Gupta',
    role: 'Engineering Manager, CloudBridge',
    avatar: '🚀',
  },
];

export default function Testimonials() {
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
    <section className="testimonials" id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="testimonials__header animate-in">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">
            Loved by teams <br /> around the world
          </h2>
          <p className="section-subtitle">
            See why thousands of teams trust KaryaSync to manage their most
            important work.
          </p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <div
              className="testimonials__card glass-card animate-in"
              key={i}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="testimonials__stars">
                {'★★★★★'.split('').map((s, j) => (
                  <span key={j}>{s}</span>
                ))}
              </div>
              <p className="testimonials__quote">"{t.quote}"</p>
              <div className="testimonials__author">
                <span className="testimonials__avatar">{t.avatar}</span>
                <div>
                  <span className="testimonials__name">{t.name}</span>
                  <span className="testimonials__role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
