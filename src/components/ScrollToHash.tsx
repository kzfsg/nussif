import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles scroll position across route changes.
 * Page navigations reset scroll instantly while the transition curtain
 * still covers the viewport; hash links poll until the target section
 * has mounted (the new page renders only after the exit animation).
 */
export default function ScrollToHash() {
  const { hash, pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (hash) {
      // New page content mounts after the curtain transition —
      // poll briefly until the anchor target exists.
      let attempts = 0;
      const tryScroll = () => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < 20) {
          attempts += 1;
          setTimeout(tryScroll, 100);
        }
      };
      setTimeout(tryScroll, 150);
    } else if (isFirstRender.current) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      // Reset scroll while the curtain covers the viewport
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 620);
    }
    isFirstRender.current = false;
  }, [hash, pathname]);

  return null;
}
