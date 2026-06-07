'use client';

import { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';
import dynamic from 'next/dynamic';

// Load client-only components dynamically inside client component wrapper to prevent SSR build issues
const InteractiveCodeBackground = dynamic(() => import('./ui/InteractiveCodeBackground'), { ssr: false });
const CustomCursor = dynamic(() => import('./ui/CustomCursor'), { ssr: false });

const AppWrapper = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <InteractiveCodeBackground />
      <CustomCursor />
      {children}
    </>
  );
};

export default AppWrapper;