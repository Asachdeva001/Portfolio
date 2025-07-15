"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

const useSound = (url) => {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(url);
  }, [url]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return play;
};

const TextAnimation = ({ text, isGradient = false, gradientClass = '' }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1 * i,
        duration: 2,
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
      className={`flex flex-wrap justify-center ${
        isGradient
          ? `${gradientClass || 'bg-gradient-to-r from-[#0A0F0D] via-[#2D4F4A] to-[#8DB1A4]'} bg-clip-text text-transparent`
          : ''
      }`}
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
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <TextAnimation text="Hi, I'm" />
            <TextAnimation
              text="Aashish Sachdeva"
              isGradient={true}
              gradientClass="bg-gradient-to-r from-[#F9D29D] to-[#F2B880] text-transparent bg-clip-text"
            />
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A Passionate web developer creating elegant, high-performance
            digital solutions that combine usability, visual appeal, and
            seamless functionality
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/projects"
              className="px-8 py-3 rounded-lg transition-colors duration-300 font-semibold shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, #0A0F0D, #2D4F4A, #8DB1A4)",
                color: "#fff",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg, #8DB1A4, #2D4F4A, #0A0F0D)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg, #0A0F0D, #2D4F4A, #8DB1A4)")
              }
            >
              View Projects
            </Link>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border rounded-lg transition-colors duration-300 font-semibold"
              style={{
                border: "1px solid #8DB1A4",
                color: "#8DB1A4",
                background: "transparent",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#8DB1A4";
                e.currentTarget.style.color = "#0A0F0D";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#8DB1A4";
              }}
            >
              Resume
            </a>
            <Link
              href="/contact"
              className="px-8 py-3 border rounded-lg transition-colors duration-300 font-semibold"
              style={{
                border: "1px solid #8DB1A4",
                color: "#8DB1A4",
                background: "transparent",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#8DB1A4";
                e.currentTarget.style.color = "#0A0F0D";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#8DB1A4";
              }}
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
              and cloud infrastructure. Driven by curiosity and creativity,
              I&apos;m always eager to learn, build, and contribute—whether
              through code, design, or strategy.
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
                technologies: [
                  "Next.js",
                  "Tailwind CSS",
                  "MongoDB",
                  "Node.js",
                  "Express.js",
                ],
                image: "/AI-Workspace.png",
                repos: [
                  "https://github.com/Ashisach001/AiWorkspace-client",
                  "https://github.com/Ashisach001/AiWorkspace-server",
                ],
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
                        className="px-2 py-0.5 text-xs rounded"
                        style={{ background: "#2D4F4A20", color: "#8DB1A4" }}
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
                          className="text-sm font-medium inline-flex items-center transition-colors"
                          style={{ color: "#8DB1A4" }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.color = "#2D4F4A")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.color = "#8DB1A4")
                          }
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
                        className="text-sm font-medium inline-flex items-center transition-colors"
                        style={{ color: "#8DB1A4" }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.color = "#2D4F4A")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.color = "#8DB1A4")
                        }
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
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold shadow-md transition-colors duration-300"
              style={{
                background: "linear-gradient(135deg, #0A0F0D, #2D4F4A, #8DB1A4)",
                color: "#fff",
                transition: "background 0.5s ease"
              }}
              onMouseOver={e => e.currentTarget.style.background = "linear-gradient(135deg, #8DB1A4, #2D4F4A, #0A0F0D)"}
              onMouseOut={e => e.currentTarget.style.background = "linear-gradient(135deg, #0A0F0D, #2D4F4A, #8DB1A4)"}
            >
              View More Projects
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ display: "inline", verticalAlign: "middle" }}
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
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <motion.div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5 justify-items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.12 } },
              hidden: {},
            }}
          >
            {[
              { name: 'React', icon: '⚛️' },
              { name: 'Next.js', icon: '▲' },
              { name: 'TypeScript', icon: '📘' },
              { name: 'Tailwind CSS', icon: '🎨' },
              { name: 'Redux', icon: '📦' },
              { name: 'Node.js', icon: '🟢' },
              { name: 'Express.js', icon: '🚂' },
              { name: 'MongoDB', icon: '🍃' },
              { name: 'PostgreSQL', icon: '🐘' },
              { name: 'Redis', icon: '🔴' },
              { name: 'AWS', icon: '☁️' },
              { name: 'Docker', icon: '🐳' },
              { name: 'Git & GitHub', icon: '🐙' },
              { name: 'Linux', icon: '🐧' },
              { name: 'Firebase', icon: '🔥' },
              { name: 'Python', icon: '🐍' },
              { name: 'Pandas', icon: '🧸' },
              { name: 'SciKit-Learn', icon: '🔬' },
            ].map((skill) => (
              <motion.div
                key={skill.name}
                className="flex flex-col items-center"
                variants={{
                  hidden: { opacity: 0, scale: 0.5, y: 40 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 18,
                      duration: 0.7,
                    },
                  },
                }}
              >
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #0A0F0D 0%, #2D4F4A 50%, #8DB1A4 100%)',
                    fontSize: '2rem',
                    color: '#fff',
                    border: '2px solid #2D4F4A',
                  }}
                >
                  <span>{skill.icon}</span>
                </div>
                <span className="text-sm text-gray-100 font-medium mt-1">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
