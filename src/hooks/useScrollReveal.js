import { useEffect } from 'react';

/**
 * useScrollReveal hook that smoothly observes elements matching reveal selectors
 * and adds the 'is-revealed' class with zero jank, generous margins, and no blank lags.
 */
export function useScrollReveal(selector = '.reveal-on-scroll, .section, .glass-card, .project-card, .skills-minimal-row, .edu-card, .about-bio-card') {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Immediately reveal elements that are already within or near the initial viewport
    const revealVisibleNow = () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight + 150) {
          el.classList.add('is-revealed');
        }
      });
    };

    revealVisibleNow();

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    // Generous rootMargin so elements start revealing smoothly before entering the screen,
    // eliminating any feeling of blank pages, delay, or stuck scrolling.
    const observerOptions = {
      root: null,
      rootMargin: '120px 0px 80px 0px',
      threshold: [0, 0.02],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeAll = () => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (!el.classList.contains('is-revealed')) {
          if (!el.classList.contains('reveal-on-scroll')) {
            el.classList.add('reveal-on-scroll');
          }
          observer.observe(el);
        }
      });
    };

    observeAll();

    // Single delayed re-check for dynamically loaded components
    const timer = setTimeout(observeAll, 350);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [selector]);
}

export default useScrollReveal;

