"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const TextAnimation = ({ text, isGradient = false }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1 * i,
        duration: 2
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        mass: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        mass: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap justify-center ${isGradient ? 'bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent' : ''}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ marginRight: "5px" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section Centered */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-300 mb-6">
            <TextAnimation text="Hi, I'm" />
            <TextAnimation text="Aashish Sachdeva" isGradient={true} />
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A Passionate web developer creating elegant, high-performance
            digital solutions that combine usability, visual appeal, and
            seamless functionality
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/projects"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              View Projects
            </Link>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300"
            >
              Resume
            </a>
            <Link
              href="/contact"
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-8">About Me</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-500 leading-relaxed">
              I&apos;m a Computer Science student at Punjab Engineering College
              (PEC), passionate about building impactful digital solutions. I
              specialize in full-stack web development with experience in
              technologies like HTML5, CSS, JavaScript, React, and the MERN
              stack. I enjoy translating ideas into clean, responsive, and
              engaging web experiences. I stay updated on emerging technologies
              and cloud infrastructure. Driven by curiosity and creativity, I&apos;m
              always eager to learn, build, and contribute—whether through code,
              design, or strategy.
            </p>{" "}
            <a href="/about">Know More</a>
          </div>
        </motion.div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                id: 1,
                title: "AI-Workspace",
                description:
                  "A platform for teams to collaborate on workspaces, where they can create, edit, and share documents.",
                technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Express.js"],
                image: "/AI-Workspace.png",
                repos: ["https://github.com/Ashisach001/AiWorkspace-client", "https://github.com/Ashisach001/AiWorkspace-server"],
              },
              {
                id: 2,
                title: "Noteflow",
                description:
                  "A note and task management app that allows users to create, edit, and share notes/tasks.",
                technologies: ["React.js", "Firebase", "Material-UI"],
                image: "/Noteflow.png",
                repos: "https://github.com/Ashisach001/Noteflow",
              },
            ].map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700/50"
              >
                <div className="aspect-video bg-gray-700/50 relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs bg-blue-600/20 text-blue-400 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {Array.isArray(project.repos) ? (
                      project.repos.map((repo, index) => (
                        <a
                          key={index}
                          href={repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-400 hover:text-blue-300 font-medium inline-flex items-center transition-colors"
                  >
                          {index === 0 ? "Frontend" : "Backend"}
                          <svg
                            className="w-3 h-3 ml-1"
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
                      ))
                    ) : (
                      <a
                        href={project.repos}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300 font-medium inline-flex items-center transition-colors"
                      >
                        View Code
                    <svg
                          className="w-3 h-3 ml-1"
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
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              View More Projects
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
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-12">
            Skills & Technologies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Frontend */}
            <motion.div 
              className="text-left bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
              whileHover={{ perspective: 1000, rotateX: 0, scale: 1.02 }}
              initial={{ opacity: 0, y: 20, perspective: 1000, rotateX: -2 }}
              whileInView={{ opacity: 1, y: 0, perspective: 1000, rotateX: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-blue-400 mb-6">
                Frontend Development
              </h3>
              <div className="space-y-3">
                {[
                  "React",
                  "Next.js",
                  "Tailwind CSS",
                  "Redux",
                ].map((skill) => (
                  <div key={skill} className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div 
              className="text-left bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
              whileHover={{ perspective: 1000, rotateX: 0, scale: 1.02 }}
              initial={{ opacity: 0, y: 20, perspective: 1000, rotateX: 2 }}
              whileInView={{ opacity: 1, y: 0, perspective: 1000, rotateX: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-blue-400 mb-6">
                Backend Development
              </h3>
              <div className="space-y-3">
                {[
                  "Node.js",
                  "Express.js",
                  "REST APIs",
                  "WebSockets",
                ].map((skill) => (
                  <div key={skill} className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Database */}
            <motion.div 
              className="text-left bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
              whileHover={{ perspective: 1000, rotateX: 0, scale: 1.02 }}
              initial={{ opacity: 0, y: 20, perspective: 1000, rotateX: -2 }}
              whileInView={{ opacity: 1, y: 0, perspective: 1000, rotateX: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-blue-400 mb-6">
                Database & Storage
              </h3>
              <div className="space-y-3">
                {[
                  "MongoDB",
                  "PostgreSQL",
                  "Redis",
                  "AWS S3",
                ].map((skill) => (
                  <div key={skill} className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* DevOps & Tools */}
            <motion.div 
              className="text-left bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
              whileHover={{ perspective: 1000, rotateX: 0, scale: 1.02 }}
              initial={{ opacity: 0, y: 20, perspective: 1000, rotateX: 2 }}
              whileInView={{ opacity: 1, y: 0, perspective: 1000, rotateX: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-blue-400 mb-6">
                DevOps & Tools
              </h3>
              <div className="space-y-3">
                {[
                  "Docker",
                  "AWS",
                  "Git & GitHub",
                  "Linux",
                ].map((skill) => (
                  <div key={skill} className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-8">
            <Link
              href="/skills"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              Know More About My Skills
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
