import { useEffect, useState } from 'react';
import './ScrollProgress.css';

/**
 * Thin progress bar fixed at top of viewport.
 * Width reflects how far the user has scrolled through the page.
 * Uses rAF throttling for smoothness without re-rendering on every scroll px.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        (document.documentElement.scrollHeight || document.body.scrollHeight) -
        window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
      frame = 0;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={Math.round(progress)}
    >
      <div
        className="scroll-progress__bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
