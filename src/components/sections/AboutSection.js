'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
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
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Text Content */}
          <div className="space-y-6 max-w-3xl flex flex-col items-center">
            <p className="text-lg text-gray-300 leading-relaxed text-center md:text-center md:text-justify">
              {personal.bio}
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Button href="/about" variant="primary">
                Learn More About Me
              </Button>
              <Button 
                href={personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                Download Resume
              </Button>
            </div>
          </div>

          {/* Stats or Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full">
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