// sections/About.jsx — Bio + Stats · Education Timeline · Certificates & Achievements

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personal, stats, education, certificates } from '../data/portfolio';
import SectionWrapper from '../components/SectionWrapper';
import { revealUp, revealLeft, revealRight } from '../animations/variants';
import { RiExternalLinkLine } from 'react-icons/ri';

gsap.registerPlugin(ScrollTrigger);

// ─── Education ─────────────────────────────────────────────

const badgeClass = {
  Graduate: 'graduate',
  Milestone: 'milestone',
  Ongoing: 'ongoing',
};

function EduItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.div
      ref={ref}
      className="edu-item"
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`edu-dot${item.status === 'Ongoing' ? ' is-ongoing' : ''}`} />
      <div className="edu-year">
        {item.year}
        <span className={`edu-badge ${badgeClass[item.status] ?? 'milestone'}`}>
          {item.status}
        </span>
      </div>
      <div className="edu-institution">{item.institution}</div>
      <div className="edu-field">{item.field}</div>
      <div className="edu-period">{item.period}</div>
      <p className="edu-description">{item.description}</p>
      {item.achievement && (
        <div className="edu-achievement">
          <span style={{ opacity: 0.5, fontSize: '8px' }}>✦</span>
          {item.achievement}
        </div>
      )}
    </motion.div>
  );
}

function EducationTimeline() {
  const wrapRef = useRef(null);
  const lineRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current || !lineRef.current || !fillRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, { height: '100%' });
      gsap.set(fillRef.current, { height: '100%' });
      gsap.fromTo(fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 1.5,
          },
        }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="edu-timeline">
      <div ref={lineRef} className="edu-timeline-line" />
      <div ref={fillRef} className="edu-timeline-line-fill" />
      {education.map((item, i) => (
        <EduItem key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}


// ─── Main About Section ────────────────────────────────────

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const eduHeaderRef = useRef(null);
  const eduHeaderView = useInView(eduHeaderRef, { once: true, margin: '-8% 0px' });

  return (
    <SectionWrapper id="about">
      <div className="container" ref={ref}>

        {/* ── Section label ── */}
        <motion.p
          variants={revealUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-label mb-20"
        >
          About
        </motion.p>

        {/* ── Two column: bio + stats ── */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}
          className="responsive-grid-about"
        >
          {/* Left: Bio */}
          <motion.div variants={revealLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <p style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 300, lineHeight: 1.6, color: '#fafafa', letterSpacing: '-0.01em' }}>
              {personal.bio}
            </p>
            <p style={{ marginTop: '24px', fontSize: '15px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.4)' }}>
              {personal.bio2}
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
              {[
                { label: personal.email, href: `mailto:${personal.email}` },
                { label: 'GitHub', href: personal.github },
                { label: 'LinkedIn', href: personal.linkedin },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="contact-link"
                  style={{ fontSize: '13px' }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats + Availability */}
          <motion.div variants={revealRight} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
              {stats.map((stat) => (
                <div key={stat.label} style={{ padding: '32px 28px', background: '#0a0a0a' }}>
                  <div className="stat-num">{stat.value}</div>
                  <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '24px', padding: '20px 24px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 400, color: '#fafafa' }}>Open to new opportunities</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>Remote · {personal.location}</div>
              </div>
            </div>
          </motion.div>
        </div>





      </div>

      <style>{`
        @media (max-width: 768px) {
          .responsive-grid-about {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </SectionWrapper>
  );
}
