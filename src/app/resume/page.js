'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import ExperienceCard from '@/components/ui/ExperienceCard';
import EducationCard from '@/components/ui/EducationCard';
import { loadDataSync } from '@/lib/dataLoader';
import personalData from '@/data/personal';
import experiences from '@/data/experience';
import education from '@/data/education';
import skillCategories from '@/data/skills';
import certifications from '@/data/certifications';
import socialLinks from '@/data/social';

export default function Resume() {
  const personal = loadDataSync('personal', personalData);
  const workExperience = loadDataSync('experience', experiences);
  const educationData = loadDataSync('education', education);
  const skills = loadDataSync('skills', skillCategories);
  const certs = loadDataSync('certifications', certifications);
  const social = loadDataSync('social', socialLinks);

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      case 'email':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-100 mb-4">
          {personal.name}
        </h1>
        <h2 className="text-xl text-[#8DB1A4] mb-4">
          {personal.title}
        </h2>
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-6 text-gray-300">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{personal.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{personal.location}</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {social.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#8DB1A4] transition-colors"
            >
              {getSocialIcon(link.platform)}
            </a>
          ))}
        </div>

        {/* Download Button */}
        <Button
          href={personal.resume}
          variant="primary"
          className="mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF Resume
        </Button>
      </motion.div>

      {/* Professional Summary */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h3 className="text-2xl font-semibold text-gray-100 mb-4">
          Professional Summary
        </h3>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
          <p className="text-gray-300 leading-relaxed">
            {personal.professionalSummary}
          </p>
        </div>
      </motion.section>

      {/* Work Experience */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h3 className="text-2xl font-semibold text-gray-100 mb-8">
          Work Experience
        </h3>
        <div className="space-y-0">
          {workExperience.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h3 className="text-2xl font-semibold text-gray-100 mb-8">
          Education
        </h3>
        <div className="space-y-0">
          {educationData.map((edu, index) => (
            <EducationCard
              key={edu.id}
              education={edu}
              index={index}
            />
          ))}
        </div>
      </motion.section>

      {/* Skills Summary */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h3 className="text-2xl font-semibold text-gray-100 mb-6">
          Technical Skills
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((category) => (
            <div
              key={category.id}
              className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50"
            >
              <h4 className="text-lg font-semibold mb-4" style={{ color: category.color }}>
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.slice(0, 8).map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{ background: `${category.color}20`, color: category.color }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Certifications */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h3 className="text-2xl font-semibold text-gray-100 mb-6">
          Certifications
        </h3>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certs.slice(0, 8).map((cert) => (
              <div key={cert.id} className="flex items-center justify-between">
                <div>
                  <h4 className="text-gray-100 font-medium">{cert.title}</h4>
                  <p className="text-gray-400 text-sm">{cert.issuer} • {cert.date}</p>
                </div>
              </div>
            ))}
          </div>
          {certs.length > 8 && (
            <div className="mt-4 text-center">
              <a
                href="/certifications"
                className="text-[#8DB1A4] hover:text-[#2D4F4A] transition-colors font-medium"
              >
                View All Certifications →
              </a>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}