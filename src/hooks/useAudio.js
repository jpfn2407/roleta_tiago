import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * Base audio management hook using HTML5 Audio
 * Creates and controls audio playback with volume control
 *
 * @param {string} audioSrc - URL or imported audio file
 * @param {Object} options - Configuration options
 * @param {boolean} options.loop - Whether audio should loop (default: false)
 * @param {number} options.volume - Initial volume 0-1 (default: 1.0)
 * @returns {Object} Audio control methods and state
 */
export function useAudio(audioSrc, options = {}) {
  const { loop = false, volume = 1.0 } = options;

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize audio element on mount
  useEffect(() => {
    if (!audioSrc) return;

    const audio = new Audio(audioSrc);
    audio.loop = loop;
    audio.volume = volume;

    audioRef.current = audio;

    // Event listeners
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Cleanup on unmount
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [audioSrc, loop, volume]);

  // Play audio
  const play = useCallback(() => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(err => {
        console.warn('Audio play failed:', err);
      });
    }
  }, [isPlaying]);

  // Pause audio
  const pause = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Stop audio (pause and reset to beginning)
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  // Set volume
  const setVolume = useCallback((newVolume) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  }, []);

  return {
    play,
    pause,
    stop,
    isPlaying,
    setVolume,
    audioRef
  };
}
