// components/SectionHeader.jsx — Ultra-minimal section header

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { stagger, revealUp } from '../animations/variants';

export default function SectionHeader({ label, title, align = 'left', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`mb-20 ${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      {label && (
        <motion.p variants={revealUp} className="text-label mb-5">
          {label}
        </motion.p>
      )}
      <motion.h2 variants={revealUp} className="text-display-sm" style={{ color: '#fafafa' }}>
        {title}
      </motion.h2>
    </motion.div>
  );
}
