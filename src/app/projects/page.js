'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A brief description of the first project and its key features.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    image: '/project1.jpg',
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'A brief description of the second project and its key features.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/project2.jpg',
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'A brief description of the third project and its key features.',
    technologies: ['React', 'Express', 'PostgreSQL'],
    image: '/project3.jpg',
  },
];

export default function Projects() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-gray-100 mb-4">Projects</h1>
        <p className="text-xl text-gray-400 mb-12">
        A curated collection of my recent professional work, personal projects, and experimental builds that highlight my skills, creativity, and technical capabilities across different domains.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700/50"
            >
              <div className="aspect-video bg-gray-700/50 relative">
                {/* Add actual project images here */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${project.id}`}
                  className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center transition-colors"
                >
                  Learn More
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 