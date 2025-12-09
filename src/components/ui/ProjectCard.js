'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cardHoverVariants } from '@/utils/animations';

/**
 * ProjectCard component for displaying project information
 * @param {Object} props - Component props
 * @param {Object} props.project - Project data object
 * @param {number} props.index - Card index for stagger animation
 */
export default function ProjectCard({ project, index = 0 }) {
  const {
    title,
    description,
    image,
    technologies,
    repos,
    liveUrl
  } = project;

  // Handle both single repo string and array of repo objects
  const repoLinks = Array.isArray(repos)
    ? repos
    : [{ label: 'View Code', url: repos }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover="hover"
      variants={cardHoverVariants}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700/50"
    >
      {/* Project Image */}
      <div className="aspect-video bg-gray-700/50 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-100 mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-gray-400 mb-4">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full"
              style={{ background: '#2D4F4A20', color: '#8DB1A4' }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {repoLinks.map((repo, idx) => (
            <a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium inline-flex items-center transition-colors"
              style={{ color: '#8DB1A4' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#2D4F4A')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#8DB1A4')}
            >
              {repo.label}
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          ))}
          
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium inline-flex items-center transition-colors"
              style={{ color: '#8DB1A4' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#2D4F4A')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#8DB1A4')}
            >
              Live Demo
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
