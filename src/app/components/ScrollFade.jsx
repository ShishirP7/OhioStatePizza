'use client';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const ScrollFade = ({ children, delay = 0, duration = 0.6 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      transition={{ duration, delay }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFade;
