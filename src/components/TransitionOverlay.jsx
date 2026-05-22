// components/TransitionOverlay.jsx
// Cinematic bridge layer — white flash + vignette wipe that sits between
// the loading world and the hero world. Fires once, cleans up after itself.

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function TransitionOverlay({ fire }) {
  const flashRef    = useRef(null);
  const vignetteRef = useRef(null);
  const noiseRef    = useRef(null);
  const hasRun      = useRef(false);

  useEffect(() => {
    if (!fire || hasRun.current) return;
    hasRun.current = true;

    // ── Master cinematic bridge timeline ────────────────────────
    const tl = gsap.timeline();

    // 1. Noise grain intensifies — mimics analog camera moment
    tl.to(noiseRef.current, {
      opacity: 0.06,
      duration: 0.25,
      ease: 'power2.out',
    }, 0)

    // 2. Radial vignette blooms in from dark → frames the flash
    .to(vignetteRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power3.out',
    }, 0)

    // 3. White flash — the cinematic "shutter" moment
    .to(flashRef.current, {
      opacity: 0.22,
      duration: 0.18,
      ease: 'power3.out',
    }, 0.15)
    .to(flashRef.current, {
      opacity: 0,
      duration: 0.55,
      ease: 'power2.inOut',
    }, 0.33)

    // 4. Vignette recedes — hero world opens up
    .to(vignetteRef.current, {
      opacity: 0,
      duration: 1.1,
      ease: 'power2.out',
    }, 0.35)

    // 5. Noise fades last — organic finish
    .to(noiseRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, 0.5);

    return () => tl.kill();
  }, [fire]);

  return (
    <div aria-hidden="true" className="transition-overlay">
      {/* Radial vignette — blooms from dark edges, frames the flash */}
      <div ref={vignetteRef} className="transition-vignette" />

      {/* White shutter flash */}
      <div ref={flashRef} className="transition-flash" />

      {/* Film grain layer that intensifies briefly */}
      <div
        ref={noiseRef}
        className="noise-dissolve"
        style={{ animation: 'noise-drift 0.4s steps(3) infinite' }}
      />
    </div>
  );
}
