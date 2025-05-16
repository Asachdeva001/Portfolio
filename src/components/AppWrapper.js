'use client';

import { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';

const AppWrapper = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }
  return <>{children}</>;
};

export default AppWrapper; 