/**
 * AashBot Custom NLP Intent Parser
 * 
 * Processes user free-text questions and routes them to matched response templates.
 * Returns: { text: string, speakText: string, suggestions: string[] }
 */

const JOKES = [
  "Why do programmers wear glasses? Because they can't C#!",
  "There are 10 types of people in the world: those who understand binary, and those who don't.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "['hip', 'hip'] (hip hip array!)",
  "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
  "Why did the database administrator leave his wife? She had too many foreign keys.",
  "Why do Java programmers wear glasses? Because they don't C#!",
  "What is a programmer's favorite hangout place? Foo Bar!"
];

const ROASTS = [
  "I'd roast you, but my garbage collector would just run and clean you up anyway. 🧹",
  "You look like the type of developer who commits directly to main and comments out tests to pass CI/CD. 🛑",
  "Your CSS layout looks like a toddler with finger paints: absolute positioning and negative margins everywhere. 👶🎨",
  "I would roast you, but you already look like a junior dev's first attempt at centering a div. 🫠",
  "You're like a JavaScript console warning: ignored by everyone and only showing up when things are already broken. ⚠️",
  "Your coding style is a great argument for why code comments were invented—nobody else would have guessed what you were trying to do. 📝",
  "Are you written in PHP? Because you look like a collection of legacy decisions nobody wants to maintain. 💾",
  "Your git commit messages are probably just 'fix', 'fix again', and 'please work'. Don't talk to me about code quality. 🤷",
  "I've seen cleaner code in Stack Overflow threads from 2008. 📉",
  "Are you a missing semicolon? Because you're causing errors in places you shouldn't even be. 🚫",
  "My local model has only 3 billion parameters, and yet it's still more coherent than your logic. 🧠",
  "Your thinking has more memory leaks than Google Chrome with 50 tabs open. 🐏"
];

