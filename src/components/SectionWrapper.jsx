// components/SectionWrapper.jsx — Scroll-triggered fade reveal

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SectionWrapper({ children, id, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`section-pad ${className}`}
    >
      {children}
    </motion.section>
  );
}
