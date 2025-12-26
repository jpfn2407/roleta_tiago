import { useState, useEffect, useRef } from 'react';
import { SOUNDS } from '../utils/constants.js';

const MUSIC_MUTE_KEY = 'slotMachine_musicMuted';

/**
 * Manages looping background music with localStorage-persisted mute state
 * Auto-starts music on page load (handles browser autoplay restrictions)
 *
 * @returns {Object} Mute state and toggle function
 */
export function useBackgroundMusic() {
  // Load mute state from localStorage
  const [isMuted, setIsMuted] = useState(() => {
    try {
      const stored = localStorage.getItem(MUSIC_MUTE_KEY);
      return stored === 'true';
    } catch (error) {
      console.warn('Failed to load music mute state:', error);
      return false;
    }
  });

  const audioRef = useRef(null);
  const hasAttemptedPlay = useRef(false);

  // Initialize audio and auto-start on mount
  useEffect(() => {
    // Create audio element
    const audio = new Audio(SOUNDS.backgroundMusic);
    audio.loop = true;
    audio.volume = 0.3; // 30% volume for background music

    audioRef.current = audio;

    // Auto-start music if not muted
    if (!isMuted && !hasAttemptedPlay.current) {
      hasAttemptedPlay.current = true;

      // Attempt to play (may be blocked by browser autoplay policy)
      audio.play().catch(err => {
        console.warn('Background music autoplay blocked. User interaction required:', err);

        // Set up one-time click listener to start music after user interaction
        const startMusicOnClick = () => {
          if (!isMuted) {
            audio.play().catch(console.warn);
          }
          document.removeEventListener('click', startMusicOnClick);
        };

        document.addEventListener('click', startMusicOnClick);
      });
    }

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []); // Run only once on mount

  // Handle mute state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.warn('Music play failed:', err);
        });
      }
    }

    // Save mute state to localStorage
    try {
      localStorage.setItem(MUSIC_MUTE_KEY, isMuted.toString());
    } catch (error) {
      console.warn('Failed to save music mute state:', error);
    }
  }, [isMuted]);

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return {
    isMuted,
    toggleMute
  };
}
