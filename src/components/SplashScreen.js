'use client';

import { motion } from 'framer-motion';

const AnimatedAS = () => (
  <motion.svg
    width="320"
    height="140"
    viewBox="0 0 320 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto"
  >
    <defs>
      <linearGradient id="as-gradient" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563eb" />
        <stop offset="1" stopColor="#38bdf8" />
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
      style={{ transformOrigin: '160px 70px' }}
    >
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Montserrat, Inter, Arial, sans-serif"
        fontWeight="900"
        fontSize="120"
        stroke="url(#as-gradient)"
        strokeWidth="6"
        fill="white"
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
          filter: 'drop-shadow(0 4px 24px rgba(37,99,235,0.3))',
        }}
      >
        AS
      </motion.text>
    </motion.g>
  </motion.svg>
);

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-900">
      <AnimatedAS />
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-4 text-3xl md:text-4xl font-bold text-gray-100 text-center"
      >
        Aashish Sachdeva
      </motion.h1>
    </div>
  );
};

export default SplashScreen; 