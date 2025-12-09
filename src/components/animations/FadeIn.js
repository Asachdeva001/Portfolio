'use client';

import { motion } from 'framer-motion';
import { fadeInVariants } from '@/utils/animations';

/**
 * FadeIn animation wrapper component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to animate
 * @param {number} props.delay - Animation delay in seconds
 * @param {number} props.duration - Animation duration in seconds
 * @param {string} props.className - Additional CSS classes
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  className = ''
}) {
  const customVariants = {
    ...fadeInVariants,
    animate: {
      ...fadeInVariants.animate,
      transition: { duration, delay }
    }
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={customVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
