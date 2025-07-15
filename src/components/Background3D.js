'use client';

import { motion } from 'framer-motion';

const blobs = [
  {
    style: 'top-[-10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-br from-[#0A0F0D] via-[#2D4F4A] to-[#8DB1A4]',
    animate: { x: [0, 40, -40, 0], y: [0, 30, -30, 0], rotate: [0, 30, -30, 0], scale: [1, 1.15, 1] },
    delay: 0,
  },
  {
    style: 'bottom-[-15%] right-[-10%] w-[350px] h-[350px] bg-gradient-to-br from-[#0A0F0D] via-[#2D4F4A] to-[#8DB1A4]',
    animate: { x: [0, -30, 30, 0], y: [0, -20, 20, 0], rotate: [0, -25, 25, 0], scale: [1, 1.1, 1] },
    delay: 0.5,
  },
  {
    style: 'top-[30%] right-[-12%] w-[300px] h-[300px] bg-gradient-to-br from-[#0A0F0D] via-[#2D4F4A] to-[#8DB1A4]',
    animate: { x: [0, 20, -20, 0], y: [0, 25, -25, 0], rotate: [0, 20, -20, 0], scale: [1, 1.12, 1] },
    delay: 1,
  },
];

const Background3D = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    {blobs.map((blob, i) => (
      <motion.div
        key={i}
        className={`absolute blur-3xl opacity-60 mix-blend-multiply ${blob.style}`}
        initial={{ x: 0, y: 0, scale: 1, rotate: 0 }}
        animate={blob.animate}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
          delay: blob.delay,
        }}
        style={{ borderRadius: '50%' }}
      />
    ))}
  </div>
);

export default Background3D; 