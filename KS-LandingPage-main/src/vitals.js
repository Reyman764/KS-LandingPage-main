/**
 * Core Web Vitals reporter
 *
 * Measures the three CWVs that Google uses for ranking:
 *   LCP  — Largest Contentful Paint  (target: < 2.5s)
 *   INP  — Interaction to Next Paint  (target: < 200ms)  [replaces FID]
 *   CLS  — Cumulative Layout Shift    (target: < 0.1)
 *
 * Plus two supporting diagnostics:
 *   FCP  — First Contentful Paint     (target: < 1.8s)
 *   TTFB — Time to First Byte         (target: < 800ms)
 *
 * In production, swap the console.table call for your analytics provider,
 * e.g. Google Analytics: gtag('event', name, { value, metric_id: id })
 */
export function reportWebVitals(onReport) {
  // Only run in browser, not SSR
  if (typeof window === 'undefined') return;

  import('web-vitals').then(({ onLCP, onINP, onCLS, onFCP, onTTFB }) => {
    const report = onReport || defaultReport;
    onLCP(report);
    onINP(report);
    onCLS(report);
    onFCP(report);
    onTTFB(report);
  }).catch(() => {
    // web-vitals unavailable — silently skip
  });
}

/**
 * Default reporter — logs to console in dev, silent in production.
 * Replace with your analytics call in production.
 */
function defaultReport(metric) {
  if (import.meta.env.DEV) {
    const rating = getRating(metric);
    console.log(
      `%c[Web Vitals] %c${metric.name}%c ${metric.value.toFixed(1)}${getUnit(metric)} — ${rating}`,
      'color:#888',
      `color:${rating === 'good' ? '#22c55e' : rating === 'needs-improvement' ? '#f59e0b' : '#ef4444'}; font-weight:bold`,
      'color:inherit'
    );
  }
}

function getRating({ name, value }) {
  const thresholds = {
    LCP:  [2500, 4000],
    INP:  [200,  500],
    CLS:  [0.1,  0.25],
    FCP:  [1800, 3000],
    TTFB: [800,  1800],
  };
  const [good, poor] = thresholds[name] || [0, 0];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

function getUnit({ name }) {
  return name === 'CLS' ? '' : 'ms';
}
