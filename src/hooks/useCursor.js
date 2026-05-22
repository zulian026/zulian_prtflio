// hooks/useCursor.js — Custom cursor with magnetic effects

import { useEffect } from 'react';
import gsap from 'gsap';

export function useCursor() {
  useEffect(() => {
    // Don't run on touch devices
    if ('ontouchstart' in window) return;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animFrame;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      gsap.set(ring, { x: ringX, y: ringY });
      animFrame = requestAnimationFrame(animateRing);
    };

    const onMouseEnterInteractive = () => {
      dot.classList.add('is-hovered');
      ring.classList.add('is-hovered');
    };

    const onMouseLeaveInteractive = () => {
      dot.classList.remove('is-hovered');
      ring.classList.remove('is-hovered');
    };

    document.addEventListener('mousemove', onMouseMove);
    animFrame = requestAnimationFrame(animateRing);

    // Attach to all interactive elements
    const attachInteractive = () => {
      const elements = document.querySelectorAll('a, button, [data-cursor-hover]');
      elements.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    attachInteractive();

    // Re-attach on DOM changes
    const observer = new MutationObserver(attachInteractive);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrame);
      observer.disconnect();
    };
  }, []);
}
