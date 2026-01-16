'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import { loadDataSync } from '@/lib/dataLoader';
import personalData from '@/data/personal';

export default function AboutSection() {
  const personal = loadDataSync('personal', personalData);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeading
        title="About Me"
        subtitle="Get to know me better"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              {personal.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="inline-flex items-center text-[#8DB1A4] hover:text-[#2D4F4A] transition-colors font-medium"
              >
                Learn More About Me
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
              </Link>
              
              <a
                href={personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#8DB1A4] hover:text-[#2D4F4A] transition-colors font-medium"
              >
                Download Resume
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Stats or Highlights */}
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
            >
              <div className="text-3xl font-bold text-[#8DB1A4] mb-2">12+</div>
              <div className="text-sm text-gray-400">Projects Completed</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
            >
              <div className="text-3xl font-bold text-[#8DB1A4] mb-2">1</div>
              <div className="text-sm text-gray-400">Year Experience</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
            >
              <div className="text-3xl font-bold text-[#8DB1A4] mb-2">20+</div>
              <div className="text-sm text-gray-400">Technologies</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
            >
              <div className="text-3xl font-bold text-[#8DB1A4] mb-2">13+</div>
              <div className="text-sm text-gray-400">Certifications</div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}