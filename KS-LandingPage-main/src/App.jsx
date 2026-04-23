import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConsentBanner from './components/ConsentBanner';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Skeleton from './components/Skeleton';

// ─── Below-fold components lazy-loaded ───────────────────────────────────────
const LogoBar      = lazy(() => import('./components/LogoBar'));
const Features     = lazy(() => import('./components/Features'));
const HowItWorks   = lazy(() => import('./components/HowItWorks'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Footer       = lazy(() => import('./components/Footer'));

export default function App() {
  return (
    <>
      {/* Thin scroll progress bar at the very top of the viewport */}
      <ScrollProgress />

      {/* Navbar and Hero are eager — they are the LCP region */}
      <Navbar />
      <main>
        <Hero />

        {/* Skeleton fallbacks reserve vertical space → prevents CLS */}
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

      <ConsentBanner />

      {/* Floating back-to-top button — appears after 300px scroll */}
      <BackToTop />
    </>
  );
}
