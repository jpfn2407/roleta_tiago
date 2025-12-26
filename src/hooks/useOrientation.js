import { useState, useEffect } from 'react';

/**
 * Hook to detect device orientation (portrait vs landscape)
 * Uses window.matchMedia to detect orientation changes
 *
 * @returns {Object} Orientation state
 */
export function useOrientation() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    // Check if matchMedia is supported
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(orientation: portrait)');

    const handleOrientationChange = (event) => {
      setIsPortrait(event.matches);
    };

    // Initial check
    setIsPortrait(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleOrientationChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  return { isPortrait };
}
