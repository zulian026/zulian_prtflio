// sections/Experience.jsx — Clean tabular experience list

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/portfolio';
import SectionWrapper from '../components/SectionWrapper';

function ExpRow({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="exp-row"
    >
      {/* Period */}
      <div>
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.04em',
          }}
        >
          {item.period}
        </span>
      </div>

      {/* Role + Company */}
      <div>
        <div style={{ fontSize: '14px', fontWeight: 400, color: '#fafafa', marginBottom: '4px' }}>
          {item.role}
        </div>
        <div style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>
          {item.company} · {item.location}
        </div>
      </div>

      {/* Description */}
      <div>
        <p
          style={{
            fontSize: '13px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.3)',
            lineHeight: 1.7,
          }}
        >
          {item.description}
        </p>
        {/* Tech */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
          {item.tech.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <SectionWrapper id="experience">
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-label"
          style={{ marginBottom: '16px' }}
        >
          Experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-display-sm"
          style={{ color: '#fafafa', marginBottom: '56px' }}
        >
          Journey
        </motion.h2>

        {/* Column headers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '24px',
            paddingBottom: '12px',
            marginBottom: '0',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
          className="exp-header"
        >
          {['Period', 'Role', 'Description'].map((h) => (
            <span key={h} className="text-label">{h}</span>
          ))}
        </motion.div>

        {/* Rows */}
        {experience.map((item, i) => (
          <ExpRow key={item.id} item={item} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .exp-header { display: none !important; }
        }
      `}</style>
    </SectionWrapper>
  );
}
