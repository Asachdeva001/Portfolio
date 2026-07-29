'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

export default function DevIDEConsole() {
  const { theme } = useTheme();
  const [activeFile, setActiveFile] = useState('profile.json');
  const [typedCode, setTypedCode] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cpuPoints, setCpuPoints] = useState([20, 25, 15, 30, 45, 35, 50, 40, 60, 45, 50]);
  const [memUsage, setMemUsage] = useState(38);
  const [testOutput, setTestOutput] = useState([]);
  const typingTimerRef = useRef(null);

  // Theme colors mapping
  const getThemeColor = () => {
    switch (theme) {
      case 'cosmic':
        return { primary: '#a855f7', accent: '#06b6d4', keyword: '#f43f5e', string: '#06b6d4', number: '#f59e0b' };
      case 'gold':
        return { primary: '#F9D29D', accent: '#ffffff', keyword: '#F9D29D', string: '#d1d5db', number: '#a3a3a3' };
      case 'matrix':
        return { primary: '#22c55e', accent: '#4ade80', keyword: '#22c55e', string: '#15803d', number: '#86efac' };
      case 'cyberpunk':
      default:
        return { primary: '#8DB1A4', accent: '#F9D29D', keyword: '#F9D29D', string: '#8DB1A4', number: '#cbd5e1' };
    }
  };

  const colors = getThemeColor();

  const files = {
    'profile.json': `{
  "name": "Aashish Sachdeva",
  "role": "Full Stack Developer",
  "location": "Chandigarh, India",
  "education": "PEC, CS Undergrad",
  "passion": "Building elite digital systems",
  "status": "Ready for hire"
}`,
    'skills.js': `const technicalSkills = {
  frontend: ["React", "Next.js", "TailwindCSS"],
  backend: ["Node.js", "Express", "PostgreSQL"],
  devops: ["Docker", "Git", "AWS", "CI/CD"],
  languages: ["JavaScript", "Python", "C++"]
};

export default technicalSkills;`,
    'experience.py': `class DeveloperExperience:
    def __init__(self):
        self.history = [
            {"company": "NatWest Group", "role": "Digi X Tech Intern"},
            {"company": "CSIR-CSIO", "role": "AI/ML Research Intern"},
            {"company": "Growero.io", "role": "Full-Stack Web Dev Intern"},
            {"company": "Freelance", "role": "Full-Stack Web Developer"},
            {"company": "WebinOrbit", "role": "Frontend Web Dev Intern"}
        ]

    def get_summary(self):
        return [
            "Data & Telemetry Pipelines (Grafana/OTLP)",
            "AI/ML DEM Spatial Research (Python/MATLAB)",
            "Production Web Apps & Performance Optimization"
        ]`,
    'terminal.sh': `#!/bin/bash
echo "[-] Initializing diagnostic tests..."
npm run test:all --silent
echo "[+] All tests passed!"
echo "Status: System is fully operational."
neofetch --theme "retro-dev"`
  };

  // Typing simulator
  useEffect(() => {
    setTypedCode('');
    const fullText = files[activeFile];
    let currentIndex = 0;
    
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    // Speed typing: types 2 to 4 characters at a time for faster display
    typingTimerRef.current = setInterval(() => {
      if (currentIndex < fullText.length) {
        const charsToAdd = Math.min(3, fullText.length - currentIndex);
        setTypedCode(prev => prev + fullText.substring(currentIndex, currentIndex + charsToAdd));
        currentIndex += charsToAdd;
      } else {
        clearInterval(typingTimerRef.current);
      }
    }, 15);

    return () => clearInterval(typingTimerRef.current);
  }, [activeFile]);

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // CPU moving wave simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuPoints(prev => {
        const next = [...prev.slice(1)];
        const lastVal = prev[prev.length - 1] !== undefined ? prev[prev.length - 1] : 50;
        const newVal = Math.max(10, Math.min(90, lastVal + (Math.random() - 0.5) * 25));
        next.push(newVal);
        return next;
      });
      setMemUsage(prev => {
        const diff = (Math.random() - 0.5) * 1.5;
        return Math.max(35, Math.min(42, prev + diff));
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Diagnostic Test Logger simulation
  useEffect(() => {
    const logs = [
      "PASS  src/tests/profile.test.js (0.84s)",
      "PASS  src/tests/skills.test.js (0.42s)",
      "PASS  src/tests/experience.test.js (1.10s)",
      "PASS  src/tests/diagnostics.test.js (0.64s)",
      "Test Suites: 4 passed, 4 total",
      "Tests:       12 passed, 12 total",
      "Snapshots:   0 total",
      "Time:        3.12s",
      "Ran all test suites. Active monitor listening..."
    ];
    
    setTestOutput([]);
    let logIndex = 0;
    
    let logInterval;
    logInterval = setInterval(() => {
      if (logIndex < logs.length) {
        const nextLog = logs[logIndex];
        if (nextLog) {
          setTestOutput(prev => [...prev, nextLog]);
        }
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 400);

    return () => clearInterval(logInterval);
  }, [activeFile]);

  // SVG CPU Wave path compiler
  const compileCpuPath = () => {
    let path = `M 0 ${100 - cpuPoints[0]}`;
    const step = 250 / (cpuPoints.length - 1);
    for (let i = 1; i < cpuPoints.length; i++) {
      path += ` L ${i * step} ${100 - cpuPoints[i]}`;
    }
    return path;
  };

  // Clean CSS coloring functions (Syntax Highlighter Mock)
  const formatCodeHighlight = (text) => {
    if (!text) return '';
    // Escape standard tags
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Basic syntax matching replacements
    if (activeFile.endsWith('.json')) {
      // Keys matching
      html = html.replace(/("[a-zA-Z0-9_]+")\s*:/g, `<span style="color: ${colors.keyword}">$1</span>:`);
      // Strings matching
      html = html.replace(/:\s*("[^"]*")/g, `: <span style="color: ${colors.string}">$1</span>`);
    } else if (activeFile.endsWith('.js')) {
      // String arrays content
      html = html.replace(/("[^"]*")/g, `<span style="color: ${colors.string}">$1</span>`);
      // Keywords
      html = html.replace(/\b(const|let|var|export|default|import|from)\b/g, `<span style="color: ${colors.keyword}">$1</span>`);
      // Functions / arrays
      html = html.replace(/\b(technicalSkills)\b/g, `<span style="color: ${colors.accent}">$1</span>`);
    } else if (activeFile.endsWith('.py')) {
      // String content
      html = html.replace(/("[^"]*")/g, `<span style="color: ${colors.string}">$1</span>`);
      // Python elements
      html = html.replace(/\b(class|def|self|return)\b/g, `<span style="color: ${colors.keyword}">$1</span>`);
      // Functions
      html = html.replace(/\b(__init__)\b/g, `<span style="color: ${colors.accent}">$1</span>`);
    } else if (activeFile.endsWith('.sh')) {
      // String content
      html = html.replace(/("[^"]*")/g, `<span style="color: ${colors.string}">$1</span>`);
      // Bash commands
      html = html.replace(/\b(echo|npm|neofetch)\b/g, `<span style="color: ${colors.keyword}">$1</span>`);
    }

    return html;
  };

  return (
    <div 
      className="w-full glass-panel border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
      style={{
        background: 'rgba(7, 10, 10, 0.75)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Top IDE Window Header */}
      <div className="bg-neutral-900/95 px-4 py-3 flex items-center justify-between border-b border-white/5 select-none">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-[11px] text-neutral-400 font-mono flex items-center space-x-2 select-none">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>workspace / as-portfolio / {activeFile}</span>
        </div>
        <div className="w-8" />
      </div>

      {/* Main Split Panel (Sidebar + Code Editor) */}
      <div className="flex flex-col md:flex-row flex-1 min-h-[300px] md:min-h-[360px]">
        {/* Sidebar explorer panel */}
        <div className="w-full md:w-48 bg-neutral-950/45 border-b md:border-b-0 md:border-r border-white/5 p-3 flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-1.5 overflow-x-auto md:overflow-x-visible shrink-0 select-none">
          <div className="hidden md:block text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2 px-2">
            Explorer
          </div>
          {Object.keys(files).map((fileName) => {
            const isActive = activeFile === fileName;
            return (
              <button
                key={fileName}
                onClick={() => setActiveFile(fileName)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors shrink-0 text-left w-full"
                style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  color: isActive ? colors.primary : '#a3a3a3',
                  borderLeft: isActive ? `2px solid ${colors.primary}` : '2px solid transparent',
                }}
              >
                <span className="text-[10px] opacity-75">
                  {fileName.endsWith('.json') && '📄'}
                  {fileName.endsWith('.js') && '⚡'}
                  {fileName.endsWith('.py') && '🐍'}
                  {fileName.endsWith('.sh') && '🐚'}
                </span>
                <span>{fileName}</span>
              </button>
            );
          })}
        </div>

        {/* Text editor code display panel */}
        <div className="flex-1 bg-neutral-900/20 p-4 flex flex-col font-mono text-xs overflow-hidden select-text">
          <div className="flex-1 overflow-y-auto min-h-[180px] max-h-[260px] custom-scrollbar">
            <div className="flex items-start space-x-3.5 leading-relaxed">
              {/* Lines numbers */}
              <div className="text-neutral-600 select-none text-right w-6 space-y-0.5 opacity-60">
                {files[activeFile].split('\n').map((_, index) => (
                  <div key={index}>{index + 1}</div>
                ))}
              </div>
              
              {/* Animated Text Content */}
              <div className="flex-1 whitespace-pre-wrap select-text pr-4 relative">
                <code 
                  dangerouslySetInnerHTML={{ __html: formatCodeHighlight(typedCode) }}
                  style={{ color: '#e5e5e5' }}
                />
                <span 
                  className="inline-block w-1.5 h-4 align-middle ml-0.5"
                  style={{ 
                    backgroundColor: cursorVisible ? colors.primary : 'transparent',
                    boxShadow: cursorVisible ? `0 0 6px ${colors.primary}` : 'none'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostics / Status Bottom Panel */}
      <div className="border-t border-white/5 bg-neutral-950/60 p-4 flex flex-col lg:flex-row gap-4 lg:items-center justify-between text-[11px] font-mono select-none">
        
        {/* Left Side: Mock System Monitors */}
        <div className="flex flex-wrap items-center gap-6">
          {/* CPU Chart */}
          <div className="flex items-center space-x-3 bg-white/5 border border-white/5 rounded-lg px-3 py-2">
            <div className="flex flex-col">
              <span className="text-[9px] text-neutral-500 uppercase font-bold tracking-widest">CPU Load</span>
              <span className="text-xs font-semibold" style={{ color: colors.primary }}>
                {Math.round(cpuPoints[cpuPoints.length - 1])}%
              </span>
            </div>
            {/* CPU Mini Live SVG Chart */}
            <svg className="w-16 h-7 overflow-visible" viewBox="0 0 250 100">
              <path
                d={compileCpuPath()}
                fill="none"
                stroke={colors.primary}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Memory utilization */}
          <div className="flex items-center space-x-3 bg-white/5 border border-white/5 rounded-lg px-3 py-2">
            <div className="flex flex-col">
              <span className="text-[9px] text-neutral-500 uppercase font-bold tracking-widest">RAM Usage</span>
              <span className="text-xs font-semibold" style={{ color: colors.accent }}>
                {memUsage.toFixed(1)}%
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-16 bg-neutral-900 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  width: `${memUsage}%`,
                  backgroundColor: colors.accent,
                  boxShadow: `0 0 6px ${colors.accent}`
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Jest Test Runner Outputs */}
        <div className="flex-1 lg:max-w-xs xl:max-w-md bg-neutral-950 border border-white/5 rounded-lg p-2.5 h-16 overflow-y-auto text-[10px] custom-scrollbar text-neutral-400">
          <div className="text-[8px] uppercase tracking-wider text-neutral-500 font-bold mb-1 border-b border-white/5 pb-0.5">
            Diagnostics log
          </div>
          {testOutput.map((log, idx) => {
            if (!log) return null;
            let color = 'text-neutral-400';
            if (log.includes('PASS')) color = 'text-emerald-500 font-semibold';
            if (log.includes('passed,') && log.includes('total')) color = 'text-emerald-400';
            return (
              <div key={idx} className={`${color} leading-normal`}>
                {log}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
