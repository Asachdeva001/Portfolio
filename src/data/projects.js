export const projects = [
  {
    id: "llm-encryption-guardrails",
    title: "LLM Encryption Guardrails",
    description: "A security framework to protect sensitive data while using AI tools.",
    longDescription:
      "LLM Encryption Guardrails is a security-focused system designed to safeguard sensitive information when interacting with AI and LLM-based tools. It applies encryption, access control, and policy-based guardrails to prevent data leakage, prompt injection risks, and unauthorized usage. The project focuses on responsible AI usage, enterprise security, and compliance-aware AI workflows.",
    image: null,
    technologies: ["LLMs", "Security", "Encryption", "Policy Guardrails"],
    repos: null,
    liveUrl: null,
    featured: true,
    category: "AI / Security"
  },
  {
    id: "smartmart",
    title: "SmartMart",
    description: "An AI-powered e-commerce platform with offline shopping assistance.",
    longDescription:
      "SmartMart combines online e-commerce with an intelligent offline shopping guide. Using computer vision, camera input, and Bluetooth beacons, the platform helps users navigate physical stores, discover products, compare prices, and receive personalized recommendations. It bridges the gap between digital commerce and in-store experiences.",
    image: null,
    technologies: ["Computer Vision", "AI", "Bluetooth Beacons", "Web & Mobile"],
    repos: null,
    liveUrl: null,
    featured: true,
    category: "AI / Full Stack"
  },
  {
    id: "predict-stocklive",
    title: "Predict StockLive",
    description: "A stock price prediction platform using sentiment and historical data.",
    longDescription:
      "Predict StockLive is a data-driven application that predicts stock prices for upcoming days using historical price data and sentiment analysis from social platforms. It integrates data pipelines, feature engineering, and machine learning models to visualize trends and support informed investment decisions.",
    image: null,
    technologies: ["Machine Learning", "Time Series", "Sentiment Analysis"],
    repos: null,
    liveUrl: null,
    featured: true,
    category: "Data Science / AI"
  },
  {
    id: "mental-health-ai-companion",
    title: "Mental Health AI Companion",
    description: "An AI companion focused on mental wellness and stress reduction.",
    longDescription:
      "This AI-powered mental health companion provides users with mood tracking, stress-relief games and activities, mood trend visualizations, and a community forum. The platform aims to promote emotional well-being through personalized AI interactions, analytics-driven insights, and supportive peer engagement.",
    image: null,
    technologies: ["AI", "Data Visualization", "Community Platform"],
    repos: null,
    liveUrl: null,
    featured: true,
    category: "AI / Health Tech"
  },
  {
    id: "road-safety-ai-app",
    title: "AI Road Safety Assistant",
    description: "A mobile app for road safety and signboard reading while driving.",
    longDescription:
      "An intelligent mobile application that enhances road safety by detecting and reading traffic signboards in real time using camera input. It assists drivers with alerts and contextual information, aiming to reduce accidents and improve awareness while driving.",
    image: null,
    technologies: ["Mobile App", "Computer Vision", "AI"],
    repos: null,
    liveUrl: null,
    featured: true,
    category: "AI / Mobile"
  },
  {
    id: "coppal",
    title: "COPPAL",
    description: "A digital assistant for police and law enforcement agencies.",
    longDescription:
      "COPPAL is an AI-powered legal assistant designed for police officers and law enforcement agencies. It enables fast and accurate search across legal documents such as IPC and CRPC, helping officers quickly access relevant laws, sections, and procedural guidance in the field.",
    image: null,
    technologies: ["AI", "NLP", "Legal Tech"],
    repos: null,
    liveUrl: null,
    featured: true,
    category: "AI / GovTech"
  },
  {
    id: "the-referee",
    title: "The Referee",
    description: "A city-focused decision and information assistant for Chandigarh.",
    longDescription:
      "The Referee is a localized application for Chandigarh that helps users make informed decisions while traveling or exploring the city. It compares options, explains trade-offs, and provides curated local information instead of generic recommendations.",
    image: null,
    technologies: ["Web App", "Decision Systems", "Local Data"],
    repos: null,
    liveUrl: null,
    featured: false,
    category: "Full Stack"
  },
  {
    id: "pdf-summarizer",
    title: "PDF Summarizer",
    description: "An AI tool to summarize long PDF documents efficiently.",
    longDescription:
      "PDF Summarizer uses AI and NLP techniques to extract and summarize key information from lengthy PDF documents. It is designed for students, researchers, and professionals who need quick insights without reading entire documents.",
    image: null,
    technologies: ["AI", "NLP", "Document Processing"],
    repos: null,
    liveUrl: null,
    featured: false,
    category: "AI / Utility"
  },
  {
    id: "spotify-weather-comparison",
    title: "Spotify × Weather Comparison",
    description: "A creative data experiment comparing Spotify tracks with weather patterns.",
    longDescription:
      "A fun and unconventional project that analyzes Spotify music data alongside weather conditions to identify interesting correlations between music preferences and environmental factors. Focused on data exploration, visualization, and creative analytics.",
    image: null,
    technologies: ["APIs", "Data Analysis", "Visualization"],
    repos: null,
    liveUrl: null,
    featured: false,
    category: "Data Experiment"
  },
  {
    id: "retro-pacman-ai",
    title: "Retro Pacman with AI",
    description: "A classic Pacman game enhanced with AI-driven behavior.",
    longDescription:
      "A retro-style Pacman game rebuilt with AI-controlled agents. The project explores game AI concepts such as pathfinding, decision-making, and adaptive difficulty while preserving the nostalgic gameplay experience.",
    image: null,
    technologies: ["Game AI", "JavaScript", "Algorithms"],
    repos: null,
    liveUrl: null,
    featured: false,
    category: "Game / AI"
  },
  {
    id: "ai-workspace",
    title: "AI-Workspace",
    description: "A platform for teams to collaborate on workspaces, where they can create, edit, and share documents.",
    longDescription: "AI-Workspace is a comprehensive collaboration platform designed for modern teams. It provides a seamless environment for creating, editing, and sharing documents with real-time collaboration features. Built with Next.js and powered by MongoDB, it offers a robust and scalable solution for team productivity.",
    image: "/projects/AI-Workspace.png",
    technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Express.js"],
    repos: [
      { label: "Frontend", url: "https://github.com/Ashisach001/AiWorkspace-client" },
      { label: "Backend", url: "https://github.com/Ashisach001/AiWorkspace-server" }
    ],
    liveUrl: null,
    featured: true,
    category: "Full Stack"
  },
  {
    id: "noteflow",
    title: "Noteflow",
    description: "A note and task management app that allows users to create, edit, and share notes/tasks.",
    longDescription: "Noteflow is an intuitive note and task management application built with React and Firebase. It provides users with a clean interface to organize their thoughts, manage tasks, and collaborate with others. Features include real-time synchronization, rich text editing, and seamless sharing capabilities.",
    image: "/projects/Noteflow.png",
    technologies: ["React.js", "Firebase", "Material-UI"],
    repos: "https://github.com/Ashisach001/Noteflow",
    liveUrl: null,
    featured: true,
    category: "Frontend"
  },
  {
    id: "newsdiary",
    title: "NewsDiary",
    description: "A news app that allows users to read news articles based on their interests.",
    longDescription: "NewsDiary is a modern news aggregation application that delivers personalized news content to users. Built with React and integrated with News API, it provides a clean, responsive interface for browsing news across various categories. Users can customize their news feed based on their interests and preferences.",
    image: "/projects/NewsDiary.png",
    technologies: ["React", "Tailwind CSS", "News API"],
    repos: "https://github.com/Ashisach001/News-Diary",
    liveUrl: null,
    featured: false,
    category: "Frontend"
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "A portfolio website that showcases my projects and skills.",
    longDescription: "A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features smooth animations, dark mode support, and optimized performance. Showcases projects, skills, and professional experience in an engaging and accessible format.",
    image: "/projects/Portfolio.png",
    technologies: ["Next.js", "Tailwind CSS", "React", "Framer Motion"],
    repos: "https://github.com/Ashisach001/Portfolio",
    liveUrl: null,
    featured: false,
    category: "Frontend"
  },
  {
    id: "textutils",
    title: "TextUtils",
    description: "A text utility website that allows users to analyze text and perform various text-related operations.",
    longDescription: "TextUtils is a handy web application for text manipulation and analysis. It provides various utilities including text case conversion, word/character counting, text formatting, and more. Built with React, it offers a simple and efficient interface for common text operations.",
    image: "/projects/TextUtils.png",
    technologies: ["React", "CSS", "JavaScript"],
    repos: "https://github.com/Ashisach001/TextUtils",
    liveUrl: null,
    featured: false,
    category: "Frontend"
  }
];

export default projects;
