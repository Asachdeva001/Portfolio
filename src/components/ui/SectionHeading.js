'use client';

import { motion } from 'framer-motion';
import { fadeInVariants } from '@/utils/animations';

/**
 * Section heading component with consistent styling
 * @param {Object} props - Component props
 * @param {string} props.title - Heading text
 * @param {string} props.subtitle - Optional subtitle text
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.centered - Center align the heading
 */
export default function SectionHeading({
  title,
  subtitle,
  className = '',
  centered = true
}) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInVariants}
      className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
