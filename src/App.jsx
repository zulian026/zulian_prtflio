// App.jsx — Root orchestrator with cinematic simultaneous-mount strategy
//
// Architecture:
//   Both LoadingScreen and the main app are mounted at the same time.
//   Loading sits on top at z-index 9999.
//   Main content starts invisible (opacity: 0).
//   When LoadingScreen's complete callback fires, we:
//     1. Unmount LoadingScreen (Three.js cleanup)
//     2. Fire TransitionOverlay flash (white shutter + vignette)
//     3. Fade in main content with GSAP
//     4. Signal Hero + Navbar to begin their cinematic entrances

import { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import TransitionOverlay from './components/TransitionOverlay';
import { useLenis } from './hooks/useLenis';
import { useCursor } from './hooks/useCursor';

export default function App() {
  const [loading, setLoading]       = useState(true);
  const [overlayFire, setOverlayFire] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const mainRef = useRef(null);

  useLenis();
  useCursor();

  const handleLoadingComplete = useCallback(() => {
    // 1. Unmount loading screen (Three.js GL context freed)
    setLoading(false);

    // 2. Fire the transition overlay (flash + vignette)
    setOverlayFire(true);

    // 3. Fade in main content — slight delay so flash is mid-peak
    gsap.to(mainRef.current, {
      opacity: 1,
      duration: 0.9,
      ease: 'power2.out',
      delay: 0.12,
    });

    // 4. Trigger cinematic Hero + Navbar entrances
    //    Small delay so elements start after main is partially visible
    setTimeout(() => setIsRevealing(true), 200);
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor-dot" />
      <div className="cursor-ring" />

      {/* Film grain overlay */}
      <div className="noise" />

      {/* Loading — mounted until complete, then cleanly unmounted */}
      {loading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Cinematic bridge — fires once on transition */}
      <TransitionOverlay fire={overlayFire} />

      {/* Main app — always in DOM but starts invisible.
          This lets HeroScene's Three.js warm up during loading. */}
      <div
        ref={mainRef}
        className="app-main-reveal"
        style={{ opacity: 0 }}
        aria-hidden={loading}
      >
        <Navbar isRevealing={isRevealing} />
        <Home isRevealing={isRevealing} />
      </div>
    </>
  );
}
