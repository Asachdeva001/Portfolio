'use client';

import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemVariants } from '@/utils/animations';

/**
 * StaggerContainer animation wrapper component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to animate
 * @param {number} props.staggerDelay - Delay between each child animation
 * @param {string} props.className - Additional CSS classes
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.12,
  className = ''
}) {
  const customVariants = {
    ...staggerContainerVariants,
    visible: {
      ...staggerContainerVariants.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={customVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem component to be used inside StaggerContainer
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.className - Additional CSS classes
 */
export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export default StaggerContainer;
