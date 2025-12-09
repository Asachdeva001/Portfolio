'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import SkillCard from '@/components/ui/SkillCard';
import { loadDataSync } from '@/lib/dataLoader';
import skillCategories from '@/data/skills';

export default function Skills() {
  const skills = loadDataSync('skills', skillCategories);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeading
        title="Technical Skills"
        subtitle="A comprehensive overview of my technical expertise and hands-on experience across various modern technologies, tools, platforms, and development environments used in real-world projects."
      />

      <div className="space-y-16">
        {skills.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-8" style={{ color: category.color }}>
              {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  categoryColor={category.color}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {skills.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">
            No skills data found. Check back soon for updates!
          </p>
        </motion.div>
      )}
    </div>
  );
} 