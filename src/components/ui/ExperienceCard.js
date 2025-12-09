'use client';

import { motion } from 'framer-motion';

/**
 * ExperienceCard component for displaying work experience
 * @param {Object} props - Component props
 * @param {Object} props.experience - Experience data object
 * @param {number} props.index - Card index for stagger animation
 */
export default function ExperienceCard({ experience, index = 0 }) {
  const {
    company,
    position,
    location,
    startDate,
    endDate,
    current,
    description,
    achievements,
    technologies
  } = experience;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-8 border-l-2 border-gray-700 last:border-l-0 last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute -left-2 top-0 w-4 h-4 bg-[#8DB1A4] rounded-full border-4 border-gray-900"></div>
      
      {/* Experience content */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-100 mb-1">
            {position}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <span className="text-[#8DB1A4] font-medium">{company}</span>
            <span className="text-sm text-gray-400">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              {startDate} - {current ? 'Present' : endDate}
            </span>
            {current && (
              <span className="px-2 py-1 text-xs bg-[#8DB1A4]/20 text-[#8DB1A4] rounded-full">
                Current
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-300 mb-4 text-sm">
            {description}
          </p>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-200 mb-2">
              Key Achievements:
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
              {achievements.map((achievement, idx) => (
                <li key={idx}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-2">
              Technologies Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded"
                  style={{ background: '#2D4F4A20', color: '#8DB1A4' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}