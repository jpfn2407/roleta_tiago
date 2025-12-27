import { useState, useEffect } from 'react';
import '../styles/LandscapeWarning.css';

/**
 * Component that warns mobile users to rotate their device to landscape
 * Shows when device is in portrait mode (width < height)
 */
export function LandscapeWarning() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Check if it's a mobile device (pointer: coarse)
      const isMobile = window.matchMedia('(pointer: coarse)').matches;

      // Check if width is less than height (portrait mode)
      const isPortrait = window.innerWidth < window.innerHeight;

      // Show warning if mobile AND portrait
      setShowWarning(isMobile && isPortrait);
    };

    // Check on mount
    checkOrientation();

    // Check on resize and orientation change
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!showWarning) return null;

  return (
    <div className="landscape-warning">
      <div className="landscape-warning-content">
        <div className="rotate-icon">📱</div>
        <h2 className="landscape-warning-title">Rotate Your Device</h2>
        <p className="landscape-warning-message">
          Please rotate your device to landscape mode for the best experience
        </p>
      </div>
    </div>
  );
}
