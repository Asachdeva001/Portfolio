'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import Button from '@/components/ui/Button';
import { loadDataSync } from '@/lib/dataLoader';
import personalData from '@/data/personal';
import dynamic from 'next/dynamic';

const MorphingGlassShape = dynamic(() => import('@/components/ui/MorphingGlassShape'), { ssr: false });
const TerminalWidget = dynamic(() => import('@/components/ui/TerminalWidget'), { ssr: false });

export default function HeroSection() {
  const personal = loadDataSync('personal', personalData);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 md:px-8 bg-transparent overflow-hidden">
      {/* Glowing backdrop blobs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[var(--primary)] opacity-[0.08] blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[var(--accent)] opacity-[0.05] blur-[120px] pointer-events-none animate-pulse-slow" />
      
      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Copy and Terminal Console */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col justify-center text-left space-y-6"
        >
          <div className="space-y-3">
            <span className="text-xs font-semibold tracking-widest uppercase font-mono block" style={{ color: 'var(--accent)' }}>
              &lt; Full Stack Developer &gt;
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Hi, I&apos;m <span className="text-gradient">{personal.name}</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed font-sans">
              {personal.tagline}
            </p>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-wrap gap-4 z-20">
            <Button href="/projects" variant="primary" className="glow-btn">
              View Work
            </Button>
            <Button href="/resume" variant="secondary">
              Resume
            </Button>
            <Button href="/contact" variant="secondary">
              Get in Touch
            </Button>
          </div>

          {/* Inline CLI terminal console */}
          <div className="w-full pt-4 z-10 hidden sm:block">
            <div className="text-xs text-neutral-400 mb-2.5 font-mono flex items-center space-x-1.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Interactive SSH console: type &quot;help&quot; to begin</span>
            </div>
            <TerminalWidget isInline={true} />
          </div>
        </motion.div>

        {/* Right Side: Interactive 3D Canvas */}
        <div className="lg:col-span-5 flex justify-center items-center relative min-h-[350px] md:min-h-[450px]">
          <div className="absolute inset-0 bg-radial-gradient from-[var(--primary)]/10 to-transparent blur-3xl pointer-events-none rounded-full w-full h-full" />
          <MorphingGlassShape />
        </div>
      </div>
      
      {/* Scroll Down Prompter */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-neutral-400 select-none z-10 pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest uppercase mb-1">Scroll to explore</span>
        <div className="animate-bounce">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--primary)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}