'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import Button from '@/components/ui/Button';
import { loadDataSync } from '@/lib/dataLoader';
import projects from '@/data/projects';

export default function ProjectsSection() {
  const allProjects = loadDataSync('projects', projects);
  
  // Filter featured projects for homepage
  const featuredProjects = allProjects.filter(project => project.featured);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeading
        title="Featured Projects"
        subtitle="A showcase of my recent work and technical capabilities"
      />

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
      >
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </motion.div>

      {/* View More Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Button href="/projects" variant="primary">
          View All Projects
          <svg
            className="w-4 h-4 ml-2"
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
        </Button>
      </motion.div>
    </section>
  );
}