'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform built with Next.js and Node.js',
    image: '/project1.jpg',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    image: '/project2.jpg',
    tags: ['React', 'Firebase', 'Material-UI'],
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'A modern portfolio website with animations and responsive design',
    image: '/project3.jpg',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'A weather dashboard with real-time data and interactive maps',
    image: '/project4.jpg',
    tags: ['React', 'OpenWeather API', 'Chart.js'],
  },
  {
    id: 5,
    title: 'Social Media Dashboard',
    description: 'A social media analytics dashboard with data visualization',
    image: '/project5.jpg',
    tags: ['Vue.js', 'D3.js', 'Express'],
  },
  {
    id: 6,
    title: 'Fitness Tracker',
    description: 'A mobile-first fitness tracking application with progress charts',
    image: '/project6.jpg',
    tags: ['React Native', 'Redux', 'Firebase'],
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
        <p className="text-xl text-gray-300 mb-12">
          A collection of my recent work and personal projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-video bg-gray-200 relative">
                {/* Add actual project images here */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${project.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                >
                  View Project
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