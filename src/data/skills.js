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
        projects: ["Portfolio", "Noteflow", "NewsDiary"]
      },
      {
        name: "Next.js",
        icon: "▲",
        description: "Expertise in building full-stack applications with Next.js, including server-side rendering, API routes, and static site generation.",
        proficiency: 85,
        projects: ["Portfolio", "Ashora-Brain"]
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
        projects: ["Portfolio", "NewsDiary"]
      },
      {
        name: "Framer Motion",
        icon: "✨",
        description: "Experience in creating smooth, high-performance UI animations and page transitions.",
        proficiency: 85,
        projects: ["Portfolio"]
      }
    ]
  },
  {
    id: "backend",
    title: "Backend & Systems",
    color: "#2D4F4A",
    skills: [
      {
        name: "Java",
        icon: "☕",
        description: "Strong proficiency in Java for backend service development, Object-Oriented design, and enterprise telemetry pipelines.",
        proficiency: 85,
        projects: ["NatWest Telemetry Pipeline"]
      },
      {
        name: "Python",
        icon: "🐍",
        description: "Advanced knowledge of Python for FastAPI microservices, data processing pipelines, AI/ML research models, and automation scripts.",
        proficiency: 90,
        projects: ["Ashora AI Microservice", "CSIR-CSIO DEM Research"]
      },
      {
        name: "Node.js",
        icon: "🟢",
        description: "Advanced knowledge of Node.js for building scalable server-side applications and RESTful APIs.",
        proficiency: 85,
        projects: ["Authentication Service", "Growero.io"]
      },
      {
        name: "FastAPI / Express.js",
        icon: "⚡",
        description: "Expertise in building asynchronous high-performance APIs, Pydantic schemas, and middleware integration.",
        proficiency: 88,
        projects: ["Ashora AI Microservice"]
      },
      {
        name: "REST APIs & WebSockets",
        icon: "🌐",
        description: "Deep understanding of RESTful API design, WebSockets, real-time data streaming, and secure endpoints.",
        proficiency: 88,
        projects: ["Live Telemetry Stream", "Interactive Terminal"]
      }
    ]
  },
  {
    id: "observability",
    title: "Observability & Data Engineering",
    color: "#4A90E2",
    skills: [
      {
        name: "OpenTelemetry (OTLP)",
        icon: "📡",
        description: "Proficient in implementing distributed telemetry pipelines, OTLP metric streaming, and log standardization.",
        proficiency: 85,
        projects: ["NatWest Pipeline"]
      },
      {
        name: "Grafana & Power BI",
        icon: "📊",
        description: "Experience building real-time observability dashboards, operational KPI tracking, and automated monthly analytics summarizers.",
        proficiency: 85,
        projects: ["NatWest Grafana Dashboard", "Power BI Summarizer"]
      },
      {
        name: "XML / JSON Pipelines",
        icon: "🔄",
        description: "Architecting automated utility parsing pipelines to convert structured XML consumer reports into standardized JSON schemas.",
        proficiency: 90,
        projects: ["NatWest Utility Pipeline"]
      }
    ]
  },
  {
    id: "database",
    title: "Database & Storage",
    color: "#0A0F0D",
    skills: [
      {
        name: "PostgreSQL",
        icon: "🐘",
        description: "Strong knowledge of PostgreSQL, relational schema design, complex query optimization, and transactions.",
        proficiency: 85,
        projects: ["Enterprise Storage", "Portfolio Backend"]
      },
      {
        name: "MongoDB",
        icon: "🍃",
        description: "Advanced experience with MongoDB, schema design, document indexing, and aggregation pipelines.",
        proficiency: 85,
        projects: ["User Analytics System", "Growero.io"]
      },
      {
        name: "Redis",
        icon: "🔴",
        description: "Experience in using Redis for caching, session management, and real-time pub/sub messaging.",
        proficiency: 75,
        projects: ["Caching Layer"]
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
    title: "DevOps & Cloud",
    color: "#F9D29D",
    skills: [
      {
        name: "Docker",
        icon: "🐳",
        description: "Proficient in containerization with Docker, multi-stage builds, and deployment on cloud instances.",
        proficiency: 80,
        projects: ["Ashora AI Container", "Growero.io"]
      },
      {
        name: "AWS & Render",
        icon: "☁️",
        description: "Experience deploying web services, cloud infrastructure, EC2/S3, and automated cloud deployments.",
        proficiency: 80,
        projects: ["Ashora Deployment", "Cloud Infrastructure"]
      },
      {
        name: "Git & GitHub Actions",
        icon: "🐙",
        description: "Advanced version control, branching strategies, and CI/CD automated deployment pipelines.",
        proficiency: 90,
        projects: ["CI/CD Pipeline", "Team Collaboration"]
      },
      {
        name: "Linux & Bash",
        icon: "🐧",
        description: "Strong understanding of Linux server administration, shell scripting, and automation.",
        proficiency: 80,
        projects: ["Server Management", "Automation Scripts"]
      }
    ]
  },
  {
    id: "ai_ml",
    title: "AI / ML & Spatial Data",
    color: "#F2B880",
    skills: [
      {
        name: "Scikit-Learn & PyTorch",
        icon: "🔬",
        description: "Building machine learning classification pipelines, NLP models, and deep learning architectures.",
        proficiency: 82,
        projects: ["Ashora ML Intent Pipeline", "CSIR-CSIO Research"]
      },
      {
        name: "MATLAB & DEM Analysis",
        icon: "📐",
        description: "Evaluating Digital Elevation Model (DEM) data, terrain spatial profile reconstruction, and signal processing.",
        proficiency: 80,
        projects: ["CSIR-CSIO Palaeochannel Research"]
      },
      {
        name: "Gemini RAG & LLMs",
        icon: "🤖",
        description: "Integrating Google GenAI Gemini APIs, RAG context synthesis, and custom digital twin agentic personas.",
        proficiency: 88,
        projects: ["Ashora AI Engine"]
      }
    ]
  }
];

export default skillCategories;
