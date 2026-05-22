// components/LoadingScreen.jsx — Cinematic 4-act loading sequence
//
// ACT 1 (0 – 2.2s)   Name + bar + counter animate in
// ACT 2 (2.2 – 3.0s) UI elements exit up, 3D scene begins dissolving
// ACT 3 (3.0 – 3.4s) Container fades to black → calls onComplete
//
// The parent App simultaneously:
//   - Unmounts this component (Three.js cleanup)
//   - Fires TransitionOverlay flash + fades in main content

import { useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';

const LoadingScene = lazy(() => import('../three/LoadingScene'));

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const uiGroupRef   = useRef(null);
  const nameRef      = useRef(null);
  const lineRef      = useRef(null);
  const counterRef   = useRef(null);
  const subtitleRef  = useRef(null);
  const count        = useRef({ n: 0 });
  const dissolveRef  = useRef(false);

  // Bubble up from Three.js when 3D dissolve finishes
  const handle3DDissolveComplete = () => {
    // Container fade — last step before onComplete
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete,
    });
  };

  useEffect(() => {
    // ── ACT 1: Loading animation ─────────────────────────────
    const tl = gsap.timeline();

    // 0.0s — Name appears with a whisper
    tl.fromTo(nameRef.current,
      { opacity: 0, y: 14, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' },
      0
    )

    // 0.2s — Subtitle fades up after name
    .fromTo(subtitleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.9, ease: 'power2.out' },
      0.3
    )

    // 0.35s — Progress bar grows from left
    .fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.85, ease: 'power2.inOut' },
      0.35
    )

    // 0.35s — Counter climbs 0 → 100
    .to(count.current, {
      n: 100,
      duration: 1.85,
      ease: 'power2.inOut',
      onUpdate() {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(count.current.n) + '%';
        }
      },
    }, 0.35)

    // ── ACT 2: Dissolve sequence ──────────────────────────────

    // 2.2s — UI group exits upward (name, bar, counter)
    .to(uiGroupRef.current, {
      opacity: 0,
      y: -18,
      filter: 'blur(4px)',
      duration: 0.55,
      ease: 'power3.in',
    }, 2.2)

    // 2.35s — Trigger the Three.js dissolve
    .call(() => {
      dissolveRef.current = true;
    }, [], 2.35);

    // ── ACT 3: Container exit ─────────────────────────────────
    // handle3DDissolveComplete will fire when the 3D animation ends (~1.3s after dissolveRef = true)
    // giving enough time for the orb to fully fade (~3.65s total).

    return () => tl.kill();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#0a0a0a', overflow: 'hidden' }}
    >
      {/* ── Three.js immersive background — dissolves on cue ── */}
      <Suspense fallback={null}>
        <LoadingScene
          dissolveRef={dissolveRef}
          onDissolveComplete={handle3DDissolveComplete}
        />
      </Suspense>

      {/* ── Film grain ── */}
      <div className="noise" />

      {/* ── Radial vignette — cinematic depth ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 30%, rgba(10,10,10,0.75) 100%)',
        }}
      />

      {/* ── Bottom gradient fade ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          zIndex: 1,
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent, rgba(10,10,10,0.97))',
        }}
      />

      {/* ── Loading UI — ACT 1 elements ── */}
      <div ref={uiGroupRef} className="loader-ui-group" style={{ position: 'relative', zIndex: 10 }}>

        {/* Name / brand */}
        <p
          ref={nameRef}
          className="loader-name"
          style={{ opacity: 0, letterSpacing: '0.32em' }}
        >
          Zulian Alhisyam
        </p>

        {/* Progress track */}
        <div
          style={{
            position: 'relative',
            width: '192px',
            height: '1px',
            background: 'rgba(255,255,255,0.06)',
            overflow: 'hidden',
            borderRadius: '1px',
          }}
        >
          {/* Animated fill */}
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              inset: 0,
              transformOrigin: 'left',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.45) 100%)',
              transform: 'scaleX(0)',
              borderRadius: '1px',
            }}
          />

          {/* Shimmer sweep */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer-sweep 2.4s ease-in-out infinite',
              transformOrigin: 'left',
            }}
          />
        </div>

        {/* Counter row */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span
            ref={counterRef}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.22)',
              letterSpacing: '0.12em',
            }}
          >
            0%
          </span>
          <span ref={subtitleRef} className="loader-subtitle" style={{ opacity: 0 }}>
            Loading experience
          </span>
        </div>

      </div>
    </div>
  );
}
