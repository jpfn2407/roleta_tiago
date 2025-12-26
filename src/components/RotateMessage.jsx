import { useOrientation } from '../hooks/useOrientation.js';
import '../styles/RotateMessage.css';

/**
 * RotateMessage component - shows fullscreen overlay prompting user to rotate device
 * Only appears on mobile devices when in portrait orientation
 */
export function RotateMessage() {
  const { isPortrait } = useOrientation();

  // Don't render if in landscape
  if (!isPortrait) {
    return null;
  }

  return (
    <div className="rotate-message-overlay">
      <div className="rotate-message-content">
        <div className="rotate-icon">📱 ↻</div>
        <h2 className="rotate-title">Please Rotate Your Device</h2>
        <p className="rotate-text">
          This game is best experienced in landscape mode
        </p>
      </div>
    </div>
  );
}
