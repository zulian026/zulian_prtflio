// sections/Footer.jsx — Single-line minimal footer

import { motion } from 'framer-motion';
import { personal, navLinks } from '../data/portfolio';
import { scrollToSection } from '../hooks/useLenis';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '32px 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Left: Name */}
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '0.1em',
            }}
          >
            © {year} {personal.name}
          </span>

          {/* Center: Nav */}
          <nav style={{ display: 'flex', gap: '24px' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.15)',
                  letterSpacing: '0.06em',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.15)'}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Craft tag */}
          <span
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.1)',
              fontWeight: 300,
              letterSpacing: '0.04em',
            }}
          >
            Crafted with care
          </span>
        </div>
      </div>
    </footer>
  );
}
