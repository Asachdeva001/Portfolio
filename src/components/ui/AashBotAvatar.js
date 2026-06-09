'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTerminal } from '../TerminalContext';

export default function AashBotAvatar({ size = 32 }) {
  const { isSpeaking, isListening } = useTerminal();
  const [shiningIndex, setShiningIndex] = useState(0);

  // Smoothly cycle the shining blob every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setShiningIndex(prev => {
        let next = Math.floor(Math.random() * 4);
        // Ensure a new blob is picked to create continuous movement
        while (next === prev) {
          next = Math.floor(Math.random() * 4);
        }
        return next;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Custom keyframe styling for organic border-radius morphing
  const morphStyles = `
    @keyframes morph-blob-0 {
      0%, 100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
      50% { border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%; }
    }
    @keyframes morph-blob-1 {
      0%, 100% { border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%; }
      50% { border-radius: 30% 70% 70% 30% / 40% 60% 40% 60%; }
    }
    @keyframes morph-blob-2 {
      0%, 100% { border-radius: 50% 50% 70% 30% / 30% 60% 40% 70%; }
      50% { border-radius: 80% 20% 40% 60% / 60% 30% 70% 40%; }
    }
    @keyframes morph-blob-3 {
      0%, 100% { border-radius: 60% 40% 40% 60% / 40% 60% 50% 50%; }
      50% { border-radius: 40% 60% 60% 40% / 60% 40% 50% 50%; }
    }
  `;

  // Morph loop speed remains constant to prevent visual resets/snaps
  const animDuration = (idx) => {
    return `${6 + (idx * 1.2)}s`; // slow, organic loop (approx 6s to 10s)
  };

  // Gradients definition based on active states (listening turns warning red/corals)
  const getGradients = (idx) => {
    if (isListening) {
      const redGradients = [
        'linear-gradient(135deg, #ef4444 0%, #fda4af 100%)', // crimson to rose
        'linear-gradient(135deg, #ec4899 0%, #fca5a5 100%)', // pink to lightred
        'linear-gradient(135deg, #f43f5e 0%, #fbcfe8 100%)', // rose to pink
        'linear-gradient(135deg, #dc2626 0%, #fda4af 100%)'  // red to rose
      ];
      return redGradients[idx];
    }
    
    // Default theme-matched colors
    const themeGradients = [
      'linear-gradient(135deg, var(--primary) 0%, rgba(var(--primary-rgb), 0.3) 100%)',
      'linear-gradient(135deg, var(--accent) 0%, rgba(var(--accent-rgb), 0.3) 100%)',
      'linear-gradient(135deg, #10b981 0%, rgba(16, 185, 129, 0.35) 100%)', // emerald core
      'linear-gradient(135deg, #8b5cf6 0%, rgba(139, 92, 246, 0.35) 100%)'  // violet core
    ];
    return themeGradients[idx];
  };

  const blobs = [
    { className: 'top-0 left-0 w-[80%] h-[80%]', style: { animation: `morph-blob-0 infinite linear` } },
    { className: 'bottom-0 right-0 w-[78%] h-[78%]', style: { animation: `morph-blob-1 infinite linear` } },
    { className: 'top-1 right-0 w-[76%] h-[76%]', style: { animation: `morph-blob-2 infinite linear` } },
    { className: 'bottom-1 left-0 w-[75%] h-[75%]', style: { animation: `morph-blob-3 infinite linear` } }
  ];

  return (
    <div 
      className="relative flex items-center justify-center select-none overflow-visible pointer-events-none"
      style={{ width: size, height: size }}
    >
      <style dangerouslySetInnerHTML={{ __html: morphStyles }} />

      {/* Main core container applying dynamic scale wobble/vibration during speech */}
      <motion.div
        animate={
          isSpeaking
            ? { scale: [1, 1.06, 0.94, 1.04, 1] }
            : isListening
              ? { scale: [1, 1.12, 1] } // slow sonar breathe scale pulse
              : { scale: 1 }
        }
        transition={{
          repeat: isSpeaking || isListening ? Infinity : 0,
          duration: isSpeaking ? 0.35 : 1.8,
          ease: 'easeInOut'
        }}
        className="w-full h-full relative"
      >
        {blobs.map((blob, idx) => {
          const isShining = shiningIndex === idx;

          return (
            <div
              key={idx}
              className={`absolute rounded-full transition-all duration-500 ease-in-out ${blob.className}`}
              style={{
                ...blob.style,
                animationDuration: animDuration(idx),
                background: getGradients(idx),
                mixBlendMode: 'screen',
                opacity: isShining ? (isListening ? 0.95 : 0.85) : 0.55,
                transform: isShining ? 'scale(1.18)' : 'scale(0.92)',
                filter: isShining 
                  ? `brightness(1.45) contrast(1.1) drop-shadow(0 0 6px ${isListening ? '#ef4444' : 'var(--primary)'})`
                  : 'brightness(0.9) contrast(0.9)',
                zIndex: isShining ? 10 : 1,
                boxShadow: isShining ? `0 0 12px ${isListening ? 'rgba(239,68,68,0.4)' : 'rgba(var(--primary-rgb),0.3)'}` : 'none'
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}