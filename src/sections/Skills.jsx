// sections/Skills.jsx — Clean list-based skills layout

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolio';
import SectionWrapper from '../components/SectionWrapper';
import { revealUp, stagger } from '../animations/variants';

const allGroups = Object.entries(skills);

function SkillGroup({ name, items, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Group label */}
      <p className="text-label" style={{ marginBottom: '16px' }}>{name}</p>

      {/* Items */}
      <div>
        {items.map((skill, i) => (
          <div key={skill.name} className="skill-item">
            <span
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {skill.name}
            </span>
            {/* Proficiency dots */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {[...Array(5)].map((_, di) => (
                <span
                  key={di}
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: di < Math.round(skill.level / 20)
                      ? 'rgba(255,255,255,0.6)'
                      : 'rgba(255,255,255,0.1)',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <SectionWrapper id="skills">
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-label mb-20"
        >
          Skills & Tools
        </motion.p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '64px 48px',
          }}
          className="responsive-grid-skills"
        >
          {allGroups.map(([name, items], i) => (
            <SkillGroup key={name} name={name} items={items} index={i} />
          ))}
        </div>

        {/* Thin bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            marginTop: '64px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.2)',
              maxWidth: '480px',
            }}
          >
            And more — always learning. Proficient in 20+ tools and constantly exploring new technologies at the intersection of design and engineering.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .responsive-grid-skills {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px 24px !important;
          }
        }
        @media (max-width: 480px) {
          .responsive-grid-skills {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </SectionWrapper>
  );
}
