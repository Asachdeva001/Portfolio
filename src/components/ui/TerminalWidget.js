'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import projectsData from '@/data/projects';
import skillsData from '@/data/skills';

export default function TerminalWidget({ isInline = false, onClose }) {
  const { theme, setTheme, themes } = useTheme();
  const [history, setHistory] = useState([
    { text: "Welcome to Aashish's Interactive Terminal Console [v2.4.0]", type: "info" },
    { text: "Type 'help' to see the list of available commands.", type: "muted" },
    { text: "", type: "spacer" }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef(null);
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

  const handleCommand = (cmdString) => {
    const trimmed = cmdString.trim();
    if (!trimmed) return;

    const newHistory = [...history, { text: `visitor@aashish-sachdeva:~$ ${trimmed}`, type: "command" }];
    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Save to cmd history
    const updatedCmdHistory = [...cmdHistory, trimmed];
    setCmdHistory(updatedCmdHistory);
    setHistoryIndex(updatedCmdHistory.length);

    switch (command) {
      case 'help':
        newHistory.push(
          { text: "Available commands:", type: "info" },
          { text: "  about       - Detailed biography and profile summary", type: "text" },
          { text: "  projects    - List all technical projects", type: "text" },
          { text: "  skills      - Show categorized skillset", type: "text" },
          { text: "  theme [id]  - Switch UI colors (options: cyberpunk, cosmic, gold, matrix)", type: "text" },
          { text: "  clear       - Clear console screens", type: "text" },
          { text: "  hack        - Run high-tech simulation script", type: "text" },
          ...(onClose ? [{ text: "  exit        - Close terminal console", type: "text" }] : [])
        );
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
        newHistory.push({ text: `Command not found: '${command}'. Type 'help' for options.`, type: "error" });
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
        background: 'rgba(5, 7, 7, 0.75)'
      }}
    >
      {/* Top Window Bar */}
      <div className="bg-neutral-900/80 px-4 py-3 flex items-center justify-between border-b border-white/5 select-none">
        <div className="flex items-center space-x-2">
          <div 
            onClick={onClose} 
            className={`w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer flex items-center justify-center`}
          />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-xs text-neutral-400 select-none font-sans">
          visitor@aashish-sachdeva: {isInline ? '~/home' : '~/ssh-console'}
        </div>
        <div className="w-12" /> {/* spacer */}
      </div>

      {/* Console output display */}
      <div 
        ref={consoleContainerRef}
        className="p-4 flex-1 overflow-y-auto space-y-1 text-sm select-text custom-scrollbar"
      >
        {history.map((line, idx) => {
          let colorClass = 'text-gray-300';
          if (line.type === 'info') colorClass = 'text-primary font-bold';
          if (line.type === 'primary') colorClass = 'text-primary';
          if (line.type === 'muted') colorClass = 'text-neutral-500';
          if (line.type === 'command') colorClass = 'text-accent';
          if (line.type === 'success') colorClass = 'text-emerald-400';
          if (line.type === 'error') colorClass = 'text-red-400';

          if (line.type === 'spacer') {
            return <div key={idx} className="h-2" />;
          }

          return (
            <div key={idx} className={`${colorClass} leading-relaxed whitespace-pre-wrap`}>
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* CLI Input Prompter */}
      <div className="p-4 border-t border-white/5 bg-neutral-950/30 flex items-center text-sm">
        <span className="text-accent mr-2 shrink-0 select-none">visitor@aashish-sachdeva:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 text-primary focus:ring-0 p-0"
          autoFocus={!isInline}
          spellCheck="false"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
