import './Skeleton.css';

/**
 * Generic skeleton loader. Use as a Suspense fallback or while async data loads.
 * Prevents layout shift by reserving the same vertical space as the real content.
 *
 * Variants:
 *   - "section" (default): full-width section placeholder
 *   - "card":   single card-sized placeholder
 *   - "text":   single line of text
 */
export default function Skeleton({ variant = 'section', lines = 3, className = '', style }) {
  if (variant === 'text') {
    return (
      <div className={`skeleton-text ${className}`} style={style} aria-hidden="true">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="skeleton skeleton__line" />
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`skeleton-card ${className}`} style={style} aria-hidden="true">
        <div className="skeleton skeleton__media" />
        <div className="skeleton skeleton__line skeleton__line--lg" />
        <div className="skeleton skeleton__line" />
        <div className="skeleton skeleton__line skeleton__line--sm" />
      </div>
    );
  }

  // Default: section placeholder
  return (
    <section
      className={`skeleton-section ${className}`}
      style={style}
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading content"
    >
      <div className="skeleton skeleton__line skeleton__line--title" />
      <div className="skeleton skeleton__line skeleton__line--lg" />
      <div className="skeleton-section__grid">
        <div className="skeleton skeleton__block" />
        <div className="skeleton skeleton__block" />
        <div className="skeleton skeleton__block" />
      </div>
    </section>
  );
}
