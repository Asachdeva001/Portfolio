'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { loadDataSync } from '@/lib/dataLoader';
import skillCategories from '@/data/skills';

export default function SkillsSection() {
  const skills = loadDataSync('skills', skillCategories);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <SectionHeading
        title="Skills & Technologies"
        subtitle="Technologies I work with to bring ideas to life"
      />

      {/* Skills Grid */}
      <StaggerContainer className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 sm:gap-8 justify-items-center">
        {skills.flatMap(category => 
          category.skills.slice(0, 6) // Limit to 6 skills per category for homepage
        ).slice(0, 24).map((skill, index) => (
          <StaggerItem key={`${skill.name}-${index}`}>
            <motion.div
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg mb-3 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.55)] group-hover:border-[var(--accent)]"
                style={{
                  background: 'linear-gradient(135deg, var(--bg-color) 0%, rgba(var(--primary-rgb), 0.2) 50%, var(--primary) 100%)',
                  fontSize: '2rem',
                  color: '#fff',
                  border: '2px solid var(--primary)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <span>{skill.icon}</span>
              </div>
              <span className="text-sm text-gray-100 font-medium text-center group-hover:text-[var(--primary)] transition-colors">
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
          className="inline-flex items-center text-[var(--primary)] hover:text-[var(--accent)] transition-colors font-medium text-lg"
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