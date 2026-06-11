'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeProvider';
import { useTerminal } from '../TerminalContext';
import { getAashBotResponse } from '@/utils/daemonAi';
import AashBotAvatar from './AashBotAvatar';

export default function AashBotWidget() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const {
    voiceEnabled,
    toggleVoice,
    speakText,
    isSpeaking,
    isListening,
    setIsListening,
    contactFormState,
    setContactFormState
  } = useTerminal();

  // Executes dynamic agentic actions returned by AashBot's NLP engine
  const executeAashBotAction = (reply) => {
    if (!reply.action) return;

    switch (reply.action) {
      case 'update-contact-form':
        setContactFormState(reply.payload);
        break;

      case 'submit-contact-form':
        // Reset state and call API
        setContactFormState({ step: null, data: { name: '', email: '', message: '' } });
        const data = reply.payload.data;
        
        // Append a sending indicator message
        const sendingMsgId = `sending-${Date.now()}`;
        setMessages(prev => [
          ...prev,
          {
            id: sendingMsgId,
            sender: 'aashbot',
            text: 'Sending message... 📤'
          }
        ]);

        (async () => {
          try {
            const res = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
            const resData = await res.json();
            if (resData.success) {
              setMessages(prev => [
                ...prev.filter(m => m.id !== sendingMsgId),
                {
                  id: `success-${Date.now()}`,
                  sender: 'aashbot',
                  text: 'Your message has been sent successfully to Aashish! 🚀 Thanks for reaching out.'
                }
              ]);
              speakText("Your message has been sent successfully! Aashish will get back to you soon.");
            } else {
              throw new Error(resData.error || 'Server error');
            }
          } catch (err) {
            setMessages(prev => [
              ...prev.filter(m => m.id !== sendingMsgId),
              {
                id: `error-${Date.now()}`,
                sender: 'aashbot',
                text: `Error sending message: ${err.message}. Please try the Contact page form directly instead.`
              }
            ]);
            speakText("Error submitting your message. Please try the contact form page directly.");
          }
        })();
        break;

      case 'change-theme':
        setTheme(reply.payload.themeId);
        break;

      case 'navigate':
        router.push(reply.payload.path);
        break;

      case 'download-resume':
        if (typeof window !== 'undefined') {
          const link = document.createElement('a');
          link.href = reply.payload.path;
          link.download = 'Aashish_Sachdeva_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        break;

      case 'close-terminal':
        setIsOpen(false);
        break;

      case 'toggle-voice':
        const targetVal = reply.payload.enable;
        if (targetVal === 'toggle') {
          toggleVoice();
        } else if (targetVal !== voiceEnabled) {
          toggleVoice();
        }
        break;

      default:
        break;
    }
  };

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [inputVal, setInputVal] = useState('');
  
  // Custom chat history for the floating assistant
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'aashbot',
      text: "Hi! I am AashBot, Aashish's voice-enabled assistant. 🤖 Ask me about his skills, projects, or background, or click the mic to talk!",
      suggestions: ["skills", "projects", "education"]
    }
  ]);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Mount logic: show welcome pop-up after a short delay
  useEffect(() => {
    setMounted(true);
    
    // Welcome popup timer
    const popupTimer = setTimeout(() => {
      // Only show if chat widget isn't already open
      setIsOpen(open => {
        if (!open) setShowWelcome(true);
        return open;
      });
    }, 3000);

    // Auto-hide welcome popup after 12 seconds
    const hideTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 15000);

    // Track scrolling to display secondary scroll-to-top arrow
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(popupTimer);
      clearTimeout(hideTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-scroll messages feed on new outputs
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  if (!mounted) return null;

  // Handles submitting queries
  const handleSend = (textStr) => {
    const trimmed = textStr.trim();
    if (!trimmed) return;

    // 1. Add User message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // 2. Get AashBot response
    setTimeout(async () => {
      let reply;
      try {
        const res = await fetch('/api/aashbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: trimmed, contactFormState }),
        });
        reply = await res.json();
      } catch (err) {
        reply = getAashBotResponse(trimmed, contactFormState);
      }
      
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'aashbot',
        text: reply.text,
        suggestions: reply.suggestions
      };

      setMessages(prev => [...prev, botMsg]);

      // Read reply aloud if voice is enabled
      speakText(reply.speakText);

      // Execute dynamic action from response
      executeAashBotAction(reply);
    }, 600);
  };

  // STT Voice Recognition
  const triggerVoiceDictation = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'aashbot',
          text: "Voice recognition is not supported in this browser. Try Chrome or Edge."
        }
      ]);
      speakText("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setShowWelcome(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputVal(transcript);
      setTimeout(() => {
        handleSend(transcript);
      }, 650);
    };

    recognition.start();
  };

  // Scroll to top callback
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end select-none font-sans">
      
      {/* 1. SECONDARY SCROLL TO TOP TRIGGER (Renders above launcher when scrolled down) */}
      <AnimatePresence>
        {isScrolled && !isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            onClick={scrollToTop}
            className="mb-3 p-2.5 rounded-full shadow-lg border text-primary bg-neutral-950/80 border-primary/20 backdrop-blur hover:bg-primary hover:text-neutral-950 focus:outline-none transition-colors"
            title="Scroll to top"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. CHAT DIALOG CONTAINER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-[calc(100vw-2rem)] sm:w-[360px] h-[480px] glass-panel border-primary/25 rounded-2xl overflow-hidden shadow-2xl flex flex-col mb-4"
            style={{
              background: 'rgba(5, 7, 7, 0.94)',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Header */}
            <div className="bg-neutral-900/80 px-4 py-3 flex items-center justify-between border-b border-white/5 shrink-0">
              <div className="flex items-center space-x-2.5">
                <AashBotAvatar size={30} />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white tracking-wide leading-tight">AashBot</span>
                  <span className="text-[8px] text-emerald-400 font-mono tracking-widest font-bold">ONLINE</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Voice Status Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVoice();
                  }}
                  className="p-1 rounded-lg text-neutral-400 hover:text-primary transition-colors focus:outline-none"
                  title={voiceEnabled ? "Mute Voice reads" : "Unmute Voice reads"}
                >
                  {voiceEnabled ? (
                    <svg className="w-4 h-4 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z" />
                    </svg>
                  )}
                </button>

                {/* Visualizer handled dynamically inside header avatar */}

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white transition-colors focus:outline-none"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Message Feed list */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar select-text"
            >
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-1.5">
                  <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`px-4 py-2.5 text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-primary text-neutral-950 rounded-2xl rounded-tr-none shadow-md max-w-[82%]'
                          : 'bg-white/5 border border-white/5 text-neutral-200 rounded-2xl rounded-tl-none max-w-[82%]'
                      }`}
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {msg.text}
                    </div>
                  </div>

                  {/* Suggestion pills under bot messages */}
                  {msg.sender === 'aashbot' && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pl-2 pt-0.5">
                      {msg.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSend(sug)}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/5 border border-white/5 text-primary hover:bg-primary hover:text-neutral-950 transition-all focus:outline-none cursor-pointer"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer Area */}
            <div className="p-3 border-t border-white/5 bg-neutral-950/45 flex items-center shrink-0">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputVal)}
                className="bg-transparent border-none outline-none flex-1 text-sm text-neutral-200 focus:ring-0 p-0"
                placeholder={isListening ? "Listening..." : "Ask me about Aashish..."}
                disabled={isListening}
              />

              {/* Dictation Trigger */}
              <button
                onClick={triggerVoiceDictation}
                className={`p-1.5 rounded-lg mr-1.5 transition-colors focus:outline-none ${
                  isListening 
                    ? 'bg-red-500/20 text-red-500 animate-pulse border border-red-500/35' 
                    : 'text-neutral-400 hover:text-primary hover:bg-white/5'
                }`}
                title="Dictate message (Speech to Text)"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>

              {/* Send Button */}
              <button
                onClick={() => handleSend(inputVal)}
                className="p-1.5 rounded-lg text-primary hover:bg-white/5 transition-colors focus:outline-none"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. INITIAL POP-UP WELCOME BUBBLE */}
      <AnimatePresence>
        {showWelcome && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            onClick={() => {
              setIsOpen(true);
              setShowWelcome(false);
            }}
            className="mb-3 px-4 py-3 rounded-2xl glass-panel border-primary/20 shadow-xl cursor-pointer w-[280px] text-left relative"
            style={{
              background: 'rgba(5, 7, 7, 0.92)'
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowWelcome(false);
              }}
              className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-300 focus:outline-none"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center space-x-2 mb-1.5 border-b border-white/5 pb-1">
              <AashBotAvatar size={20} />
              <span className="text-xs font-bold text-primary">AashBot Online</span>
            </div>
            <div className="text-xs text-neutral-300 leading-normal pr-4">
              Hi! Click me to chat with Aashish's voice assistant or ask about his work!
            </div>
            {/* Small tail indicator */}
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 rotate-45 border-r border-b border-primary/20" style={{ background: 'rgba(5, 7, 7, 0.92)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MAIN WIDGET LAUNCHER TOGGLE BUTTON */}
      <motion.button
        whileHover={{ 
          scale: 1.05, 
          boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.55)',
          borderColor: 'var(--primary)'
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowWelcome(false);
        }}
        className="p-3.5 rounded-full shadow-2xl border transition-all duration-300 focus:outline-none text-primary"
        style={{
          background: isOpen ? 'var(--primary)' : 'rgba(5, 7, 7, 0.85)',
          color: isOpen ? 'var(--bg-color)' : 'var(--primary)',
          borderColor: isOpen ? 'var(--primary)' : 'rgba(var(--primary-rgb), 0.35)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <AashBotAvatar size={26} />
        )}
      </motion.button>
    </div>
  );
}
