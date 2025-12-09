'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import Button from '@/components/ui/Button';
import { loadDataSync } from '@/lib/dataLoader';
import personalData from '@/data/personal';

export default function HeroSection() {
  const personal = loadDataSync('personal', personalData);

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Name */}
        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
          <AnimatedText text="Hi, I'm" />
          <AnimatedText
            text={personal.name}
            isGradient={true}
            gradientClass="bg-gradient-to-r from-[#F9D29D] to-[#F2B880] text-transparent bg-clip-text"
            delay={0.5}
          />
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          {personal.tagline}
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button href="/projects" variant="primary">
            View Projects
          </Button>
          
          <Button href="/resume" variant="secondary">
            View Resume
          </Button>
          
          <Button href="/contact" variant="secondary">
            Contact Me
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}