'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

export default function ProjectCard({ project, index = 0 }) {
  const {
    title,
    description,
    image,
    technologies,
    repos,
    liveUrl
  } = project;

  const repoLinks = Array.isArray(repos)
    ? repos
    : [{ label: 'View Code', url: repos }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="h-full"
    >
      <SpotlightCard className="flex flex-col h-full group">
        {/* Project Card Image */}
        <div className="aspect-video bg-neutral-900/60 relative overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-white/0 text-neutral-500 font-mono text-xs">
              &lt; no_preview_image /&gt;
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />
        </div>

        {/* Project Details */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[var(--primary)] transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-sm text-neutral-400 mb-5 flex-1 line-clamp-3">
            {description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-xs rounded-full border border-white/5 font-mono"
                style={{ background: 'rgba(var(--primary-rgb), 0.08)', color: 'var(--primary)' }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-white/5">
            {repoLinks.map((repo, idx) => {
              if (!repo.url) return null;
              return (
                <a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-wider inline-flex items-center transition-colors duration-300"
                  style={{ color: 'var(--primary)' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                >
                  {repo.label}
                  <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              );
            })}
            
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wider inline-flex items-center transition-colors duration-300"
                style={{ color: 'var(--primary)' }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              >
                Live Demo
                <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
