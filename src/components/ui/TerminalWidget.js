'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../ThemeProvider';
import { useTerminal } from '../TerminalContext';
import { getAashBotResponse } from '@/utils/daemonAi';
import projectsData from '@/data/projects';
import skillsData from '@/data/skills';

export default function TerminalWidget({ isInline = false, onClose }) {
  const router = useRouter();
  const { theme, setTheme, themes } = useTheme();
  const {
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
    isListening,
    setIsListening,
    isWalkthroughActive,
    walkthroughStep,
    startWalkthrough,
    advanceWalkthrough,
    retreatWalkthrough,
    endWalkthrough,
    contactFormState,
    setContactFormState
  } = useTerminal();

  // Executes dynamic agentic actions returned by AashBot's NLP engine
  const executeAashBotAction = (reply, newHistoryList) => {
    if (!reply.action) return;

    switch (reply.action) {
      case 'update-contact-form':
        setContactFormState(reply.payload);
        break;

      case 'submit-contact-form':
        // Reset state and call API async
        setContactFormState({ step: null, data: { name: '', email: '', message: '' } });
        const data = reply.payload.data;
        (async () => {
          try {
            const res = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
            const resData = await res.json();
            if (resData.success) {
              setHistory(prev => [
                ...prev,
                { text: "[Ashora] Message sent successfully! 🚀", type: "success" },
                { text: "Aashish will get back to you soon. Thanks for reaching out!", type: "muted" },
                { text: "", type: "spacer" }
              ]);
              speakText("Your message has been sent successfully! Aashish will get back to you soon.");
            } else {
              throw new Error(resData.error || 'Server error');
            }
          } catch (err) {
            setHistory(prev => [
              ...prev,
              { text: `[Ashora] Error submitting message: ${err.message}`, type: "error" },
              { text: "Please try filling out the Contact page form directly instead.", type: "muted" },
              { text: "", type: "spacer" }
            ]);
            speakText("Error submitting your message. Please try the contact form page instead.");
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
        if (onClose) {
          setTimeout(() => onClose(), 800);
        } else {
          newHistoryList.push({ text: "Terminal console cannot be closed in inline mode.", type: "muted" });
        }
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

  const [inputVal, setInputVal] = useState('');
  const consoleContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new output
  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTo({
        top: consoleContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  // Focus input on console click
  const focusInput = () => {
    inputRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!isInline) {
      focusInput();
    }
  }, [isInline]);

  // STT Voice Command Recognition
  const startSpeechRecognition = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setHistory(prev => [
        ...prev,
        { text: "[Ashora] Speech Recognition is not supported by your browser. Please try Chrome, Edge, or Safari.", type: "error" },
        { text: "", type: "spacer" }
      ]);
      speakText("Voice recognition is not supported in this browser.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error(event.error);
        setIsListening(false);
        const errMsg = event.error === 'not-allowed'
          ? "Microphone permission denied. Please allow microphone access in your browser."
          : `Voice recognition stopped: ${event.error}`;
        setHistory(prev => [
          ...prev,
          { text: `[Ashora] ${errMsg}`, type: "error" },
          { text: "", type: "spacer" }
        ]);
      };

      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        if (speechToText) {
          setInputVal(speechToText);
          // Automatically execute the command
          setTimeout(() => {
            handleCommand(speechToText);
          }, 600);
        }
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
      console.error("SpeechRecognition error:", err);
    }
  };

  const handleCommand = (cmdString) => {
    const trimmed = cmdString.trim();
    if (!trimmed) return;

    const currentPrompt = chatMode 
      ? `ashora@portfolio:~$ ${trimmed}` 
      : `visitor@aashish-sachdeva:~$ ${trimmed}`;

    const newHistory = [...history, { text: currentPrompt, type: "command" }];
    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Save to CLI commands history list
    const updatedCmdHistory = [...cmdHistory, trimmed];
    setCmdHistory(updatedCmdHistory);
    setHistoryIndex(updatedCmdHistory.length);

    // 1. ROUTE CONVERSATION DIRECTLY IF IN CHATMODE
    if (chatMode) {
      if (['exit', 'bye', 'quit', 'back'].includes(command)) {
        setChatMode(false);
        newHistory.push(
          { text: "[*] Closing Ashora session...", type: "info" },
          { text: "Returning to standard Linux console. Type 'help' for core commands.", type: "muted" }
        );
        speakText("Exited Ashora chat. Standard terminal is active.");
        setHistory(newHistory);
        setInputVal('');
      } else if (command === 'clear') {
        setHistory([]);
        setInputVal('');
        return;
      } else {
        // Run query through AI proxy route asynchronously
        (async () => {
          let reply;
          try {
            const res = await fetch('/api/aashbot', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ query: trimmed, contactFormState }),
            });
            reply = await res.json();
          } catch (err) {
            // Absolute fallback client-side if Next.js proxy route is down
            reply = getAashBotResponse(trimmed, contactFormState);
          }

          const updatedHistory = [...newHistory,
            { text: "Ashora:", type: "success" },
            { text: reply.text, type: "text" }
          ];

          if (reply.suggestions && reply.suggestions.length > 0) {
            updatedHistory.push({ 
              text: `Suggestions: ${reply.suggestions.map(s => `'${s}'`).join(', ')}`, 
              type: "muted" 
            });
          }

          speakText(reply.speakText);

          if (reply.triggerWalkthrough) {
            startWalkthrough();
            setInputVal('');
            return;
          }

          // Execute dynamic action from response
          executeAashBotAction(reply, updatedHistory);

          updatedHistory.push({ text: "", type: "spacer" });
          setHistory(updatedHistory);
        })();
        setInputVal('');
      }
      return;
    }

    // 2. ROUTE TO WALKTHROUGH NAVIGATION CONTROLS IF TOUR IS ACTIVE
    if (isWalkthroughActive) {
      if (command === 'next') {
        advanceWalkthrough();
        setInputVal('');
        return;
      } else if (command === 'back') {
        retreatWalkthrough();
        setInputVal('');
        return;
      } else if (['stop', 'exit', 'finish', 'quit'].includes(command)) {
        endWalkthrough(command === 'finish');
        setInputVal('');
        return;
      }
    }

    // 3. STANDARD SYSTEM CLI SHELL COMMANDS
    switch (command) {
      case 'help':
        newHistory.push(
          { text: "Available commands:", type: "info" },
          { text: "  ashora      - Launch Ashora chat sub-shell session (to talk to AI)", type: "success" },
          { text: "  ask [query] - Query Ashora directly without leaving shell", type: "success" },
          { text: "  walkthrough - Start the interactive website walkthrough tour", type: "success" },
          { text: "  voice [on]  - Toggle voice synthesis engine on or off", type: "info" },
          { text: "  about       - Detailed biography and profile summary", type: "text" },
          { text: "  projects    - List all technical projects", type: "text" },
          { text: "  skills      - Show categorized skillset", type: "text" },
          { text: "  theme [id]  - Switch UI colors (options: cyberpunk, cosmic, gold, matrix)", type: "text" },
          { text: "  clear       - Clear console screens", type: "text" },
          { text: "  hack        - Run high-tech simulation script", type: "text" },
          ...(onClose ? [{ text: "  exit        - Close terminal console", type: "text" }] : [])
        );
        break;

      case 'ashora':
      case 'aashbot':
      case 'chat':
        setChatMode(true);
        newHistory.push(
          { text: "[*] Launching Ashora Interactive Guide Session...", type: "info" },
          { text: "[+] Connection established. System online.", type: "success" },
          { text: "Ashora: Hello! I'm here. Ask me anything about Aashish's background, skills, or portfolio. Type 'exit' to close this chat mode.", type: "text" }
        );
        speakText("Ashora session active. Ask me anything, or type exit to return to standard console.");
        break;

      case 'ask':
        if (args.length === 0) {
          newHistory.push(
            { text: "Usage: ask [your question]", type: "error" },
            { text: "Example: ask what are your core skills?", type: "muted" }
          );
          newHistory.push({ text: "", type: "spacer" });
          setHistory(newHistory);
        } else {
          const queryStr = args.join(' ');
          // Run query through AI proxy route
          (async () => {
            let reply;
            try {
              const res = await fetch('/api/aashbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: queryStr, contactFormState }),
              });
              reply = await res.json();
            } catch (err) {
              reply = getAashBotResponse(queryStr, contactFormState);
            }

            const updatedHistory = [...newHistory,
              { text: "Ashora:", type: "success" },
              { text: reply.text, type: "text" }
            ];

            speakText(reply.speakText);

            if (reply.triggerWalkthrough) {
              startWalkthrough();
              setInputVal('');
              return;
            }

            // Execute dynamic action from response
            executeAashBotAction(reply, updatedHistory);

            updatedHistory.push({ text: "", type: "spacer" });
            setHistory(updatedHistory);
          })();
        }
        break;

      case 'walkthrough':
      case 'tour':
        startWalkthrough();
        setInputVal('');
        return;

      case 'voice':
        if (args.length === 0) {
          newHistory.push({ text: `Text-to-Speech status: ${voiceEnabled ? 'ENABLED' : 'DISABLED'}. Type 'voice on' or 'voice off' to change.`, type: "info" });
        } else {
          const opt = args[0].toLowerCase();
          if (opt === 'on' || opt === 'enable') {
            if (!voiceEnabled) toggleVoice();
            newHistory.push({ text: "Voice synthesis engine activated.", type: "success" });
            setTimeout(() => speakText("Voice synthesis active. Ready!"), 200);
          } else if (opt === 'off' || opt === 'disable') {
            if (voiceEnabled) toggleVoice();
            newHistory.push({ text: "Voice synthesis engine deactivated.", type: "muted" });
          } else {
            newHistory.push({ text: `Invalid voice command: '${opt}'. Use 'voice on' or 'voice off'.`, type: "error" });
          }
        }
        break;

      case 'about':
        newHistory.push(
          { text: " ", type: "spacer" },
          { text: "  ██████╗  ███████╗  ██████╗", type: "primary" },
          { text: "  ██╔══██╗ ██╔════╝ ██╔════╝", type: "primary" },
          { text: "  ██████╔╝ █████╗   ██║     ", type: "primary" },
          { text: "  ██╔═══╝  ██╔══╝   ██║     ", type: "primary" },
          { text: "  ██║      ███████╗ ╚██████╗", type: "primary" },
          { text: "  ╚═╝      ╚══════╝  ╚═════╝", type: "primary" },
          { text: " ", type: "spacer" },
          { text: "Name: Aashish Sachdeva", type: "info" },
          { text: "Role: Full Stack Web Developer & Computer Science Undergrad", type: "info" },
          { text: "Institution: Punjab Engineering College (PEC), Chandigarh, India", type: "info" },
          { text: "Bio: Passionate about building highly responsive, visually stunning and computationally efficient digital solutions.", type: "text" },
          { text: "Extended Bio: Specialized in modern full-stack architectures (React, Next.js, Node.js, Express, MongoDB, PostgreSQL) and exploring AI/NLP integration. Driven by curiosity and detailed craftsmanship.", type: "text" }
        );
        break;

      case 'projects':
        newHistory.push({ text: "Listing featured and technical projects:", type: "info" });
        projectsData.forEach((proj, idx) => {
          newHistory.push({ 
            text: `[${idx + 1}] ${proj.title} - ${proj.description} (${proj.technologies.join(', ')})`, 
            type: "text" 
          });
        });
        newHistory.push({ text: "Type the actual URL of any project's repository in your browser to view code.", type: "muted" });
        break;

      case 'skills':
        newHistory.push({ text: "Primary Technical Skillsets:", type: "info" });
        skillsData.forEach(cat => {
          const names = cat.skills.map(s => s.name).join(', ');
          newHistory.push({ text: `* ${cat.title}: ${names}`, type: "primary" });
        });
        break;

      case 'theme':
        if (args.length === 0) {
          newHistory.push(
            { text: `Current active theme: '${theme}'`, type: "info" },
            { text: "To change, type: theme [cyberpunk | cosmic | gold | matrix]", type: "muted" }
          );
        } else {
          const requestedTheme = args[0].toLowerCase();
          const found = themes.find(t => t.id === requestedTheme);
          if (found) {
            setTheme(requestedTheme);
            newHistory.push({ text: `System theme changed to: ${found.name}`, type: "success" });
          } else {
            newHistory.push({ text: `Theme '${requestedTheme}' not found. Use 'help' or check options.`, type: "error" });
          }
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'hack':
        newHistory.push(
          { text: "[*] Establishing connection to Punjab Engineering College mainframes...", type: "error" },
          { text: "[*] Injecting payload into database server...", type: "error" },
          { text: "[*] Bypass validation guardrails: 100% SUCCESS", type: "success" },
          { text: "[*] Decrypting student portfolio metadata database...", type: "success" },
          { text: "   NAME: AASHISH SACHDEVA", type: "primary" },
          { text: "   STATUS: ELITE DEVELOPER STATUS GRANTED", type: "primary" },
          { text: "[!] Simulated Hacking Complete. Enjoy your administrative access.", type: "success" }
        );
        break;

      case 'exit':
        if (onClose) {
          onClose();
        } else {
          newHistory.push({ text: "Exit command is only available in overlay console mode.", type: "muted" });
        }
        break;

      default:
        newHistory.push({ 
          text: `Command not found: '${command}'. Did you want to speak with Ashora? Type 'ashora' or 'ask [question]'.`, 
          type: "error" 
        });
    }

    newHistory.push({ text: "", type: "spacer" });
    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      } else {
        setHistoryIndex(cmdHistory.length);
        setInputVal('');
      }
    }
  };

  return (
    <div 
      onClick={focusInput}
      className={`glass-panel border-white/10 rounded-xl overflow-hidden font-mono shadow-2xl flex flex-col ${
        isInline ? 'w-full h-[400px]' : 'w-full max-w-4xl h-[500px]'
      }`}
      style={{
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
        background: 'rgba(5, 7, 7, 0.82)'
      }}
    >
      {/* Top Window Bar */}
      <div className="bg-neutral-900/80 px-4 py-3 flex items-center justify-between border-b border-white/5 select-none">
        <div className="flex items-center space-x-2">
          {onClose ? (
            <div 
              onClick={onClose} 
              className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer flex items-center justify-center"
            />
          ) : (
            <div className="w-3 h-3 rounded-full bg-red-500/40" />
          )}
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        
        {/* Title display */}
        <div className="text-xs text-neutral-400 select-none font-sans flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>
            {chatMode 
              ? 'Ashora AI Session' 
              : isWalkthroughActive 
                ? `Tour: Step ${walkthroughStep + 1}/6 (${themes.find(t => t.id === theme)?.name})`
                : `visitor@aashish-sachdeva: ${isInline ? '~/home' : '~/ssh-console'}`
            }
          </span>
        </div>

        {/* Audio and Tour Controls in Window Header */}
        <div className="flex items-center space-x-3">
          {/* TTS Speaker Icon Indicator */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleVoice();
            }}
            className="text-neutral-400 hover:text-primary transition-colors focus:outline-none"
            title={voiceEnabled ? "Mute Speech (Voice On)" : "Enable Speech (Voice Off)"}
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
        </div>
      </div>

      {/* Console output display */}
      <div 
        ref={consoleContainerRef}
        className="p-4 flex-1 overflow-y-auto space-y-1.5 text-sm select-text custom-scrollbar font-mono"
      >
        {history.map((line, idx) => {
          let colorClass = 'text-gray-300';
          if (line.type === 'info') colorClass = 'text-primary font-bold';
          if (line.type === 'primary') colorClass = 'text-primary';
          if (line.type === 'muted') colorClass = 'text-neutral-500';
          if (line.type === 'command') colorClass = 'text-accent';
          if (line.type === 'success') colorClass = 'text-emerald-400 font-semibold';
          if (line.type === 'error') colorClass = 'text-red-400';

          if (line.type === 'spacer') {
            return <div key={idx} className="h-1" />;
          }

          return (
            <div key={idx} className={`${colorClass} leading-relaxed whitespace-pre-wrap`}>
              {line.text}
            </div>
          );
        })}
      </div>

      {/* CLI Input Prompter */}
      <div className="p-3.5 border-t border-white/5 bg-neutral-950/45 flex items-center text-sm">
        {chatMode ? (
          <span className="text-emerald-400 font-semibold mr-2 shrink-0 select-none">ashora@portfolio:~$</span>
        ) : isWalkthroughActive ? (
          <span className="text-primary font-semibold mr-2 shrink-0 select-none">tour-guide@walkthrough:~$</span>
        ) : (
          <span className="text-accent mr-2 shrink-0 select-none">visitor@aashish-sachdeva:~$</span>
        )}
        
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 text-primary focus:ring-0 p-0 font-mono"
          autoFocus={!isInline}
          spellCheck="false"
          autoComplete="off"
          placeholder={chatMode ? "Ask Ashora a question..." : isWalkthroughActive ? "Type 'next' or 'back'..." : "Type 'help'..."}
        />

        {/* Microphone STT Voice dictation trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            startSpeechRecognition();
          }}
          className={`ml-2 p-1.5 rounded-lg transition-all focus:outline-none ${
            isListening 
              ? 'bg-red-500/20 text-red-500 border border-red-500/50 animate-pulse' 
              : 'text-neutral-400 hover:text-primary hover:bg-white/5'
          }`}
          title="Dictate command (Voice command)"
        >
          {isListening ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
