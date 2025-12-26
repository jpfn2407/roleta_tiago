import { useRef, useEffect, useCallback } from 'react';
import { SOUNDS } from '../utils/constants.js';

/**
 * Manages one-shot sound effects for win, slow-motion, and lock events
 * Sound effects play regardless of background music mute state
 *
 * @returns {Object} Sound effect playback functions
 */
export function useSoundEffects() {
  const winAudioRef = useRef(null);
  const slowmoAudioRef = useRef(null);
  const lockAudioRef = useRef(null);

  // Initialize audio elements on mount
  useEffect(() => {
    const winAudio = new Audio(SOUNDS.win);
    const slowmoAudio = new Audio(SOUNDS.slowmo);
    const lockAudio = new Audio(SOUNDS.lock);

    winAudio.volume = 0.6;   // 60% volume for win sound
    slowmoAudio.volume = 0.5; // 50% volume for slowmo sound
    lockAudio.volume = 0.4;   // 40% volume for lock sound

    winAudioRef.current = winAudio;
    slowmoAudioRef.current = slowmoAudio;
    lockAudioRef.current = lockAudio;

    // Cleanup on unmount
    return () => {
      winAudio.pause();
      slowmoAudio.pause();
      lockAudio.pause();
      winAudio.src = '';
      slowmoAudio.src = '';
      lockAudio.src = '';
      winAudioRef.current = null;
      slowmoAudioRef.current = null;
      lockAudioRef.current = null;
    };
  }, []);

  // Play win sound (only on jackpot - triple winner_tiago)
  const playWinSound = useCallback(() => {
    if (winAudioRef.current) {
      // Reset to start in case it's still playing
      winAudioRef.current.currentTime = 0;

      winAudioRef.current.play().catch(err => {
        console.warn('Win sound play failed:', err);
      });
    }
  }, []);

  // Play slow-motion sound (during suspense animation)
  const playSlowmoSound = useCallback(() => {
    if (slowmoAudioRef.current) {
      // Reset to start in case it's still playing
      slowmoAudioRef.current.currentTime = 0;

      slowmoAudioRef.current.play().catch(err => {
        console.warn('Slowmo sound play failed:', err);
      });
    }
  }, []);

  // Play lock sound (when a reel stops/locks)
  const playLockSound = useCallback(() => {
    if (lockAudioRef.current) {
      // Reset to start in case it's still playing
      lockAudioRef.current.currentTime = 0;

      lockAudioRef.current.play().catch(err => {
        console.warn('Lock sound play failed:', err);
      });
    }
  }, []);

  return {
    playWinSound,
    playSlowmoSound,
    playLockSound
  };
}
