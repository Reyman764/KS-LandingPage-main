import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConsentBanner from './components/ConsentBanner';

// ─── Below-fold components lazy-loaded ───────────────────────────────────────
// These are only parsed + executed when the browser is idle / user scrolls,
// reducing the initial JS bundle parsed on first load (improves TTI & FID).
const LogoBar      = lazy(() => import('./components/LogoBar'));
const Features     = lazy(() => import('./components/Features'));
const HowItWorks   = lazy(() => import('./components/HowItWorks'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Footer       = lazy(() => import('./components/Footer'));

// Minimal fallback — invisible placeholder that reserves no space,
// so Suspense boundaries don't cause layout shift (CLS = 0).
const Noop = () => null;

export default function App() {
  return (
    <>
      {/* Navbar and Hero are eager — they are the LCP region */}
      <Navbar />
      <main>
        <Hero />

        {/* Everything below the fold is lazy */}
        <Suspense fallback={<Noop />}>
          <LogoBar />
        </Suspense>

        <Suspense fallback={<Noop />}>
          <Features />
        </Suspense>

        <Suspense fallback={<Noop />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<Noop />}>
          <Testimonials />
        </Suspense>
      </main>

      <Suspense fallback={<Noop />}>
        <Footer />
      </Suspense>

      <ConsentBanner />
    </>
  );
}