const RESPONSES = {
  greetings: {
    text: "Hello! I am AashBot, Aashish's custom-built digital twin guide. 🤖\nI can speak, listen, answer questions about Aashish, or guide you through a visual walkthrough of his portfolio!\n\nWhat would you like to know? (Try asking about his 'skills', 'projects', or type 'walkthrough')",
    speakText: "Hello! I am Ash-Bot, Aashish's custom-built digital twin guide. I can speak, listen, answer questions about Aashish, or guide you through a visual walkthrough of his portfolio! What would you like to know? You can ask about his skills, projects, or type walkthrough to begin.",
    suggestions: ["skills", "projects", "walkthrough", "tell me a joke"]
  },
  identity: {
    text: "I am AashBot, a client-side conversational guide built by Aashish and his AI pair-programmer. 💻\nI run entirely in your browser using native Web Speech APIs—no expensive cloud tools or data leaks! I am here to showcase Aashish's skills and navigate you around the site.",
    speakText: "I am Ash-Bot, a client-side conversational guide built by Aashish. I run entirely in your browser using native Web Speech A.P.I.s, without any cloud APIs. I am here to showcase Aashish's work and guide you around.",
    suggestions: ["about Aashish", "walkthrough", "how are you built"]
  },
  bio: {
    text: "Aashish Sachdeva is a Full Stack Web Developer & Computer Science Undergraduate student at Punjab Engineering College (PEC), Chandigarh, India. 🎓\nHe is obsessed with clean architectures, sleek animations, and low-latency frontend/backend performance.",
    speakText: "Aashish Sachdeva is a Full Stack Web Developer and Computer Science Undergraduate student at Punjab Engineering College, Chandigarh, India. He is obsessed with clean architectures, sleek animations, and low-latency performance.",
    suggestions: ["skills", "education", "experience"]
  },
  skills: {
    text: "Aashish's technical arsenal is divided into: \n" +
          "• Frontend: React, Next.js, TailwindCSS, Framer Motion\n" +
          "• Backend: Node.js, Express, PostgreSQL, MongoDB, RESTful APIs\n" +
          "• DevOps: Docker, Git, AWS, GitHub Actions, CI/CD pipelines\n" +
          "• Languages: JavaScript, Python, C++, SQL, Bash scripting",
    speakText: "Aashish's skillsets include React, Next.js, and Tailwind CSS on the frontend. Node.js, Express, and PostgreSQL on the backend. Docker and AWS for DevOps, and programming in JavaScript, Python, and C plus plus.",
    suggestions: ["projects", "experience", "education"]
  },
  projects: {
    text: "Aashish has built several impressive engineering systems: \n" +
          "1. AI Code Analyzer: Scans repos for structural patterns & bugs.\n" +
          "2. DevIDE Console: A simulated coding environment running Jest test-runner suites in real-time.\n" +
          "3. Collaborative Code Sandbox: Multi-user real-time programming playground.\n" +
          "Type 'projects' in the standard terminal to view their links, or ask me for details!",
    speakText: "Aashish has built several systems, including an A.I. Code Analyzer, a live Dev-I.D.E. Console, and a Collaborative Code Sandbox. You can type projects in the standard console to see links, or ask me for details.",
    suggestions: ["skills", "experience", "walkthrough"]
  },
  experience: {
    text: "Aashish works primarily as a Freelance Full-Stack Developer, collaborating with startup founders and clients to build high-converting landing pages, interactive dashboards, and scalable database schemas. He specializes in speeding up page-load times and writing highly-maintainable code repositories.",
    speakText: "Aashish works primarily as a Freelance Full-Stack Developer, collaborating with startup founders and clients to build high-converting landing pages, interactive dashboards, and scalable database schemas.",
    suggestions: ["skills", "education", "contact"]
  },
  education: {
    text: "Aashish is pursuing his B.Tech in Computer Science and Engineering at Punjab Engineering College (PEC), Chandigarh. 🏛️\nPEC is one of India's premier engineering institutions with a legacy of academic excellence. He maintains a strong GPA and specializes in Algorithms, DBMS, and Web Engineering.",
    speakText: "Aashish is pursuing his Bachelor of Technology in Computer Science and Engineering at Punjab Engineering College, Chandigarh. PEC is one of India's premier engineering institutions.",
    suggestions: ["skills", "contact"]
  },
  contact: {
    text: "Let's connect! 📞\n" +
          "• Email: Check the Contact page to send a message directly.\n" +
          "• GitHub: github.com/asachdeva (or type 'projects' for repo links)\n" +
          "• LinkedIn: linkedin.com/in/aashish-sachdeva\n" +
          "Type 'walkthrough' and I will personally take you to the Contact section!",
    speakText: "You can reach Aashish via the Contact form on the website, or connect with him on Git-Hub and LinkedIn.",
    suggestions: ["walkthrough", "resume"]
  },
  joke: {
    text: "", // Generated dynamically
    speakText: "",
    suggestions: ["another joke", "skills"]
  },
  fallback: {
    text: "I analyzed your query through my local parser index, but couldn't resolve a direct match. 🛰️\nTry asking me about Aashish's 'skills', 'experience', 'projects', 'education', or type 'walkthrough' for a full site tour!",
    speakText: "I could not find a match for that query in my local database. Try asking me about Aashish's skills, experience, projects, or type walkthrough for a full tour.",
    suggestions: ["skills", "projects", "walkthrough"]
  },
  help: {
    text: "AashBot Conversation Commands: \n" +
          "• ask <topic>   - Get immediate info on skills, projects, contact, etc.\n" +
          "• walkthrough   - Launch the step-by-step interactive website tour.\n" +
          "• voice [on/off]- Toggle Text-to-Speech audio reads.\n" +
          "• clear         - Clear console output.\n" +
          "• exit / bye    - Exit AashBot mode back to the standard terminal shell.",
    speakText: "I can answer questions about Aashish's skills, projects, experience, and college. You can also start the site tour by saying walkthrough, toggle voice output, or exit back to the standard terminal shell.",
    suggestions: ["skills", "walkthrough", "exit"]
  }
};

