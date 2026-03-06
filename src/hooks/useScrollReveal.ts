import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, ...options }
    );

    // Observe the element and all children with .fade-up
    const children = el.querySelectorAll('.fade-up');
    children.forEach((child) => observer.observe(child));
    if (el.classList.contains('fade-up')) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}
