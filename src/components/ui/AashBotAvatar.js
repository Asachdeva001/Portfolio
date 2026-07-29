'use client';

import { motion } from 'framer-motion';
import { useTerminal } from '../TerminalContext';

export default function AashBotAvatar({ size = 32 }) {
  const { isSpeaking, isListening } = useTerminal();

  // Scale the typography and borders proportionally to the layout size
  const fontSize = size * 0.46;
  const borderWidth = Math.max(1.5, size * 0.05);

  // Dynamic gradients based on current bot states
  const getGradient = () => {
    if (isListening) {
      // Urgent, warning coral-red gradient for voice recognition listening phase
      return 'linear-gradient(135deg, #ef4444 0%, #f43f5e 50%, #fda4af 100%)';
    }
    // High-tech, premium theme primary-accent gradient
    return 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)';
  };

  // Shadow/Glow colors matched to states
  const getGlowColor = () => {
    if (isListening) return 'rgba(239, 68, 68, 0.55)';
    return 'rgba(var(--primary-rgb), 0.45)';
  };

  return (
    <div 
      className="relative flex items-center justify-center select-none overflow-visible pointer-events-none"
      style={{ width: size, height: size, perspective: '200px' }}
    >
      {/* Primary 3D-rotating/scaling wrapper containing the letter logo */}
      <motion.div
        animate={
          isSpeaking
            ? { 
                rotateX: [0, 18, -18, 0],
                rotateY: [0, -18, 18, 0],
                scale: [1, 1.08, 1],
                boxShadow: [
                  `0 0 ${size * 0.25}px ${getGlowColor()}`,
                  `0 0 ${size * 0.45}px ${getGlowColor()}`,
                  `0 0 ${size * 0.25}px ${getGlowColor()}`
                ]
              }
            : isListening
              ? { 
                  scale: [1, 1.15, 1], // Breathing sonar pulse
                  boxShadow: [
                    `0 0 ${size * 0.25}px ${getGlowColor()}`,
                    `0 0 ${size * 0.55}px ${getGlowColor()}`,
                    `0 0 ${size * 0.25}px ${getGlowColor()}`
                  ]
                }
              : { 
                  scale: 1,
                  y: [0, -1, 0] // Soft floating offset when idle
                }
        }
        transition={{
          repeat: Infinity,
          duration: isSpeaking ? 2.5 : isListening ? 1.6 : 3,
          ease: 'easeInOut'
        }}
        className="w-full h-full rounded-full flex items-center justify-center relative border"
        style={{
          background: getGradient(),
          borderColor: isListening ? 'rgba(254, 226, 226, 0.85)' : 'rgba(255, 255, 255, 0.75)',
          boxShadow: `0 0 ${size * 0.25}px ${getGlowColor()}, inset 0 1.5px 3px rgba(255, 255, 255, 0.3)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Sonar radiating ring in speaking/listening modes */}
        {(isSpeaking || isListening) && (
          <motion.div
            className="absolute inset-[-4px] rounded-full pointer-events-none"
            style={{
              border: `1.5px solid ${isListening ? '#ef4444' : 'var(--primary)'}`,
            }}
            animate={{
              scale: [1, 1.35, 1.5],
              opacity: [0.7, 0.35, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: isSpeaking ? 0.5 : 1.2,
              ease: 'easeOut',
            }}
          />
        )}

        {/* Futuristic AI Emblem Logo */}
        <motion.div
          style={{
            width: size * 0.56,
            height: size * 0.56,
            color: 'var(--bg-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateZ(10px)',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          >
            {/* Sleek futuristic 4-point AI Neural Spark + Orbit nodes */}
            <path d="M12 1.5L14.8 9.2L22.5 12L14.8 14.8L12 22.5L9.2 14.8L1.5 12L9.2 9.2L12 1.5Z" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}