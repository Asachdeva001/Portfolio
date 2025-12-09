'use client';

import { motion } from 'framer-motion';
import { slideInLeftVariants, slideInRightVariants } from '@/utils/animations';

/**
 * SlideIn animation wrapper component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to animate
 * @param {string} props.direction - Slide direction ('left' or 'right')
 * @param {number} props.delay - Animation delay in seconds
 * @param {number} props.duration - Animation duration in seconds
 * @param {string} props.className - Additional CSS classes
 */
export default function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.6,
  className = ''
}) {
  const variants = direction === 'left' ? slideInLeftVariants : slideInRightVariants;
  
  const customVariants = {
    ...variants,
    animate: {
      ...variants.animate,
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
