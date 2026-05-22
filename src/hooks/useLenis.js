// hooks/useLenis.js — Initialize Lenis smooth scroll

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisInstance = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

export function scrollToSection(href) {
  if (!href) return;
  const target = document.querySelector(href);
  if (target && lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -80, duration: 1.5 });
  } else if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
