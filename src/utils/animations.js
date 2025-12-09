/**
 * Animation variants for Framer Motion
 */

export const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const slideInLeftVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
};

export const slideInRightVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

export const scaleInVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export const wordAnimationVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
      mass: 0.5
    }
  }
};

export const hoverScaleVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

export const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: { 
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

/**
 * Creates a custom transition configuration
 * @param {number} duration - Duration in seconds
 * @param {number} delay - Delay in seconds
 * @param {string} ease - Easing function
 * @returns {Object} - Transition configuration
 */
export function createTransition(duration = 0.5, delay = 0, ease = 'easeInOut') {
  return {
    duration,
    delay,
    ease
  };
}

/**
 * Creates a spring transition configuration
 * @param {number} stiffness - Spring stiffness
 * @param {number} damping - Spring damping
 * @param {number} mass - Spring mass
 * @returns {Object} - Spring transition configuration
 */
export function createSpringTransition(stiffness = 100, damping = 15, mass = 0.5) {
  return {
    type: 'spring',
    stiffness,
    damping,
    mass
  };
}

/**
 * Checks if user prefers reduced motion
 * @returns {boolean} - True if reduced motion is preferred
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Gets animation variants with reduced motion support
 * @param {Object} variants - Animation variants
 * @returns {Object} - Variants with reduced motion fallback
 */
export function getAccessibleVariants(variants) {
  if (prefersReducedMotion()) {
    // Return instant transitions for reduced motion
    return {
      initial: variants.initial,
      animate: { ...variants.animate, transition: { duration: 0 } },
      exit: variants.exit ? { ...variants.exit, transition: { duration: 0 } } : undefined
    };
  }
  return variants;
}
