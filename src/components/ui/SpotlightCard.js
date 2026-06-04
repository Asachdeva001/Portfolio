'use client';

import { useState, useRef } from 'react';

export default function SpotlightCard({ children, className = '', ...props }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  const handleMouseEnter = () => {
    setIsFocused(true);
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative glass-panel rounded-2xl overflow-hidden glass-panel-hover transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Glowing radial gradient backdrop that follows cursor */}
      {isFocused && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(var(--primary-rgb), 0.12), transparent 80%)`,
          }}
        />
      )}
      
      {/* Light border spotlight overlay using mask composite */}
      {isFocused && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(var(--primary-rgb), 0.45), transparent 75%)`,
            border: '1px solid transparent',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px',
            inset: 0,
            borderRadius: 'inherit'
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
