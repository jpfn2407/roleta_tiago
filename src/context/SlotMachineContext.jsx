import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_SETTINGS, STORAGE_KEY, BONUS_INCREMENT } from '../utils/constants.js';

const SlotMachineContext = createContext(null);

/**
 * Loads settings from localStorage with fallback to defaults
 */
function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all fields exist
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (error) {
    console.error('Failed to load settings from localStorage:', error);
  }
  return DEFAULT_SETTINGS;
}

/**
 * Saves settings to localStorage
 */
function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings to localStorage:', error);
  }
}

export function SlotMachineProvider({ children }) {
  // Load settings from localStorage on mount
  const [settings, setSettings] = useState(loadSettings);

  // Spinning state
  const [isSpinning, setIsSpinning] = useState(false);

  // Individual reel states
  const [reelStates, setReelStates] = useState([
    { isSpinning: false, slowMotion: false, result: null },
    { isSpinning: false, slowMotion: false, result: null },
    { isSpinning: false, slowMotion: false, result: null }
  ]);

  // Current results after spin completes
  const [currentResults, setCurrentResults] = useState([null, null, null]);

  // Win type: 'max', 'small', or null
  const [winType, setWinType] = useState(null);

  // Settings modal visibility
  const [showSettings, setShowSettings] = useState(false);

  // Zeus bonus mode (when first two reels match)
  const [zeusBonusActive, setZeusBonusActive] = useState(false);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // Update settings (and save to localStorage via useEffect)
  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Increment progressive counter
  const incrementProgressiveCounter = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      attemptsSinceMaxPrize: prev.attemptsSinceMaxPrize + 1
    }));
  }, []);

  // Reset progressive counter (on max prize win)
  const resetProgressiveCounter = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      attemptsSinceMaxPrize: 0
    }));
  }, []);

  // Add bonus increment (on small win - add bonus to base probability)
  const addBonusIncrement = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      trueWinnerProbability: Math.min(prev.trueWinnerProbability + BONUS_INCREMENT, 0.95) // Cap at 95%
    }));
  }, []);

  const value = {
    // Settings
    settings,
    updateSettings,
    incrementProgressiveCounter,
    resetProgressiveCounter,
    addBonusIncrement,

    // Game state
    isSpinning,
    setIsSpinning,
    reelStates,
    setReelStates,
    currentResults,
    setCurrentResults,
    winType,
    setWinType,

    // UI state
    showSettings,
    setShowSettings,
    zeusBonusActive,
    setZeusBonusActive
  };

  return (
    <SlotMachineContext.Provider value={value}>
      {children}
    </SlotMachineContext.Provider>
  );
}

/**
 * Hook to access slot machine context
 */
export function useSlotMachineContext() {
  const context = useContext(SlotMachineContext);
  if (!context) {
    throw new Error('useSlotMachineContext must be used within SlotMachineProvider');
  }
  return context;
}
