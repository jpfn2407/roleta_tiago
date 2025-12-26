import { useBackgroundMusic } from '../hooks/useBackgroundMusic.js';
import '../styles/MuteButton.css';

/**
 * MuteButton component - controls background music mute state
 * Fixed position at bottom-left, only mutes music (NOT sound effects)
 */
export function MuteButton() {
  const { isMuted, toggleMute } = useBackgroundMusic();

  return (
    <button
      className="mute-button"
      onClick={toggleMute}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      title={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  );
}
