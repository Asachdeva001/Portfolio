'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '../ThemeProvider';

function ParticleSystem() {
  const pointsRef = useRef();
  const { theme } = useTheme();

  // Select particle color dynamically based on active theme
  const particleColor = useMemo(() => {
    switch (theme) {
      case 'cosmic':
        return new THREE.Color('#a855f7');
      case 'gold':
        return new THREE.Color('#F9D29D');
      case 'matrix':
        return new THREE.Color('#22c55e');
      case 'cyberpunk':
      default:
        return new THREE.Color('#8DB1A4');
    }
  }, [theme]);

  const count = 900;
  
  // Generate stable random particle positions distributed inside a shell
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 12 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return [pos];
  }, []);

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse to coordinates between -1 and 1
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Smooth lerp for mouse coords to create fluid motion lag
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    // Slowly rotate the coordinate space
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.015 + mouse.current.x * 0.4;
    pointsRef.current.rotation.x = time * 0.008 + mouse.current.y * 0.4;

    // Apply active color theme
    pointsRef.current.material.color = particleColor;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.4} />
        <ParticleSystem />
      </Canvas>
    </div>
  );
}
