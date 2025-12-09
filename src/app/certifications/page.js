'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import CertCard from '@/components/ui/CertCard';
import { loadDataSync } from '@/lib/dataLoader';
import certifications from '@/data/certifications';

export default function Certifications() {
  const allCertifications = loadDataSync('certifications', certifications);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeading
        title="Certifications"
        subtitle="Professional certifications and achievements that validate my technical expertise and commitment to continuous learning."
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {allCertifications.map((certification, index) => (
          <CertCard
            key={certification.id}
            certification={certification}
            index={index}
          />
        ))}
      </motion.div>

      {allCertifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">
            No certifications found. Check back soon for updates!
          </p>
        </motion.div>
      )}
    </div>
  );
}