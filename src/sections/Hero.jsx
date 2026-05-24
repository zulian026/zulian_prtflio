// sections/Hero.jsx — Ultra-minimal full-screen hero with cinematic GSAP reveal
//
// Entrance timeline fires when isRevealing prop becomes true.
// All elements start invisible — nothing animates prematurely.

import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { personal, rotatingTexts, socialLinks } from '../data/portfolio';
import { scrollToSection } from '../hooks/useLenis';
import {
  RiGithubLine,
  RiLinkedinLine,
  RiTwitterXLine,
  RiArrowDownLine,
  RiArrowRightLine,
} from 'react-icons/ri';

const HeroScene = lazy(() => import('../three/HeroScene'));

const iconMap = {
  github: RiGithubLine,
  linkedin: RiLinkedinLine,
  twitter: RiTwitterXLine,
};

function RotatingText({ texts }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % texts.length);
        setVisible(true);
      }, 350);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <span
      style={{
        display: 'inline-block',
        color: 'var(--text-3)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-6px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease, color 0.45s ease',
        fontWeight: 200,
      }}
    >
      {texts[index]}
    </span>
  );
}

export default function Hero({ isRevealing }) {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const statusRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    // Gate: only fire once, and only after isRevealing
    if (!isRevealing || hasRun.current) return;
    hasRun.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 });

      // ── Ambient glow blooms from center ─────────────────────
      // Creates that premium "light source awakening" feel
      tl.fromTo(glowRef.current,
        { opacity: 0, scale: 0.5, filter: 'blur(60px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(40px)',
          duration: 1.8,
          ease: 'power3.out',
        },
        0
      )

        // ── Status badge slides in ──────────────────────────────
        .fromTo(statusRef.current,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
          0.15
        )

        // ── Headline line 1 — clip-path wipe from bottom ────────
        .fromTo(line1Ref.current,
          { clipPath: 'inset(0 0 100% 0)', y: 16 },
          {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            duration: 1.1,
            ease: 'power4.out',
          },
          0.2
        )

        // ── Headline line 2 — staggered after line 1 ────────────
        .fromTo(line2Ref.current,
          { clipPath: 'inset(0 0 100% 0)', y: 16 },
          {
            clipPath: 'inset(0 -10px 0% -2px)',
            y: 0,
            paddingBottom: '0.15em',
            marginBottom: '-0.15em',
            duration: 1.1,
            ease: 'power4.out',
          },
          0.38
        )

        // ── Subtitle paragraph fades up ──────────────────────────
        .fromTo(subRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          0.72
        )

        // ── CTA buttons appear ───────────────────────────────────
        .fromTo(ctaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.92
        )

        // ── Social + scroll hint settle last ────────────────────
        .fromTo(metaRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          1.15
        );
    }, heroRef);

    return () => ctx.revert();
  }, [isRevealing]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Three.js immersive background */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Ambient glow bloom — awakens during cinematic entrance */}
      <div ref={glowRef} className="hero-reveal-glow" />

      {/* Hero top glow line */}
      <div className="hero-glow" />

      <div className="container relative z-10">
        <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>

          {/* Status badge */}
          <div
            ref={statusRef}
            className="flex items-center gap-3 mb-12"
            style={{ opacity: 0 }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--text-2)',
                boxShadow: '0 0 8px var(--glow-strong)',
              }}
            />
            <span className="text-label" style={{ color: 'var(--text-3)' }}>
              Available for work · Padang, Indonesia
            </span>
          </div>

          {/* Main Headline */}
          <div className="mb-10">
            <div className="hero-line-wrap">
              <div
                ref={line1Ref}
                className="text-display"
                style={{ color: 'var(--text-1)', clipPath: 'inset(0 0 100% 0)' }}
              >
                {personal.name}
              </div>
            </div>
            <div className="hero-line-wrap">
              <div
                ref={line2Ref}
                className="text-display"
                style={{ clipPath: 'inset(0 0 100% 0)' }}
              >
                <RotatingText texts={rotatingTexts} />
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <p
            ref={subRef}
            style={{
              opacity: 0,
              maxWidth: '480px',
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'var(--text-2)',
              marginBottom: '40px',
            }}
          >
            Building premium web experiences with a focus on performance, motion, and clean design.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}
          >
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollToSection('#projects'); }}
              className="cta-link cta-link-primary"
            >
              View work
              <RiArrowRightLine size={14} />
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
              className="cta-link cta-link-ghost"
            >
              Get in touch
            </a>
          </div>

          {/* Social + Scroll hint */}
          <div
            ref={metaRef}
            style={{
              opacity: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '80px',
              paddingTop: '24px',
              borderTop: '1px solid var(--line)',
            }}
          >
            <div style={{ display: 'flex', gap: '20px' }}>
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'color 0.2s ease',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-2)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-3)'}
                    aria-label={link.label}
                  >
                    <Icon size={14} />
                    <span style={{ letterSpacing: '0.04em' }}>{link.label}</span>
                  </a>
                );
              })}
            </div>

            <div
              className="scroll-hint"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-3)',
              }}
            >
              <RiArrowDownLine size={14} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
