'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { loadDataSync } from '@/lib/dataLoader';
import personalData from '@/data/personal';
import skillCategories from '@/data/skills';

export default function About() {
  const personal = loadDataSync('personal', personalData);
  const skills = loadDataSync('skills', skillCategories);

  const interests = [
    { name: 'Web Development', icon: '💻' },
    { name: 'Open Source', icon: '🌟' },
    { name: 'Cloud Computing', icon: '☁️' },
    { name: 'Machine Learning', icon: '🤖' },
    { name: 'UI/UX Design', icon: '🎨' },
    { name: 'Problem Solving', icon: '🧩' }
  ];

  const values = [
    {
      title: 'Continuous Learning',
      description: 'Always staying updated with the latest technologies and best practices in software development.',
      icon: '📚'
    },
    {
      title: 'Quality Code',
      description: 'Writing clean, maintainable, and well-documented code that stands the test of time.',
      icon: '⚡'
    },
    {
      title: 'User-Centric Design',
      description: 'Creating applications that prioritize user experience and accessibility.',
      icon: '👥'
    },
    {
      title: 'Collaboration',
      description: 'Working effectively in teams and contributing to a positive development culture.',
      icon: '🤝'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <SectionHeading
        title="About Me"
        subtitle="Get to know the person behind the code"
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-1"
        >
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-[#8DB1A4] to-[#2D4F4A] rounded-2xl p-1">
              <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                {personal.avatar ? (
                  <Image
                    src={personal.avatar}
                    alt={personal.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-6xl">👨‍💻</div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="prose prose-lg prose-invert max-w-none">
            {personal.extendedBio.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-300 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button href="/resume" variant="primary">
              View My Resume
            </Button>
            <Button href="/contact" variant="secondary">
              Get In Touch
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Interests */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h3 className="text-2xl font-semibold text-gray-100 mb-8 text-center">
          What I&apos;m Passionate About
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#8DB1A4] to-[#2D4F4A] rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {interest.icon}
              </div>
              <p className="text-sm text-gray-300 group-hover:text-[#8DB1A4] transition-colors">
                {interest.name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Values */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h3 className="text-2xl font-semibold text-gray-100 mb-8 text-center">
          My Core Values
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-[#8DB1A4]/30 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{value.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-100 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills Overview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h3 className="text-2xl font-semibold text-gray-100 mb-8 text-center">
          Technical Expertise
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center hover:border-[#8DB1A4]/30 transition-colors"
            >
              <h4 className="text-lg font-semibold mb-4" style={{ color: category.color }}>
                {category.title}
              </h4>
              <div className="text-2xl font-bold text-gray-100 mb-2">
                {category.skills.length}+
              </div>
              <p className="text-gray-400 text-sm">Technologies</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button href="/skills" variant="secondary">
            View All Skills
          </Button>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center bg-gradient-to-r from-[#8DB1A4]/10 to-[#2D4F4A]/10 rounded-2xl p-8 border border-[#8DB1A4]/20"
      >
        <h3 className="text-2xl font-semibold text-gray-100 mb-4">
          Let&apos;s Work Together
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          I&apos;m always interested in new opportunities and exciting projects. 
          Whether you have a project in mind or just want to chat about technology, 
          I&apos;d love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/contact" variant="primary">
            Start a Conversation
          </Button>
          <Button href="/projects" variant="secondary">
            View My Work
          </Button>
        </div>
      </motion.section>
    </div>
  );
}