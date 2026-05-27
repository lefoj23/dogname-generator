"use client"
import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Define the media query
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    
    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Create listener function
    const handleMediaQueryChange = (event : any) => {
      setIsMobile(event.matches);
    };

    // Listen for changes
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Clean up listener
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [breakpoint]);

  return isMobile;
}