import { useEffect, useState } from 'react';

/**
 * Tracks which section id is currently in view using IntersectionObserver.
 * @param {string[]} ids - section element ids to observe (in document order).
 * @param {object} options
 * @param {string} [options.rootMargin='-40% 0px -55% 0px'] - active band around viewport center.
 * @returns {string} the id of the currently active section, or '' if none.
 */
export default function useActiveSection(ids, { rootMargin = '-40% 0px -55% 0px' } = {}) {
  const [active, setActive] = useState('');

  useEffect(() => {
    if (!ids || !ids.length || typeof IntersectionObserver === 'undefined') return;

    const elements = ids
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        });
        if (visible.size === 0) return;
        let topId = '';
        let topRatio = -1;
        visible.forEach((ratio, id) => {
          if (ratio > topRatio) { topRatio = ratio; topId = id; }
        });
        setActive(topId);
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join('|'), rootMargin]);

  return active;
}