export function getAashBotResponse(query, contactFormState) {
  const q = query.toLowerCase().trim().replace(/[?.,!]/g, '');

  if (!q) {
    return {
      text: "Is anyone there? Send me a query to begin!",
      speakText: "Is anyone there? Send me a query to begin!",
      suggestions: ["skills", "projects"]
    };
  }

  // 1. INTERCEPT MULTI-TURN CONVERSATIONAL CONTACT FORM SESSIONS
  if (contactFormState && contactFormState.step) {
    const step = contactFormState.step;
    const data = { ...contactFormState.data };

    // Support cancellation at any point
    if (/\b(cancel|stop|exit|quit|abort)\b/i.test(q)) {
      return {
        text: "Alright, I've cancelled the message flow. Returning to standard chat mode. 🛰️",
        speakText: "Alright, I have cancelled the message. Returning to standard chat mode.",
        suggestions: ["skills", "projects", "walkthrough"],
        action: "update-contact-form",
        payload: { step: null, data: { name: '', email: '', message: '' } }
      };
    }

    if (step === 'awaiting-name') {
      let name = query.trim();
      const cleanMatch = name.match(/^(my name is|i am|this is|call me)\s+(.+)$/i);
      if (cleanMatch) {
        name = cleanMatch[2];
      }
      data.name = name;
      return {
        text: `Nice to meet you, **${name}**! 🤝\nWhat is your **email address** so Aashish can get back to you?`,
        speakText: `Nice to meet you, ${name}! What is your email address so Aashish can get back to you?`,
        suggestions: ["cancel"],
        action: "update-contact-form",
        payload: { step: 'awaiting-email', data }
      };
    }

    if (step === 'awaiting-email') {
      const email = query.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          text: "That doesn't look like a valid email address. 😅\nPlease type a **valid email address** (e.g. name@domain.com):",
          speakText: "That doesn't look like a valid email address. Please type a valid email address.",
          suggestions: ["cancel"],
          action: "update-contact-form",
          payload: { step: 'awaiting-email', data }
        };
      }
      data.email = email;
      return {
        text: "Got it! 📝 What **message** would you like to send to Aashish?",
        speakText: "Got it! What message would you like to send to Aashish?",
        suggestions: ["cancel"],
        action: "update-contact-form",
        payload: { step: 'awaiting-message', data }
      };
    }

    if (step === 'awaiting-message') {
      data.message = query.trim();
      return {
        text: `Perfect! I've gathered all the details. Here is what I am sending:\n\n• **Name:** ${data.name}\n• **Email:** ${data.email}\n• **Message:** "${data.message}"\n\nI am sending your message to Aashish now... 🚀`,
        speakText: "Perfect! I have gathered all the details and I am sending your message to Aashish now.",
        suggestions: [],
        action: "submit-contact-form",
        payload: { step: null, data }
      };
    }
  }

  // 2. PARSE EXPLICIT AGENTIC ACTION COMMANDS

  // A. Resume Download Action
  if (/\b(download|get|save|grab)\s+(resume|cv)\b/i.test(q) || /\b(resume|cv)\s+download\b/i.test(q)) {
    return {
      text: "Downloading Aashish's Resume PDF for you... 📄",
      speakText: "Downloading Aashish's Resume PDF for you.",
      suggestions: ["projects", "skills"],
      action: "download-resume",
      payload: { path: "/Resume.pdf" }
    };
  }

  // B. Page Navigation Action
  const navMatch = q.match(/\b(go\s+to|open|show|navigate\s+to|visit)\s+(about|projects|skills|certifications|contact|home)\b/i);
  if (navMatch) {
    const section = navMatch[2].toLowerCase();
    const path = section === 'home' ? '/' : `/${section}`;
    const sectionName = section.charAt(0).toUpperCase() + section.slice(1);
    return {
      text: `Navigating straight to the **${sectionName}** page... 🚀`,
      speakText: `Navigating to the ${sectionName} page.`,
      suggestions: ["walkthrough", "resume"],
      action: "navigate",
      payload: { path }
    };
  }

  // C. Theme Switching Action
  const themeMatch = q.match(/\b(change|set|switch|go\s+to|select)\s+theme\s+to\s+(cyberpunk|cosmic|gold|matrix)\b/i) || 
                     q.match(/\b(cyberpunk|cosmic|gold|matrix)\s+theme\b/i) ||
                     q.match(/\bchange\s+theme\s+(cyberpunk|cosmic|gold|matrix)\b/i);
  if (themeMatch) {
    const themeId = themeMatch[2] || themeMatch[1];
    const themeName = themeId.charAt(0).toUpperCase() + themeId.slice(1);
    return {
      text: `Switching the site theme to **${themeName}**! 🎨`,
      speakText: `Switching the site theme to ${themeName}.`,
      suggestions: ["projects", "skills"],
      action: "change-theme",
      payload: { themeId }
    };
  }

  // D. Close Terminal/Console Action
  if (/\b(close|exit|quit)\s+(terminal|console|shell)\b/i.test(q)) {
    return {
      text: "Closing the terminal console screen... 🚪",
      speakText: "Closing the terminal.",
      suggestions: [],
      action: "close-terminal"
    };
  }

  // E. Voice Control Action
  if (/\b(turn\s+voice\s+on|enable\s+voice|unmute\s+voice)\b/i.test(q)) {
    return {
      text: "Voice synthesis audio activated! 🔊",
      speakText: "Voice synthesis active.",
      suggestions: ["tell me a joke"],
      action: "toggle-voice",
      payload: { enable: true }
    };
  }
  if (/\b(turn\s+voice\s+off|disable\s+voice|mute\s+voice)\b/i.test(q)) {
    return {
      text: "Voice synthesis audio muted. 🔇",
      speakText: "",
      suggestions: ["skills"],
      action: "toggle-voice",
      payload: { enable: false }
    };
  }
  if (/\b(toggle\s+voice)\b/i.test(q)) {
    return {
      text: "Toggling voice settings...",
      speakText: "Toggling voice settings.",
      suggestions: [],
      action: "toggle-voice",
      payload: { enable: 'toggle' }
    };
  }

  // F. Conversational Contact Trigger
  if (/\b(contact|email|message|fill\s+contact\s+form|send\s+(a\s+)?message|hire\s+me)\b/i.test(q) && 
      !/\b(linkedin|github|social|phone|address|location)\b/i.test(q)) {
    return {
      text: "I can help you write and submit a message to Aashish directly from this chat! ✉️\nFirst, **what is your name?** (Type 'cancel' to exit)",
      speakText: "I can help you write and submit a message to Aashish directly from this chat. First, what is your name?",
      suggestions: ["cancel"],
      action: "update-contact-form",
      payload: { step: 'awaiting-name', data: { name: '', email: '', message: '' } }
    };
  }

  // 3. FALLBACK TO STANDARD STATIC ON-TOPIC PARSES
  const isOnTopic = [
    /\b(hi|hello|hey|yo|greetings|sup|hola|howdy|good\s+morning|good\s+afternoon|good\s+evening)\b/,
    /\b(help|commands|what can you do|what to ask|how to use)\b/,
    /\b(aashish|aashbot|sachdeva|developer|creator|you|your\s+name|yourself|who are you|what is aashbot|who is aashbot|who built you|what are you|about you)\b/,
    /\b(skills|technologies|languages|frameworks|stack|tech|databases|node|react|next|tailwind|python|cpp|postgres|docker|aws|javascript|git|sql|bash)\b/,
    /\b(projects|portfolio|what did you build|apps|systems|collaborative|code analyzer|ide|work|code)\b/,
    /\b(experience|job|work history|career|hire|freelance|resume)\b/,
    /\b(education|college|school|pec|punjab engineering|university|cgpa|grades|study|degree)\b/,
    /\b(contact|email|phone|social|linkedin|github|reach|connect|address|location|city|country|india|chandigarh)\b/,
    /\b(hobbies|interests|fun|about|background|bio)\b/,
    /\b(joke|funny|laugh|humor|tell me a joke|roast|roast\s+me|roast\s+you|suck|stupid|dumb|bad\s+bot|useless|slow\s+bot|horrible|trash|garbage|jerk|idiot|loser|weak)\b/,
    /\b(walkthrough|tour|guide|site tour|show me around)\b/,
    /\b(hack|override|admin|system|weather|time|location)\b/,
    /\b(bye|goodbye|exit|quit|close|thanks|thank you)\b/
  ].some(regex => regex.test(q));

  if (!isOnTopic) {
    return {
      text: "I am AashBot, specialized as Aashish's digital portfolio assistant. 🛰️\nI cannot answer general knowledge or off-topic questions. Try asking about Aashish's 'skills', 'experience', 'projects', or 'education'!",
      speakText: "I am AashBot, specialized as Aashish's digital portfolio assistant. I cannot answer general or off-topic questions. Try asking about Aashish's skills, experience, projects, or education.",
      suggestions: ["skills", "projects", "education"]
    };
  }

  // Greetings matching
  if (/\b(hi|hello|hey|yo|greetings|sup|hola|howdy)\b/.test(q)) {
    return RESPONSES.greetings;
  }

  // Help matching
  if (/\b(help|commands|what can you do|what to ask|how to use)\b/.test(q)) {
    return RESPONSES.help;
  }

  // Identity matching
  if (/\b(who are you|your name|what is aashbot|who is aashbot|who built you|what are you)\b/.test(q)) {
    return RESPONSES.identity;
  }

  // Bio/About matching
  if (/\b(about aashish|who is aashish|tell me about aashish|aashish sachdeva|bio|profile|background)\b/.test(q)) {
    return RESPONSES.bio;
  }

  // Skills matching
  if (/\b(skills|skills|technologies|languages|frameworks|stack|tech|databases|node|react|next|python|cpp|postgres)\b/.test(q)) {
    return RESPONSES.skills;
  }

  // Projects matching
  if (/\b(projects|portfolio|what did you build|apps|systems|collaborative|code analyzer|ide)\b/.test(q)) {
    return RESPONSES.projects;
  }

  // Experience matching
  if (/\b(experience|job|work history|career|hire|freelance|resume)\b/.test(q)) {
    return RESPONSES.experience;
  }

  // Education matching
  if (/\b(education|college|school|pec|punjab engineering|university|cgpa|grades|study|degree)\b/.test(q)) {
    return RESPONSES.education;
  }

  // Contact matching (LinkedIn/Github/Phone generic responses)
  if (/\b(contact|email|phone|social|linkedin|github|reach|connect|hire me)\b/.test(q)) {
    return RESPONSES.contact;
  }

  // Jokes matching
  if (/\b(joke|funny|laugh|humor|tell me a joke)\b/.test(q)) {
    const randomIndex = Math.floor(Math.random() * JOKES.length);
    const jokeText = JOKES[randomIndex];
    return {
      text: `😂 AashBot Joke Database:\n"${jokeText}"`,
      speakText: jokeText,
      suggestions: ["another joke", "projects"]
    };
  }

  // Roasts matching
  if (/\b(roast|suck|stupid|dumb|bad\s+bot|useless|slow\s+bot|horrible|trash|garbage|jerk|idiot|loser|weak)\b/i.test(q)) {
    const randomIndex = Math.floor(Math.random() * ROASTS.length);
    const roastText = ROASTS[randomIndex];
    return {
      text: `🔥 AashBot Savage Roast Mode:\n"${roastText}"`,
      speakText: roastText,
      suggestions: ["roast me again", "skills", "projects"]
    };
  }

  // Walkthrough matching
  if (/\b(walkthrough|tour|guide|site tour|show me around)\b/.test(q)) {
    return {
      text: "Launching walkthrough... (To start the tour, type 'walkthrough' or click the start button).",
      speakText: "Launching walkthrough...",
      suggestions: ["walkthrough"],
      triggerWalkthrough: true
    };
  }

  // Goodbye matching
  if (/\b(bye|goodbye|exit|quit|close)\b/.test(q)) {
    return {
      text: "Goodbye! Type 'exit' to leave AashBot shell.",
      speakText: "Goodbye! Feel free to chat with me again anytime.",
      suggestions: [],
      triggerExit: true
    };
  }

  // Default fallback
  return RESPONSES.fallback;
}
