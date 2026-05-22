// sections/Projects.jsx — Premium cinematic project showcase
// Layout: 2 large featured cards (top) + 4 smaller cards (bottom grid)
// Hover: grayscale → color, zoom, overlay content reveal
// Scroll: stagger fade-up via Framer Motion useInView

import { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/portfolio';
import SectionWrapper from '../components/SectionWrapper';
import { RiArrowRightUpLine, RiGithubLine, RiArrowRightLine } from 'react-icons/ri';

// ── Mouse-tracking glow helper ─────────────────────────────
function useMouseGlow() {
  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mx', `${x}%`);
    e.currentTarget.style.setProperty('--my', `${y}%`);
  }, []);
  return onMouseMove;
}

// ── Featured card — large 16:9, full info on hover ─────────
function FeaturedCard({ project, index, delay = 0 }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  const onMouseMove = useMouseGlow();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="project-card"
      onMouseMove={onMouseMove}
      style={{ borderRadius: '4px', overflow: 'hidden' }}
    >
      {/* Thumbnail */}
      <div className="project-thumb-wrap ratio-cinematic">
        <img
          src={project.image}
          alt={project.title}
          className="project-thumb-img"
          loading="lazy"
          decoding="async"
        />
        <div className="project-thumb-overlay" />

        {/* Top-left index */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '20px',
          zIndex: 2,
        }}>
          <span className="project-index-num">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Bottom content — slides up on hover */}
        <div className="project-thumb-content">
          <span className="project-badge">{project.category}</span>
          <h3 className={`project-thumb-title project-thumb-title-lg`}>
            {project.title}
          </h3>
        </div>
      </div>

      {/* Meta bar */}
      <div className="project-meta-bar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p className="project-desc-text">{project.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="project-tag-sm">{t}</span>
            ))}
            {project.tech.length > 4 && (
              <span className="project-tag-sm">+{project.tech.length - 4}</span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
          <span className="project-year">{project.year}</span>
          <div className="project-links-row">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-icon-btn"
                aria-label="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <RiGithubLine size={13} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-icon-btn"
                aria-label="Live"
                onClick={(e) => e.stopPropagation()}
              >
                <RiArrowRightUpLine size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Secondary card — compact 4:3, minimal info ──────────────
function SecondaryCard({ project, index, delay = 0 }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-4% 0px' });
  const onMouseMove = useMouseGlow();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="project-card"
      onMouseMove={onMouseMove}
      style={{ borderRadius: '4px', overflow: 'hidden' }}
    >
      <div className="project-thumb-wrap ratio-square">
        <img
          src={project.image}
          alt={project.title}
          className="project-thumb-img"
          loading="lazy"
          decoding="async"
        />
        <div className="project-thumb-overlay" />

        {/* Index label */}
        <div style={{ position: 'absolute', top: '14px', left: '16px', zIndex: 2 }}>
          <span className="project-index-num">{String(index + 1).padStart(2, '0')}</span>
        </div>

        {/* Bottom content */}
        <div className="project-thumb-content">
          <span className="project-badge">{project.category}</span>
          <h3 className="project-thumb-title">{project.title}</h3>
        </div>
      </div>

      {/* Minimal meta bar */}
      <div className="project-meta-bar" style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {project.tech.slice(0, 2).map((t) => (
            <span key={t} className="project-tag-sm">{t}</span>
          ))}
          {project.tech.length > 2 && (
            <span className="project-tag-sm">+{project.tech.length - 2}</span>
          )}
        </div>

        <div className="project-links-row">
          <span className="project-year">{project.year}</span>
          {(project.live || project.github) && (
            <a
              href={project.live || project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-icon-btn"
              aria-label="View project"
              onClick={(e) => e.stopPropagation()}
              style={{ width: '26px', height: '26px' }}
            >
              <RiArrowRightUpLine size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Projects Section ──────────────────────────────────
export default function Projects() {
  const headerRef = useRef(null);
  const inView    = useInView(headerRef, { once: true, margin: '-10% 0px' });

  const featured   = projects.filter((p) => p.featured);    // 3 items
  const secondary  = projects.filter((p) => !p.featured);   // 3 items

  // For the featured grid: show first 2 as large cards
  const featuredTop    = featured.slice(0, 2);
  // Third featured + all secondary go into the 4-column grid
  const secondaryCards = [...featured.slice(2), ...secondary];

  return (
    <SectionWrapper id="projects">
      <div className="container">
        {/* ── Section Header ── */}
        <div
          ref={headerRef}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-label"
              style={{ marginBottom: '14px' }}
            >
              Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-display-sm"
              style={{ color: '#fafafa' }}
            >
              Projects
            </motion.h2>
          </div>

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              marginBottom: '6px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
          >
            <RiGithubLine size={13} />
            All projects
            <RiArrowRightUpLine size={12} />
          </motion.a>
        </div>
      </div>

      {/* ── Full-bleed showcase grid (no container padding) ── */}
      <div style={{ paddingLeft: '0', paddingRight: '0' }}>

        {/* Featured row — 2 large 16:9 cards */}
        <div
          className="projects-featured-grid"
          style={{ paddingLeft: '32px', paddingRight: '32px', maxWidth: '1040px', margin: '0 auto 2px' }}
        >
          {featuredTop.map((project, i) => (
            <FeaturedCard
              key={project.id}
              project={project}
              index={i}
              delay={i * 0.08}
            />
          ))}
        </div>

        {/* Secondary grid — 4 cards */}
        <div
          className="projects-secondary-grid"
          style={{ paddingLeft: '32px', paddingRight: '32px', maxWidth: '1040px', margin: '0 auto' }}
        >
          {secondaryCards.map((project, i) => (
            <SecondaryCard
              key={project.id}
              project={project}
              index={i + 3}
              delay={0.1 + i * 0.06}
            />
          ))}
        </div>

      </div>

      {/* ── View all footer ── */}
      <div className="container">
        <div className="projects-view-all">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              padding: '10px 20px',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            View all on GitHub
            <RiArrowRightLine size={13} />
          </motion.a>
        </div>
      </div>
    </SectionWrapper>
  );
}
