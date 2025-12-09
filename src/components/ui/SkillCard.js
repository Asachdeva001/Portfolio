'use client';

import { motion } from 'framer-motion';

/**
 * SkillCard component for displaying skill information
 * @param {Object} props - Component props
 * @param {Object} props.skill - Skill data object
 * @param {string} props.categoryColor - Category color for styling
 * @param {number} props.index - Card index for stagger animation
 */
export default function SkillCard({ skill, categoryColor = '#8DB1A4', index = 0 }) {
  const { name, icon, description, proficiency, projects } = skill;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300"
    >
      {/* Icon and Name */}
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-xl font-semibold" style={{ color: categoryColor }}>
          {name}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-400 mb-4 text-sm leading-relaxed">
        {description}
      </p>

      {/* Proficiency Bar (if provided) */}
      {proficiency && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">Proficiency</span>
            <span className="text-xs text-gray-400">{proficiency}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${proficiency}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-2 rounded-full"
              style={{ background: categoryColor }}
            />
          </div>
        </div>
      )}

      {/* Related Projects */}
      {projects && projects.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-300 mb-2">
            Related Projects:
          </h4>
          <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
            {projects.map((project, idx) => (
              <li key={idx}>{project}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
