// src/components/ThemeToggle.jsx
// Ultra-minimalist animated theme toggle button.
// - Glassmorphism pill with blur background
// - Framer Motion spring rotation + icon morph
// - Moon (dark) / Sun (light) icons from react-icons

import { motion, AnimatePresence } from 'framer-motion';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ inNav = false }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      id="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: inNav ? '34px' : '42px',
        height: inNav ? '34px' : '42px',
        borderRadius: '50%',
        background: 'var(--toggle-bg)',
        border: '1px solid var(--toggle-border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        cursor: 'pointer',
        outline: 'none',
        position: inNav ? 'relative' : 'fixed',
        bottom: inNav ? 'auto' : '28px',
        right: inNav ? 'auto' : '28px',
        zIndex: inNav ? 'auto' : 200,
        flexShrink: 0,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{ display: 'flex', color: 'var(--text-2)' }}
          >
            <RiMoonLine size={inNav ? 14 : 16} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{ display: 'flex', color: 'var(--text-2)' }}
          >
            <RiSunLine size={inNav ? 14 : 16} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
