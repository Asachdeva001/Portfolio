'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const TerminalContext = createContext(null);

export function TerminalProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Terminal modal open/close
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  
  // Terminal execution shell history
  const [history, setHistory] = useState([
    { text: "Welcome to Aashish's Interactive Terminal Console [v2.5.0]", type: "info" },
    { text: "Type 'help' to see the list of available commands.", type: "muted" },
    { text: "Type 'aashbot' or 'chat' to start a conversation with the AI guide.", type: "success" },
    { text: "Type 'walkthrough' or 'tour' to begin an interactive portfolio tour.", type: "success" },
    { text: "", type: "spacer" }
  ]);
  
  // CLI History (Up/Down arrows)
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Chat sub-shell mode for AashBot
  const [chatMode, setChatMode] = useState(false);

  // Audio/Speech State
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Walkthrough State
  const [isWalkthroughActive, setIsWalkthroughActive] = useState(false);
  const [walkthroughStep, setWalkthroughStep] = useState(0);

  // Contact Form Session Flow State for AashBot
  const [contactFormState, setContactFormState] = useState({
    step: null, // null | 'awaiting-name' | 'awaiting-email' | 'awaiting-message'
    data: { name: '', email: '', message: '' }
  });

  // Available browser speech voices cache
  const voicesRef = useRef([]);

  // Sync voice preference and load available speech synthesis voices asynchronously
  useEffect(() => {
    const savedVoice = localStorage.getItem('aashbot-voice');
    if (savedVoice) {
      setVoiceEnabled(savedVoice === 'true');
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const updateVoices = () => {
        voicesRef.current = window.speechSynthesis.getVoices();
      };
      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }, []);

  const toggleVoice = () => {
    setVoiceEnabled(prev => {
      const next = !prev;
      localStorage.setItem('aashbot-voice', String(next));
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      return next;
    });
  };

  // Speaks text using SpeechSynthesis
  const speakText = (text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // Stop any current voice output
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    
    if (!voiceEnabled) return;

    // Clean terminal prompt tokens, markdown syntax, links, and formatting for natural readout
    const cleanText = text
      .replace(/visitor@aashish-sachdeva:~\$/g, '')
      .replace(/aashbot@portfolio:~\$/g, '')
      .replace(/ashora@portfolio:~\$/g, '')
      .replace(/\[\*\]|\[!\]|\[\+\]/g, '')
      .replace(/██╔══██╗|██╔════╝|█████╗|██║|███████╗/g, '') // strip ASCII titles
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // markdown links [text](url) -> text
      .replace(/https?:\/\/\S+/g, '') // strip raw URLs
      .replace(/[*_~`]/g, '') // strip markdown bold/italic/code symbols
      .replace(/^[•\-\*]\s+/gm, '') // strip bullet point markers
      .replace(/[\r\n]+/g, '. ') // replace line breaks with pauses
      .replace(/\s+/g, ' ') // collapse whitespace
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    const voices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
    // Prioritize premium natural voices, British accents (en-GB), Edge Natural, Google UK/US
    const preferredVoice = 
      voices.find(v => v.lang === 'en-GB' && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Sonia'))) ||
      voices.find(v => v.lang === 'en-GB') ||
      voices.find(v => v.name.includes('Natural') || v.name.includes('Sonia') || v.name.includes('Aria') || v.name.includes('Stefan')) ||
      voices.find(v => v.name.includes('Google US English') || v.name.includes('Google UK English')) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    utterance.rate = 1.05; // slightly faster reading rate
    window.speechSynthesis.speak(utterance);
  };

  // Walkthrough Steps Definition
  const walkthroughSteps = [
    {
      title: "Hero Dashboard",
      path: "/",
      sectionId: "hero",
      text: "Welcome to Aashish's portfolio! I am AashBot, your interactive guide. We are starting in the Hero Section. On the right, you can see a live Developer IDE Console that showcases real-time code typing simulations and diagnostic test runs. Type 'next' or click Next to explore the About section!",
      speak: "Welcome to Aashish's portfolio! I am Ash-Bot, your interactive guide. We are starting in the Hero Section. On the right, you can see a live Developer I.D.E. Console that showcases real-time code typing and diagnostics. Type 'next' or click Next to explore the About section!"
    },
    {
      title: "About Me",
      path: "/about",
      sectionId: "about",
      text: "This is the About Section. Aashish is a Computer Science undergraduate at Punjab Engineering College (PEC), Chandigarh. He's passionate about building highly responsive, visually stunning and computationally efficient web systems. Type 'next' to see his featured projects!",
      speak: "This is the About Section. Aashish is a Computer Science undergraduate at Punjab Engineering College. He is passionate about building highly responsive, visually stunning and computationally efficient web systems. Type 'next' to see his featured projects!"
    },
    {
      title: "Technical Projects",
      path: "/projects",
      sectionId: "projects",
      text: "We are now looking at Aashish's Technical Projects. He has designed full-stack web applications, dev tooling, and API systems. Every project features detailed info on tech-stacks, repos, and architectural designs. Type 'next' to explore his skillsets!",
      speak: "We are now looking at Aashish's Technical Projects. He has designed full-stack web applications, dev tooling, and A.P.I. systems. Every project features detailed info on tech-stacks and architectural designs. Type 'next' to explore his skillsets!"
    },
    {
      title: "Skills Directory",
      path: "/skills",
      sectionId: "skills",
      text: "Here is the Skills Directory, categorized into Frontend, Backend, DevOps, and Languages. Aashish works extensively with Next.js, Node.js, Express, PostgreSQL, Docker, and AWS. Type 'next' to view his academic certifications!",
      speak: "Here is the Skills Directory, categorized into Frontend, Backend, Dev-Ops, and Languages. Aashish works extensively with Next.js, Node.js, Express, PostgreSQL, Docker, and AWS. Type 'next' to view his academic certifications!"
    },
    {
      title: "Certifications",
      path: "/certifications",
      sectionId: "certifications",
      text: "This is the Certifications gallery. Aashish has earned certifications in software engineering, backend systems, and cloud deployments from reputed institutions to validate his capabilities. Type 'next' to proceed to the Contact page!",
      speak: "This is the Certifications gallery. Aashish has earned certifications in software engineering, backend systems, and cloud deployments to validate his capabilities. Type 'next' to proceed to the Contact page!"
    },
    {
      title: "Get In Touch",
      path: "/contact",
      sectionId: "contact",
      text: "Lastly, here is the Contact page. You can send Aashish a direct message from here, or connect through his GitHub and LinkedIn handles. This wraps up our walkthrough tour! Type 'finish' or 'exit' to return to standard shell commands.",
      speak: "Lastly, here is the Contact page. You can send Aashish a direct message from here, or connect through his GitHub and LinkedIn profiles. This wraps up our walkthrough tour! Type 'finish' or 'exit' to return to standard shell commands. Thank you for exploring!"
    }
  ];

  // Helper to trigger route changing and section scrolling
  const navigateToStep = (stepIdx) => {
    if (stepIdx < 0 || stepIdx >= walkthroughSteps.length) return;
    const target = walkthroughSteps[stepIdx];
    
    // Push NextJS router path
    router.push(target.path);

    // Readout speech synthesis
    speakText(target.speak);
  };

  // Main navigation action triggers
  const startWalkthrough = () => {
    setIsWalkthroughActive(true);
    setWalkthroughStep(0);
    setIsTerminalOpen(true);
    setChatMode(false);
    
    const introText = "Starting interactive portfolio tour with AashBot...";
    const initialText = walkthroughSteps[0].text;
    
    setHistory(prev => [
      ...prev,
      { text: `visitor@aashish-sachdeva:~$ walkthrough`, type: "command" },
      { text: introText, type: "info" },
      { text: `[AashBot] Step 1/6 - ${walkthroughSteps[0].title}`, type: "primary" },
      { text: initialText, type: "text" },
      { text: "Controls: Type 'next' or click Next on the screen.", type: "muted" },
      { text: "", type: "spacer" }
    ]);
    
    navigateToStep(0);
  };

  const advanceWalkthrough = () => {
    if (!isWalkthroughActive) return;
    
    if (walkthroughStep >= walkthroughSteps.length - 1) {
      endWalkthrough(true);
      return;
    }

    const nextStep = walkthroughStep + 1;
    setWalkthroughStep(nextStep);

    setHistory(prev => [
      ...prev,
      { text: `visitor@aashish-sachdeva:~$ next`, type: "command" },
      { text: `[AashBot] Step ${nextStep + 1}/6 - ${walkthroughSteps[nextStep].title}`, type: "primary" },
      { text: walkthroughSteps[nextStep].text, type: "text" },
      { text: "", type: "spacer" }
    ]);

    navigateToStep(nextStep);
  };

  const retreatWalkthrough = () => {
    if (!isWalkthroughActive || walkthroughStep <= 0) return;

    const prevStep = walkthroughStep - 1;
    setWalkthroughStep(prevStep);

    setHistory(prev => [
      ...prev,
      { text: `visitor@aashish-sachdeva:~$ back`, type: "command" },
      { text: `[AashBot] Step ${prevStep + 1}/6 - ${walkthroughSteps[prevStep].title}`, type: "primary" },
      { text: walkthroughSteps[prevStep].text, type: "text" },
      { text: "", type: "spacer" }
    ]);

    navigateToStep(prevStep);
  };

  const endWalkthrough = (completed = false) => {
    setIsWalkthroughActive(false);
    setWalkthroughStep(0);

    const logText = completed 
      ? "Walkthrough completed successfully! Returning to standard CLI console."
      : "Walkthrough cancelled by user. Returning to standard CLI console.";

    setHistory(prev => [
      ...prev,
      { text: `visitor@aashish-sachdeva:~$ ${completed ? 'finish' : 'stop'}`, type: "command" },
      { text: logText, type: "info" },
      { text: "", type: "spacer" }
    ]);

    if (completed) {
      speakText("Walkthrough completed. Thank you for exploring Aashish's portfolio!");
    } else {
      speakText("Tour stopped. Feel free to ask me questions anytime!");
    }
  };

  return (
    <TerminalContext.Provider value={{
      isTerminalOpen,
      setIsTerminalOpen,
      history,
      setHistory,
      cmdHistory,
      setCmdHistory,
      historyIndex,
      setHistoryIndex,
      chatMode,
      setChatMode,
      voiceEnabled,
      toggleVoice,
      speakText,
      isSpeaking,
      isListening,
      setIsListening,
      isWalkthroughActive,
      walkthroughStep,
      walkthroughSteps,
      startWalkthrough,
      advanceWalkthrough,
      retreatWalkthrough,
      endWalkthrough,
      contactFormState,
      setContactFormState
    }}>
      {children}
    </TerminalContext.Provider>
  );
}

export const useTerminal = () => useContext(TerminalContext);
