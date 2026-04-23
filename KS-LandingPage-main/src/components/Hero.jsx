import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const handleMouseMove = (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      hero.style.setProperty('--mouse-x', `${x}%`);
      hero.style.setProperty('--mouse-y', `${y}%`);
    };
    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero" ref={heroRef} id="hero">
      {/* Ambient background effects */}
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1"></div>
        <div className="hero__orb hero__orb--2"></div>
        <div className="hero__orb hero__orb--3"></div>
        <div className="hero__grid"></div>
      </div>

      <div className="container hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            Sync Your Team.
            <br />
            <span className="hero__title-accent">Ship Faster.</span>
          </h1>

          <p className="hero__subtitle">
            KaryaSync is the intelligent task management platform that keeps
            your team aligned, focused, and delivering results — all in one
            beautifully simple workspace.
          </p>

        </div>

        <div className="hero__visual">
          <div className="hero__mockup">
            <div className="hero__mockup-header">
              <div className="hero__mockup-dots">
                <span></span><span></span><span></span>
              </div>
              <span className="hero__mockup-title">KaryaSync — Sprint Dashboard</span>
            </div>
            <div className="hero__mockup-body">
              {/* Kanban Columns */}
              <div className="hero__kanban">
                <div className="hero__kanban-col">
                  <div className="hero__kanban-col-header">
                    <span className="hero__kanban-dot hero__kanban-dot--todo"></span>
                    To Do <span className="hero__kanban-count">3</span>
                  </div>
                  <div className="hero__kanban-card">
                    <div className="hero__kanban-tag hero__kanban-tag--design">Design</div>
                    <span>Landing page redesign</span>
                    <div className="hero__kanban-meta">
                      <span>🎨</span>
                      <span className="hero__kanban-priority hero__kanban-priority--high">High</span>
                    </div>
                  </div>
                  <div className="hero__kanban-card">
                    <div className="hero__kanban-tag hero__kanban-tag--dev">Backend</div>
                    <span>API rate limiting</span>
                    <div className="hero__kanban-meta">
                      <span>⚙️</span>
                      <span className="hero__kanban-priority hero__kanban-priority--med">Medium</span>
                    </div>
                  </div>
                </div>
                <div className="hero__kanban-col">
                  <div className="hero__kanban-col-header">
                    <span className="hero__kanban-dot hero__kanban-dot--progress"></span>
                    In Progress <span className="hero__kanban-count">2</span>
                  </div>
                  <div className="hero__kanban-card hero__kanban-card--active">
                    <div className="hero__kanban-tag hero__kanban-tag--dev">Frontend</div>
                    <span>Dashboard charts</span>
                    <div className="hero__kanban-meta">
                      <span>📊</span>
                      <span className="hero__kanban-priority hero__kanban-priority--high">High</span>
                    </div>
                  </div>
                  <div className="hero__kanban-card">
                    <div className="hero__kanban-tag hero__kanban-tag--qa">Testing</div>
                    <span>E2E test suite</span>
                    <div className="hero__kanban-meta">
                      <span>🧪</span>
                      <span className="hero__kanban-priority hero__kanban-priority--low">Low</span>
                    </div>
                  </div>
                </div>
                <div className="hero__kanban-col">
                  <div className="hero__kanban-col-header">
                    <span className="hero__kanban-dot hero__kanban-dot--done"></span>
                    Done <span className="hero__kanban-count">5</span>
                  </div>
                  <div className="hero__kanban-card hero__kanban-card--done">
                    <div className="hero__kanban-tag hero__kanban-tag--design">Design</div>
                    <span>Component library</span>
                    <div className="hero__kanban-meta">
                      <span>✅</span>
                      <span className="hero__kanban-priority hero__kanban-priority--done">Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero__glow"></div>
        </div>
      </div>
    </section>
  );
}
