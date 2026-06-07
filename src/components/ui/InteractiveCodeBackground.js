'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeProvider';

export default function InteractiveCodeBackground() {
  const canvasRef = useRef(null);
  const { theme } = useRef({ theme: 'cyberpunk' }); // fallback
  const currentTheme = useTheme()?.theme || 'cyberpunk';
  
  // Keep theme ref updated for the animation loop
  const themeRef = useRef(currentTheme);
  useEffect(() => {
    themeRef.current = currentTheme;
  }, [currentTheme]);

  // Mouse tracking state
  const mouseRef = useRef({ x: null, y: null, radius: 120 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Re-initialize layouts if resize happens
      initConstellation();
      initMatrix();
    };

    // Track mouse coordinates
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Get color config based on active theme
    const getThemeColors = (activeTheme) => {
      switch (activeTheme) {
        case 'cosmic':
          return {
            particle: 'rgba(168, 85, 247, 0.35)', // Purple
            line: 'rgba(6, 182, 212, 0.12)', // Cyan line
            text: '#06b6d4',
          };
        case 'gold':
          return {
            particle: 'rgba(249, 210, 157, 0.3)', // Gold
            line: 'rgba(249, 210, 157, 0.08)',
            text: '#F9D29D',
          };
        case 'matrix':
          return {
            particle: 'rgba(34, 197, 94, 0.35)',
            line: 'rgba(34, 197, 94, 0.08)',
            text: '#22c55e', // Emerald
            textLight: '#86efac',
          };
        case 'cyberpunk':
        default:
          return {
            particle: 'rgba(141, 177, 164, 0.35)', // Mint green
            line: 'rgba(249, 210, 157, 0.08)', // Gold-ish line
            text: '#8DB1A4',
          };
      }
    };

    // ----------------------------------------------------
    // CONSTELATION MODE INITIALIZATION
    // ----------------------------------------------------
    let particles = [];
    const maxParticles = Math.min(100, Math.floor((width * height) / 10000)); // Density based on screen area

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction: push away or pull in slightly
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = this.x - mouseRef.current.x;
          const dy = this.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouseRef.current.radius) {
            // Apply slight steering force
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            this.x += (dx / dist) * force * 0.8;
            this.y += (dy / dist) * force * 0.8;
          }
        }
      }

      draw() {
        const colors = getThemeColors(themeRef.current);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle || 'rgba(141, 177, 164, 0.3)';
        ctx.fill();
      }
    }

    const initConstellation = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
      }
    };

    initConstellation();

    const drawConstellation = () => {
      ctx.clearRect(0, 0, width, height);
      const colors = getThemeColors(themeRef.current);

      // Draw and update particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Connect lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.15;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = colors.line ? colors.line.replace(/[\d.]+\)$/, `${alpha})`) : 'rgba(141, 177, 164, 0.1)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const p = particles[i];
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRef.current.radius) {
            const alpha = (1 - dist / mouseRef.current.radius) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = colors.line ? colors.line.replace(/[\d.]+\)$/, `${alpha})`) : 'rgba(141, 177, 164, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    // ----------------------------------------------------
    // MATRIX MODE INITIALIZATION
    // ----------------------------------------------------
    const fontSize = 14;
    let columns = Math.floor(width / fontSize) + 1;
    let drops = [];
    
    // Coding symbols for developer matrix vibe
    const matrixChars = "01<>{}[]();:+-=/*!@#$%^&*&_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const initMatrix = () => {
      columns = Math.floor(width / fontSize) + 1;
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Offset start heights for staggered rain effect
      }
    };

    initMatrix();

    const drawMatrix = () => {
      // Create a semi-transparent black background fade effect
      ctx.fillStyle = 'rgba(5, 7, 7, 0.08)';
      ctx.fillRect(0, 0, width, height);

      const colors = getThemeColors(themeRef.current);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Select random character
        const char = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        
        // Stagger head character color (bright white/green)
        const isHead = Math.random() > 0.98;
        ctx.fillStyle = isHead ? colors.textLight : colors.text;

        // Draw the character
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop to top if it reaches bottom (with random delay offset)
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop downwards
        drops[i]++;
      }
    };

    // ----------------------------------------------------
    // MAIN TICK LOOP
    // ----------------------------------------------------
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // Cap at 30 FPS for Matrix mode performance, 60 FPS for nodes

    const tick = (timestamp) => {
      const activeTheme = themeRef.current;

      if (activeTheme === 'matrix') {
        const elapsed = timestamp - lastTime;
        if (elapsed > fpsInterval) {
          lastTime = timestamp - (elapsed % fpsInterval);
          drawMatrix();
        }
      } else {
        drawConstellation();
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-transparent"
      style={{ opacity: currentTheme === 'matrix' ? 0.35 : 0.65 }}
    />
  );
}
