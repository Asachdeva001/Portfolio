'use client';

import { motion } from 'framer-motion';
import { wordAnimationVariants } from '@/utils/animations';

/**
 * Animated text component with word-by-word animation
 * @param {Object} props - Component props
 * @param {string} props.text - Text to animate
 * @param {boolean} props.isGradient - Apply gradient effect
 * @param {string} props.gradientClass - Custom gradient class
 * @param {number} props.delay - Animation delay
 * @param {string} props.className - Additional CSS classes
 */
export default function AnimatedText({
  text,
  isGradient = false,
  gradientClass = '',
  delay = 0,
  className = ''
}) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: delay + 0.1 * i,
        duration: 2
      }
    })
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap justify-center ${
        isGradient
          ? `${gradientClass || 'bg-gradient-to-r from-[#0A0F0D] via-[#2D4F4A] to-[#8DB1A4]'} bg-clip-text text-transparent`
          : ''
      } ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordAnimationVariants}
          style={{ marginRight: '5px' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
