"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
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
  {
    id: 3,
    title: "NewsDiary",
    description:
      "A news app that allows users to read news articles based on their interests.",
    technologies: ["React", "Tailwind CSS", "News API"],
    image: "/NewsDiary.png",
    repos: "https://github.com/Ashisach001/News-Diary",
  },
  {
    id: 4,
    title: "Portfolio",
    description: "A portfolio website that showcases my projects and skills.",
    technologies: ["Next.js", "Tailwind CSS", "React"],
    image: "/Portfolio.png",
    repos: "https://github.com/Ashisach001/Portfolio",
  },
  {
    id: 5,
    title: "TextUtils",
    description:
      "A text utility website that allows users to analyze text and perform various text-related operations.",
    technologies: ["React", "CSS", "JavaScript"],
    image: "/TextUtils.png",
    repos: "https://github.com/Ashisach001/TextUtils",
  },
];

export default function Projects() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-gray-100 mb-4">Projects</h1>
        <p className="text-xl text-gray-400 mb-12">
          A curated collection of my recent professional work, personal
          projects, and experimental builds that highlight my skills,
          creativity, and technical capabilities across different domains.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
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
      </motion.div>
    </div>
  );
}
