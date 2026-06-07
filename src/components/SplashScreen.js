'use client';

import { motion } from 'framer-motion';

const AnimatedAS = () => (
  <motion.svg
    width="400"
    height="180"
    viewBox="0 0 400 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <defs>
      <linearGradient id="as-gradient" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--bg-color)" />
        <stop offset="0.5" stopColor="var(--primary)" />
        <stop offset="1" stopColor="var(--accent)" />
      </linearGradient>
    </defs>
    <motion.g
      initial={{ rotateX: 0, rotateY: 0, scale: 1 }}
      animate={{
        rotateX: [0, 18, -18, 0],
        rotateY: [0, -18, 18, 0],
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ transformOrigin: '200px 90px' }}
    >
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Montserrat, Inter, Arial, sans-serif"
        fontWeight="900"
        fontSize="150"
        stroke="url(#as-gradient)"
        strokeWidth="6"
        fill="rgba(var(--primary-rgb), 0.04)"
        initial={{
          strokeDasharray: 900,
          strokeDashoffset: 900,
          opacity: 0.7,
        }}
        animate={{
          strokeDashoffset: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          ease: 'easeInOut',
        }}
        style={{
          paintOrder: 'stroke fill',
          filter: 'drop-shadow(0 0 25px rgba(var(--primary-rgb), 0.65))',
        }}
      >
        AS
      </motion.text>
    </motion.g>
  </motion.svg>
);

const SplashScreen = () => {
  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-grid-overlay" 
      style={{ 
        background: 'var(--bg-gradient)' 
      }}
    >
      <div className="relative w-full h-full">
        <AnimatedAS />
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-[15%] text-4xl md:text-5xl font-bold text-center text-gradient animate-pulse-slow"
      >
        Aashish Sachdeva
      </motion.h1>
    </div>
  );
};

export default SplashScreen; 