'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import TerminalWidget from './ui/TerminalWidget';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, themes } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Backtick keyboard trigger to toggle terminal console
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-md shadow-sm border-b border-white/5' : ''
        }`}
        style={{ background: isScrolled ? 'rgba(var(--bg-color-rgb), 0.85)' : 'rgba(var(--bg-color-rgb), 0.65)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="text-xl font-bold tracking-wider font-heading hover:text-accent transition-colors duration-300"
                style={{ color: 'var(--primary)' }}
              >
                AS<span style={{ color: 'var(--accent)' }}>.</span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`px-4 py-2 text-sm font-medium transition-colors relative group font-sans ${
                    isActive(item.path) 
                      ? 'text-[var(--primary)]' 
                      : 'text-gray-100 hover:text-gray-300'
                  }`}
                  style={{ color: isActive(item.path) ? 'var(--primary)' : undefined }}
                >
                  {item.name}
                  <span 
                    className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300" 
                    style={{ 
                      width: isActive(item.path) ? '100%' : '0%',
                      backgroundColor: 'var(--primary)'
                    }}
                  />
                </Link>
              ))}
            </div>

            {/* Actions Menu */}
            <div className="flex items-center space-x-3">
              {/* Terminal Launcher */}
              <button
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                className="p-2 rounded-lg text-gray-300 hover:text-[var(--primary)] hover:bg-white/5 transition-all relative group"
                title="Open SSH Terminal Console (`)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>

              {/* Theme Customizer Icon */}
              <div className="relative">
                <button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className="p-2 rounded-lg text-gray-300 hover:text-[var(--primary)] hover:bg-white/5 transition-all"
                  title="Customize Theme"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {isThemeMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl py-1 glass-panel border-white/10 z-50 overflow-hidden"
                      style={{ background: 'rgba(var(--bg-color-rgb), 0.95)' }}
                    >
                      <div className="px-3 py-2 text-xs font-semibold text-neutral-400 border-b border-white/5 font-sans">
                        Select UI Aesthetic
                      </div>
                      {themes.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setTheme(t.id);
                            setIsThemeMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between hover:bg-white/5"
                          style={{ color: theme === t.id ? 'var(--primary)' : 'var(--foreground)' }}
                        >
                          {t.name}
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggler */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-[var(--primary)] hover:bg-white/5 transition-all"
                >
                  {!isOpen ? (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-panel border-t border-white/5 border-x-0"
              style={{ background: 'rgba(var(--bg-color-rgb), 0.95)' }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="w-full text-center px-3 py-2 rounded-lg text-base font-medium transition-colors hover:bg-white/5"
                    style={{ color: isActive(item.path) ? 'var(--primary)' : 'var(--foreground)' }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating Terminal Overlay Modal */}
      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="w-full max-w-4xl"
            >
              <TerminalWidget onClose={() => setIsTerminalOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;