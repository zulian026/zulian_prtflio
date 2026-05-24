// components/Navbar.jsx — Floating minimal navbar with cinematic delayed entrance

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { navLinks } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../hooks/useLenis';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

export default function Navbar({ isRevealing }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const headerRef = useRef(null);
  const hasRun = useRef(false);
  const { isDark } = useTheme();

  // Scroll shadow detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cinematic delayed entrance — slides down last in the sequence
  useEffect(() => {
    if (!isRevealing || hasRun.current) return;
    hasRun.current = true;

    // Navbar is the final element to arrive — premium "everything settles" feel
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 1.3, // arrives after all hero elements have settled
      }
    );
  }, [isRevealing]);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToSection(href);
  };

  const isActive = (href) => activeSection === href.replace('#', '');

  return (
    <>
      {/* Desktop Navbar — starts invisible, GSAP reveals it */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[100] navbar-cinematic"
        style={{ paddingTop: '24px', opacity: 0 }}
      >
        <div className="container">
          <div
            className="flex items-center justify-between px-6 py-3 rounded-xl transition-all duration-500"
          style={{
              background: scrolled ? 'var(--surface-glass)' : 'transparent',
              backdropFilter: scrolled ? 'blur(20px)' : 'none',
              WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
              borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
            }}
          >
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNav(e, '#hero')}
              className="flex items-center gap-2"
            >
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px',
                color: 'var(--text-3)',
                letterSpacing: '0.1em',
              }}>
                ZY
              </span>
            </a>

            {/* Center: Nav items */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className={`nav-item ${isActive(link.href) ? 'active' : ''}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right: CTA + Theme Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle inNav />
              <a
                href="#contact"
                onClick={(e) => handleNav(e, '#contact')}
                className="cta-link cta-link-primary"
                style={{ fontSize: '13px' }}
              >
                Get in touch
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[1px] bg-white/40 origin-center"
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
                className="block w-5 h-[1px] bg-white/40"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[1px] bg-white/40 origin-center"
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] flex flex-col items-start justify-end pb-16 px-8"
            style={{
              background: isDark ? 'rgba(10,10,10,0.97)' : 'rgba(247,247,245,0.97)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  className={`mobile-nav-link ${isActive(link.href) ? 'active' : ''}`}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
