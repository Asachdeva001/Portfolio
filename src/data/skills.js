export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    color: "#8DB1A4",
    skills: [
      {
        name: "React",
        icon: "⚛️",
        description: "Advanced proficiency in building dynamic user interfaces with React. Experience with hooks, context API, and state management.",
        proficiency: 90,
        projects: ["AI-Workspace", "Noteflow", "NewsDiary"]
      },
      {
        name: "Next.js",
        icon: "▲",
        description: "Expertise in building full-stack applications with Next.js, including server-side rendering, API routes, and static site generation.",
        proficiency: 85,
        projects: ["Portfolio", "AI-Workspace"]
      },
      {
        name: "TypeScript",
        icon: "📘",
        description: "Strong understanding of TypeScript for type-safe development, including interfaces, generics, and advanced types.",
        proficiency: 80,
        projects: ["Enterprise Dashboard", "API Client Library"]
      },
      {
        name: "Tailwind CSS",
        icon: "🎨",
        description: "Proficient in building responsive and modern UIs using Tailwind CSS, with focus on component design and responsive layouts.",
        proficiency: 90,
        projects: ["Portfolio", "AI-Workspace", "NewsDiary"]
      },
      {
        name: "Redux",
        icon: "📦",
        description: "Experience in state management using Redux, including middleware, reducers, and complex state interactions.",
        proficiency: 75,
        projects: ["E-commerce Cart", "User Dashboard"]
      }
    ]
  },
  {
    id: "backend",
    title: "Backend Development",
    color: "#2D4F4A",
    skills: [
      {
        name: "Node.js",
        icon: "🟢",
        description: "Advanced knowledge of Node.js for building scalable server-side applications and RESTful APIs.",
        proficiency: 85,
        projects: ["AI-Workspace", "Authentication Service"]
      },
      {
        name: "Express.js",
        icon: "🚂",
        description: "Expertise in creating robust web applications and APIs using Express.js, with focus on middleware and routing.",
        proficiency: 85,
        projects: ["AI-Workspace", "REST API"]
      },
      {
        name: "REST APIs",
        icon: "🌐",
        description: "Deep understanding of REST principles, API design, and implementation of secure and scalable endpoints.",
        proficiency: 85,
        projects: ["Payment Gateway Integration", "User Management API"]
      },
      {
        name: "GraphQL",
        icon: "📊",
        description: "Experience in building GraphQL APIs with Apollo Server, including schema design and resolver implementation.",
        proficiency: 70,
        projects: ["Real-time Dashboard", "Content Management System"]
      },
      {
        name: "WebSockets",
        icon: "🔌",
        description: "Proficient in implementing real-time features using WebSockets for live updates and bidirectional communication.",
        proficiency: 75,
        projects: ["Chat Application", "Live Tracking System"]
      }
    ]
  },
  {
    id: "database",
    title: "Database & Storage",
    color: "#0A0F0D",
    skills: [
      {
        name: "MongoDB",
        icon: "🍃",
        description: "Advanced experience with MongoDB, including schema design, indexing, and aggregation pipelines.",
        proficiency: 85,
        projects: ["AI-Workspace", "User Analytics System"]
      },
      {
        name: "PostgreSQL",
        icon: "🐘",
        description: "Strong knowledge of PostgreSQL, including complex queries, transactions, and database optimization.",
        proficiency: 75,
        projects: ["Financial System", "Inventory Management"]
      },
      {
        name: "Redis",
        icon: "🔴",
        description: "Experience in using Redis for caching, session management, and real-time data processing.",
        proficiency: 70,
        projects: ["Rate Limiting", "Caching Layer"]
      },
      {
        name: "AWS S3",
        icon: "☁️",
        description: "Proficient in managing cloud storage with AWS S3, including file uploads, CDN integration, and security.",
        proficiency: 75,
        projects: ["Media Storage", "Backup System"]
      },
      {
        name: "Firebase",
        icon: "🔥",
        description: "Experience with Firebase services including Realtime Database, Authentication, and Cloud Functions.",
        proficiency: 80,
        projects: ["Noteflow", "Real-time Chat"]
      }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    color: "#F9D29D",
    skills: [
      {
        name: "Docker",
        icon: "🐳",
        description: "Proficient in containerization with Docker, including multi-stage builds and container orchestration.",
        proficiency: 75,
        projects: ["Microservices", "Development Environment"]
      },
      {
        name: "AWS",
        icon: "☁️",
        description: "Experience with AWS services including EC2, Lambda, and CloudFront for scalable cloud infrastructure.",
        proficiency: 70,
        projects: ["Serverless API", "Cloud Infrastructure"]
      },
      {
        name: "Git & GitHub",
        icon: "🐙",
        description: "Advanced knowledge of version control with Git, including branching strategies and CI/CD integration.",
        proficiency: 90,
        projects: ["Team Collaboration", "Automated Workflows"]
      },
      {
        name: "CI/CD",
        icon: "🔄",
        description: "Experience in setting up continuous integration and deployment pipelines for automated testing and deployment.",
        proficiency: 70,
        projects: ["Automated Testing", "Deployment Pipeline"]
      },
      {
        name: "Linux",
        icon: "🐧",
        description: "Strong understanding of Linux systems, including server management, shell scripting, and security.",
        proficiency: 75,
        projects: ["Server Management", "Automation Scripts"]
      }
    ]
  },
  {
    id: "other",
    title: "Other Technologies",
    color: "#F2B880",
    skills: [
      {
        name: "Python",
        icon: "🐍",
        description: "Proficient in Python for scripting, automation, and data analysis tasks.",
        proficiency: 80,
        projects: ["Data Analysis", "Automation Scripts"]
      },
      {
        name: "Pandas",
        icon: "🧸",
        description: "Experience with Pandas for data manipulation and analysis in Python.",
        proficiency: 75,
        projects: ["Data Processing", "Analytics Dashboard"]
      },
      {
        name: "Scikit-Learn",
        icon: "🔬",
        description: "Knowledge of machine learning fundamentals using Scikit-Learn for predictive modeling.",
        proficiency: 70,
        projects: ["ML Models", "Prediction System"]
      }
    ]
  }
];

export default skillCategories;
