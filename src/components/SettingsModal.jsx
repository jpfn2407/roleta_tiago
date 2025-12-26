import { useState, useEffect } from 'react';
import { useSlotMachineContext } from '../context/SlotMachineContext.jsx';
import { PROGRESSIVE_INCREMENT_BOUNDS } from '../utils/constants.js';
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

  // Sync with context when settings change externally
  useEffect(() => {
    setBaseProbability(settings.trueWinnerProbability);
    setProgressiveMode(settings.progressiveMode);
    setIncrementRate(settings.progressiveIncrementRate);
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
      progressiveIncrementRate: incrementRate
    });
    onClose();
  };

  const handleCancel = () => {
    // Reset to original values
    setBaseProbability(settings.trueWinnerProbability);
    setProgressiveMode(settings.progressiveMode);
    setIncrementRate(settings.progressiveIncrementRate);
    onClose();
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
