// hooks/useActiveSection.js — Track which section is currently in viewport

import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const element = document.querySelector(`#${id}`);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '-80px 0px -20% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
