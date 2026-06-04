'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'cyberpunk',
  setTheme: () => {},
  themes: []
});

export const themesList = [
  { id: 'cyberpunk', name: 'Emerald Cyberpunk', color: '#8DB1A4' },
  { id: 'cosmic', name: 'Cosmic Space', color: '#a855f7' },
  { id: 'gold', name: 'Minimalist Gold', color: '#F9D29D' },
  { id: 'matrix', name: 'Virtual Matrix', color: '#22c55e' }
];

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('cyberpunk');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && themesList.some(t => t.id === savedTheme)) {
      setThemeState(savedTheme);
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme) => {
    if (!themesList.some(t => t.id === newTheme)) return;
    
    // Remove all theme classes
    themesList.forEach(t => {
      document.documentElement.classList.remove(`theme-${t.id}`);
    });
    
    // Add new theme class
    document.documentElement.classList.add(`theme-${newTheme}`);
    localStorage.setItem('portfolio-theme', newTheme);
    setThemeState(newTheme);
  };

  useEffect(() => {
    if (mounted) {
      // Set the initial theme class on mounted
      themesList.forEach(t => {
        document.documentElement.classList.remove(`theme-${t.id}`);
      });
      document.documentElement.classList.add(`theme-${theme}`);
    }
  }, [mounted, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: themesList }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
