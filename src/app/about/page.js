"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-100 mb-8">About Me</h1>

        <div className="prose prose-lg">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mb-6 text-justify"
          >
            I&apos;m a passionate web developer and Computer Science student at Punjab Engineering College (PEC) with a strong focus on full-stack development and user-centric design. I’ve built a range of projects—from event platforms like eicpec.in for E-Summit 2025 to dynamic web apps for startups and freelance clients—using modern technologies like React, Node.js, and MongoDB. I enjoy turning ideas into responsive, impactful digital experiences while continuously learning and growing in the ever-evolving tech landscape.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 mb-6 text-justify"
          >
            My journey in web development began with a curiosity about how websites function behind the scenes. That curiosity quickly grew into a passion, leading me to explore modern web technologies like the MERN stack. Through hands-on projects and continuous learning, I’ve developed the skills to build robust, responsive, and scalable web applications that deliver real-world value.
          </motion.p>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-8">Experience</h2>
          <div className="space-y-8">
            {[
              {
                title: "Full Stack Web Developer",
                company: "Growero.io",
                period: "05/2025 - Present",
                description:
                  "Leading the end-to-end development of scalable enterprise web applications using React, Node.js, and MongoDB. Implementing responsive UI and RESTful APIs with a focus on performance and maintainability.",
              },
              {
                title: "Freelance Web Developer",
                company: "Freelancer",
                period: "10/2024 - Present",
                description:
                  "Delivered full-cycle web development solutions for clients, including landing pages, e-commerce sites, and admin dashboards using the MERN stack, Tailwind CSS, and Firebase.",
              },
              {
                title: "Full Stack Web Developer",
                company: "E-Summit'25",
                period: "02/2025 - 03/2025",
                description:
                  "Developed the official website for E-Summit 2025 using React.js and Express.js. Implemented responsive design, speaker/event sections, and dynamic registration forms to support the tech event’s online presence.",
              },
              {
                title: "Frontend Developer",
                company: "WebInOrbit",
                period: "09/2024 - 11/2024",
                description:
                  "Collaborated with designers and backend teams to build responsive, user-friendly interfaces using React, JavaScript, and Figma prototypes. Focused on UI/UX consistency and cross-browser compatibility.",
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="relative pl-8 border-l-2 border-blue-500"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                <h3 className="text-xl font-semibold text-gray-300">
                  {job.title}
                </h3>
                <p className="text-blue-600 font-medium">{job.company}</p>
                <p className="text-gray-500 text-sm mb-2">{job.period}</p>
                <p className="text-gray-550 text-justify">{job.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-8">Education</h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-100">
              Bachelor of Technology in Computer Science (Data Science)
            </h3>
            <p className="text-blue-600 font-medium">
              Punjab Engineering College (PEC), Chandigarh
            </p>
            <p className="text-gray-400">2023 - 2027</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
