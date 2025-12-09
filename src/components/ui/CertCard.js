'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cardHoverVariants } from '@/utils/animations';

/**
 * CertCard component for displaying certification information
 * @param {Object} props - Component props
 * @param {Object} props.certification - Certification data object
 * @param {number} props.index - Card index for stagger animation
 */
export default function CertCard({ certification, index = 0 }) {
  const {
    title,
    issuer,
    date,
    image,
    credentialId,
    credentialUrl,
    description
  } = certification;

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
      {/* Certification Image */}
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

      {/* Certification Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-2">
          {title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-300">{issuer}</span>
          <span className="text-sm text-gray-400">{date}</span>
        </div>

        {description && (
          <p className="text-sm text-gray-400 mb-4">
            {description}
          </p>
        )}

        {/* Credential Info */}
        <div className="flex flex-wrap gap-3">
          {credentialId && (
            <span className="text-xs text-gray-500">
              ID: {credentialId}
            </span>
          )}
          
          {credentialUrl && (
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium inline-flex items-center transition-colors"
              style={{ color: '#8DB1A4' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#2D4F4A')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#8DB1A4')}
            >
              View Credential
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
          )}
        </div>
      </div>
    </motion.div>
  );
}