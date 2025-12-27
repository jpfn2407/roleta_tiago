import { useState, useEffect } from 'react';
import { useSlotMachineContext } from '../context/SlotMachineContext.jsx';
import { PROGRESSIVE_INCREMENT_BOUNDS, SMALL_WIN_PROBABILITY_BOUNDS, DEFAULT_SETTINGS } from '../utils/constants.js';
import '../styles/SettingsModal.css';

/**
 * Settings modal component
 * Allows user to adjust game settings:
 * 1. Base max prize probability (0-100%)
 * 2. Progressive mode toggle (ON/OFF)
 * 3. Progressive increment rate (0.5%-10% per spin) - conditional
 */
export function SettingsModal({ isOpen, onClose }) {
  const { settings, updateSettings } = useSlotMachineContext();

  // Local state for form inputs
  const [baseProbability, setBaseProbability] = useState(settings.trueWinnerProbability);
  const [progressiveMode, setProgressiveMode] = useState(settings.progressiveMode);
  const [incrementRate, setIncrementRate] = useState(settings.progressiveIncrementRate);
  const [smallWinProbability, setSmallWinProbability] = useState(settings.smallWinProbability);

  // Sync with context when settings change externally
  useEffect(() => {
    setBaseProbability(settings.trueWinnerProbability);
    setProgressiveMode(settings.progressiveMode);
    setIncrementRate(settings.progressiveIncrementRate);
    setSmallWinProbability(settings.smallWinProbability);
  }, [settings]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  const handleSave = () => {
    updateSettings({
      trueWinnerProbability: baseProbability,
      progressiveMode: progressiveMode,
      progressiveIncrementRate: incrementRate,
      smallWinProbability: smallWinProbability
    });
    onClose();
  };

  const handleCancel = () => {
    // Reset to original values
    setBaseProbability(settings.trueWinnerProbability);
    setProgressiveMode(settings.progressiveMode);
    setIncrementRate(settings.progressiveIncrementRate);
    setSmallWinProbability(settings.smallWinProbability);
    onClose();
  };

  const handleReset = () => {
    // Ask for confirmation
    const confirmed = window.confirm(
      'Are you sure you want to reset to defaults? This will:\n\n' +
      '- Reset all settings to default values\n' +
      '- Reset attempts counter to 0\n\n' +
      'This action cannot be undone.'
    );

    if (confirmed) {
      // Reset everything to default settings
      updateSettings(DEFAULT_SETTINGS);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay" onClick={handleCancel}>
      <div className="settings-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="settings-modal-title">Settings</h2>

        {/* Input 1: Base Probability Slider */}
        <div className="settings-group">
          <label className="settings-label">
            Max Prize Base Probability: {Math.round(baseProbability * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={baseProbability}
            onChange={(e) => setBaseProbability(parseFloat(e.target.value))}
            className="settings-slider"
          />
          <div className="settings-range-labels">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Input 2: Progressive Mode Toggle */}
        <div className="settings-group">
          <label className="settings-checkbox-label">
            <input
              type="checkbox"
              checked={progressiveMode}
              onChange={(e) => setProgressiveMode(e.target.checked)}
              className="settings-checkbox"
            />
            <span>Progressive Mode</span>
          </label>
          <p className="settings-description">
            Increases win probability after each spin until max prize
          </p>
        </div>

        {/* Input 3: Progressive Increment Rate (conditional) */}
        {progressiveMode && (
          <div className="settings-group settings-group-conditional">
            <label className="settings-label">
              Progressive Increment: {(incrementRate * 100).toFixed(1)}% per spin
            </label>
            <input
              type="range"
              min={PROGRESSIVE_INCREMENT_BOUNDS.MIN}
              max={PROGRESSIVE_INCREMENT_BOUNDS.MAX}
              step="0.005"
              value={incrementRate}
              onChange={(e) => setIncrementRate(parseFloat(e.target.value))}
              className="settings-slider"
            />
            <div className="settings-range-labels">
              <span>0.5%</span>
              <span>10%</span>
            </div>
            <p className="settings-description-small">
              Current attempts: {settings.attemptsSinceMaxPrize}
            </p>
          </div>
        )}

        {/* Input 4: Bonus Spin Probability */}
        <div className="settings-group">
          <label className="settings-label">
            Bonus Spin Probability: {(smallWinProbability * 100).toFixed(1)}%
          </label>
          <input
            type="range"
            min={SMALL_WIN_PROBABILITY_BOUNDS.MIN}
            max={SMALL_WIN_PROBABILITY_BOUNDS.MAX}
            step="0.005"
            value={smallWinProbability}
            onChange={(e) => setSmallWinProbability(parseFloat(e.target.value))}
            className="settings-slider"
          />
          <div className="settings-range-labels">
            <span>0%</span>
            <span>20%</span>
          </div>
          <p className="settings-description">
            Chance of triple-match bonus spins (grants +1% jackpot probability and auto-spin)
          </p>
        </div>

        {/* Reset to Defaults Button */}
        <div className="settings-reset-container">
          <button onClick={handleReset} className="settings-button-reset">
            Reset to Defaults
          </button>
        </div>

        {/* Buttons */}
        <div className="settings-buttons">
          <button onClick={handleCancel} className="settings-button-cancel">
            Cancel
          </button>
          <button onClick={handleSave} className="settings-button-save">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
