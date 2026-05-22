// sections/Contact.jsx — Minimal contact section

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal, socialLinks } from '../data/portfolio';
import SectionWrapper from '../components/SectionWrapper';
import {
  RiGithubLine,
  RiLinkedinLine,
  RiTwitterXLine,
  RiMailLine,
  RiArrowRightLine,
} from 'react-icons/ri';

const iconMap = {
  github: RiGithubLine,
  linkedin: RiLinkedinLine,
  twitter: RiTwitterXLine,
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <SectionWrapper id="contact">
      <div className="container" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-label"
          style={{ marginBottom: '16px' }}
        >
          Contact
        </motion.p>

        {/* Big CTA headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-display"
          style={{
            color: '#fafafa',
            maxWidth: '700px',
            marginBottom: '48px',
          }}
        >
          Let's build something together.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
        >
          {/* Primary email CTA */}
          <a
            href={`mailto:${personal.email}`}
            className="cta-link"
            style={{
              fontSize: 'clamp(20px, 3vw, 32px)',
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'color 0.25s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            {personal.email}
            <RiArrowRightLine size={24} style={{ opacity: 0.4 }} />
          </a>

          {/* Divider */}
          <div className="divider" />

          {/* Social links + location */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', gap: '24px' }}>
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                    style={{ gap: '6px', fontSize: '13px' }}
                  >
                    <Icon size={14} />
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.4)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.2)',
                  fontWeight: 300,
                }}
              >
                {personal.location}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
