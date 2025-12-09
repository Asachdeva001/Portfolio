'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import { loadDataSync } from '@/lib/dataLoader';
import projects from '@/data/projects';

export default function Projects() {
  const allProjects = loadDataSync('projects', projects);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeading
        title="All Projects"
        subtitle="A comprehensive collection of my work, showcasing technical skills, creativity, and problem-solving across various domains and technologies."
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {allProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </motion.div>

      {allProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">
            No projects found. Check back soon for updates!
          </p>
        </motion.div>
      )}
    </div>
  );
}
