export const projects = [
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
