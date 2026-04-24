import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skeleton from './components/Skeleton';

// ─── Below-fold components lazy-loaded ───────────────────────────────────────
const LogoBar       = lazy(() => import('./components/LogoBar'));
const Features      = lazy(() => import('./components/Features'));
const HowItWorks    = lazy(() => import('./components/HowItWorks'));
const Testimonials  = lazy(() => import('./components/Testimonials'));
const Footer        = lazy(() => import('./components/Footer'));

// ─── UI chrome that doesn't need to render on first paint ────────────────────
// These add scroll listeners and DOM nodes; deferring them shaves TBT.
const ScrollProgress = lazy(() => import('./components/ScrollProgress'));
const BackToTop      = lazy(() => import('./components/BackToTop'));
const ConsentBanner  = lazy(() => import('./components/ConsentBanner'));

export default function App() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollProgress />
      </Suspense>

      {/* Navbar and Hero are eager — they are the LCP region */}
      <Navbar />
      <main>
        <Hero />

        <Suspense fallback={<Skeleton />}>
          <LogoBar />
        </Suspense>

        <Suspense fallback={<Skeleton />}>
          <Features />
        </Suspense>

        <Suspense fallback={<Skeleton />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<Skeleton />}>
          <Testimonials />
        </Suspense>
      </main>

      <Suspense fallback={<Skeleton />}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        <ConsentBanner />
      </Suspense>

      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </>
  );
}
