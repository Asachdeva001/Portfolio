'use client';

import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend Development',
    color: 'blue',
    skills: [
      {
        name: 'React',
        icon: '⚛️',
        description: 'Advanced proficiency in building dynamic user interfaces with React. Experience with hooks, context API, and state management.',
        projects: ['E-commerce Platform', 'Task Management App']
      },
      {
        name: 'Next.js',
        icon: '▲',
        description: 'Expertise in building full-stack applications with Next.js, including server-side rendering, API routes, and static site generation.',
        projects: ['Portfolio Website', 'Blog Platform']
      },
      {
        name: 'TypeScript',
        icon: '📘',
        description: 'Strong understanding of TypeScript for type-safe development, including interfaces, generics, and advanced types.',
        projects: ['Enterprise Dashboard', 'API Client Library']
      },
      {
        name: 'Tailwind CSS',
        icon: '🎨',
        description: 'Proficient in building responsive and modern UIs using Tailwind CSS, with focus on component design and responsive layouts.',
        projects: ['Admin Dashboard', 'Landing Pages']
      },
      {
        name: 'Redux',
        icon: '📦',
        description: 'Experience in state management using Redux, including middleware, reducers, and complex state interactions.',
        projects: ['E-commerce Cart', 'User Dashboard']
      }
    ]
  },
  {
    title: 'Backend Development',
    color: 'green',
    skills: [
      {
        name: 'Node.js',
        icon: '🟢',
        description: 'Advanced knowledge of Node.js for building scalable server-side applications and RESTful APIs.',
        projects: ['Authentication Service', 'File Processing System']
      },
      {
        name: 'Express.js',
        icon: '🚂',
        description: 'Expertise in creating robust web applications and APIs using Express.js, with focus on middleware and routing.',
        projects: ['REST API', 'WebSocket Server']
      },
      {
        name: 'REST APIs',
        icon: '🌐',
        description: 'Deep understanding of REST principles, API design, and implementation of secure and scalable endpoints.',
        projects: ['Payment Gateway Integration', 'User Management API']
      },
      {
        name: 'GraphQL',
        icon: '📊',
        description: 'Experience in building GraphQL APIs with Apollo Server, including schema design and resolver implementation.',
        projects: ['Real-time Dashboard', 'Content Management System']
      },
      {
        name: 'WebSockets',
        icon: '🔌',
        description: 'Proficient in implementing real-time features using WebSockets for live updates and bidirectional communication.',
        projects: ['Chat Application', 'Live Tracking System']
      }
    ]
  },
  {
    title: 'Database & Storage',
    color: 'purple',
    skills: [
      {
        name: 'MongoDB',
        icon: '🍃',
        description: 'Advanced experience with MongoDB, including schema design, indexing, and aggregation pipelines.',
        projects: ['User Analytics System', 'Content Management']
      },
      {
        name: 'PostgreSQL',
        icon: '🐘',
        description: 'Strong knowledge of PostgreSQL, including complex queries, transactions, and database optimization.',
        projects: ['Financial System', 'Inventory Management']
      },
      {
        name: 'Redis',
        icon: '🔴',
        description: 'Experience in using Redis for caching, session management, and real-time data processing.',
        projects: ['Rate Limiting', 'Caching Layer']
      },
      {
        name: 'AWS S3',
        icon: '☁️',
        description: 'Proficient in managing cloud storage with AWS S3, including file uploads, CDN integration, and security.',
        projects: ['Media Storage', 'Backup System']
      },
      {
        name: 'Firebase',
        icon: '🔥',
        description: 'Experience with Firebase services including Realtime Database, Authentication, and Cloud Functions.',
        projects: ['Real-time Chat', 'User Authentication']
      }
    ]
  },
  {
    title: 'DevOps & Tools',
    color: 'orange',
    skills: [
      {
        name: 'Docker',
        icon: '🐳',
        description: 'Proficient in containerization with Docker, including multi-stage builds and container orchestration.',
        projects: ['Microservices', 'Development Environment']
      },
      {
        name: 'AWS',
        icon: '☁️',
        description: 'Experience with AWS services including EC2, Lambda, and CloudFront for scalable cloud infrastructure.',
        projects: ['Serverless API', 'Cloud Infrastructure']
      },
      {
        name: 'Git & GitHub',
        icon: '📦',
        description: 'Advanced knowledge of version control with Git, including branching strategies and CI/CD integration.',
        projects: ['Team Collaboration', 'Automated Workflows']
      },
      {
        name: 'CI/CD',
        icon: '🔄',
        description: 'Experience in setting up continuous integration and deployment pipelines for automated testing and deployment.',
        projects: ['Automated Testing', 'Deployment Pipeline']
      },
      {
        name: 'Linux',
        icon: '🐧',
        description: 'Strong understanding of Linux systems, including server management, shell scripting, and security.',
        projects: ['Server Management', 'Automation Scripts']
      }
    ]
  }
];

const SkillCard = ({ skill, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20"
    >
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-2xl">{skill.icon}</span>
        <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
      </div>
      <p className="text-gray-400 mb-4 text-justify">{skill.description}</p>
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Projects:</h4>
        <ul className="list-disc list-inside text-gray-400">
          {skill.projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-gray-100 mb-8">Technical Skills</h1>
        <p className="text-xl text-gray-400 mb-12 text-justify max-w-4xl">
          A comprehensive overview of my technical expertise and hands-on experience across various modern technologies, tools, platforms, and development environments used in real-world projects.
        </p>

        <div className="space-y-16">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h2 className={`text-2xl font-semibold text-${category.color}-400 mb-8`}>
                {category.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} color={category.color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 