'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { loadDataSync } from '@/lib/dataLoader';
import skillCategories from '@/data/skills';

export default function SkillsSection() {
  const skills = loadDataSync('skills', skillCategories);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeading
        title="Skills & Technologies"
        subtitle="Technologies I work with to bring ideas to life"
      />

      {/* Skills Grid */}
      <StaggerContainer className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 justify-items-center">
        {skills.flatMap(category => 
          category.skills.slice(0, 6) // Limit to 6 skills per category for homepage
        ).slice(0, 24).map((skill, index) => (
          <StaggerItem key={`${skill.name}-${index}`}>
            <motion.div
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg mb-3 transition-all duration-300 group-hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #0A0F0D 0%, #2D4F4A 50%, #8DB1A4 100%)',
                  fontSize: '2rem',
                  color: '#fff',
                  border: '2px solid #2D4F4A',
                }}
              >
                <span>{skill.icon}</span>
              </div>
              <span className="text-sm text-gray-100 font-medium text-center group-hover:text-[#8DB1A4] transition-colors">
                {skill.name}
              </span>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* View More Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <a
          href="/skills"
          className="inline-flex items-center text-[#8DB1A4] hover:text-[#2D4F4A] transition-colors font-medium text-lg"
        >
          View All Skills & Experience
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}