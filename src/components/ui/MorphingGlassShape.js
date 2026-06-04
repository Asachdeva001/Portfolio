'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useTheme } from '../ThemeProvider';

function GlassObject() {
  const meshRef = useRef();
  const { theme } = useTheme();

  // Pick highlight colors matching the active theme
  const colors = useMemo(() => {
    switch (theme) {
      case 'cosmic':
        return { primary: '#a855f7', accent: '#06b6d4' };
      case 'gold':
        return { primary: '#F9D29D', accent: '#ffffff' };
      case 'matrix':
        return { primary: '#22c55e', accent: '#15803D' };
      case 'cyberpunk':
      default:
        return { primary: '#8DB1A4', accent: '#F9D29D' };
    }
  }, [theme]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow rotation
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.25;
    
    // Breathing/morphing scale effect
    const factor = Math.sin(time * 1.5) * 0.04 + 1.0;
    meshRef.current.scale.set(factor, factor, factor);
  });

  return (
    <group>
      {/* Decorative inner light mesh */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.5, 0.45, 120, 16]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={1.0}
          thickness={1.5}
          chromaticAberration={0.08}
          anisotropy={0.3}
          distortion={0.4}
          distortionScale={0.4}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color={colors.primary}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

export default function MorphingGlassShape() {
  return (
    <div className="w-full h-[350px] md:h-[450px] cursor-grab active:cursor-grabbing relative z-10">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <spotLight position={[5, 15, 5]} angle={0.3} penumbra={1} intensity={2} castShadow />
        
        <GlassObject />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
