'use client';

import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

export default function SkillCard({ skill, categoryColor = '#8DB1A4', index = 0 }) {
  const { name, icon, description, proficiency, projects } = skill;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="h-full"
    >
      <SpotlightCard className="p-6 h-full flex flex-col justify-between">
        <div>
          {/* Icon and Name */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-3xl select-none">{icon}</span>
            <h3 className="text-lg font-bold font-heading" style={{ color: 'var(--primary)' }}>
              {name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-neutral-400 mb-5 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div>
          {/* Proficiency Level */}
          {proficiency && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5 select-none font-mono">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Skill Level</span>
                <span className="text-[11px] font-bold" style={{ color: 'var(--primary)' }}>{proficiency}%</span>
              </div>
              <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ 
                    background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)',
                    boxShadow: '0 0 8px rgba(var(--primary-rgb), 0.5)'
                  }}
                />
              </div>
            </div>
          )}

          {/* Applied In Projects */}
          {projects && projects.length > 0 && (
            <div className="pt-3 border-t border-white/5 mt-3 select-none">
              <h4 className="text-[10px] font-mono font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">
                Applied In:
              </h4>
              <div className="flex flex-wrap gap-1">
                {projects.map((proj, idx) => (
                  <span 
                    key={idx} 
                    className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-400 font-sans"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
