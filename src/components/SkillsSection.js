'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';
import { useState } from 'react';

const skills = [
  {
    name: 'Frontend',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    color: '#61DAFB',
    icon: '🎨'
  },
  {
    name: 'Backend',
    technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
    color: '#68A063',
    icon: '⚙️'
  },
  {
    name: 'DevOps',
    technologies: ['Docker', 'AWS', 'Git', 'CI/CD'],
    color: '#F05032',
    icon: '🚀'
  },
  {
    name: 'Tools',
    technologies: ['VS Code', 'Figma', 'Postman', 'Jira'],
    color: '#764ABC',
    icon: '🛠️'
  }
];

const SkillCard = ({ skill, isHovered, onHover }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => onHover(skill.name)}
      onHoverEnd={() => onHover(null)}
      className="relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
    >
      <div className="text-4xl mb-4">{skill.icon}</div>
      <h3 className="text-xl font-bold text-white mb-4">{skill.name}</h3>
      <div className="space-y-2">
        {skill.technologies.map((tech) => (
          <div key={tech} className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
            <span className="text-gray-300">{tech}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const SkillSphere = ({ hoveredSkill }) => {
  return (
    <Canvas className="h-[300px]">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} autoRotate />
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={1}
          height={0.2}
          curveSegments={12}
        >
          {hoveredSkill || 'Skills'}
          <meshStandardMaterial
            color={hoveredSkill ? skills.find(s => s.name === hoveredSkill)?.color : '#ffffff'}
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </Center>
    </Canvas>
  );
};

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-100 mb-12">Skills & Technologies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              isHovered={hoveredSkill === skill.name}
              onHover={setHoveredSkill}
            />
          ))}
        </div>

        <div className="mt-12 bg-black/20 rounded-xl p-8 backdrop-blur-sm">
          <SkillSphere hoveredSkill={hoveredSkill} />
        </div>
      </motion.div>
    </section>
  );
} 