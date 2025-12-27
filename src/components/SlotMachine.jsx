import { Reel } from './Reel.jsx';
import { SpinButton } from './SpinButton.jsx';
import { WinnerDisplay } from './WinnerDisplay.jsx';
import { SettingsModal } from './SettingsModal.jsx';
import { Zeus } from './Zeus.jsx';
import { HeaderImage } from './HeaderImage.jsx';
import { MuteButton } from './MuteButton.jsx';
import { LandscapeWarning } from './LandscapeWarning.jsx';
import { useSlotMachine } from '../hooks/useSlotMachine.js';
import { useSlotMachineContext } from '../context/SlotMachineContext.jsx';
import { calculateEffectiveProbability } from '../utils/probabilityEngine.js';
import '../styles/SlotMachine.css';

/**
 * Main slot machine container component
 * Coordinates all 3 reels, spin button, winner display, and settings
 */
export function SlotMachine() {
  const { spin, isSpinning, reelStates } = useSlotMachine();
  const { winType, setWinType, showSettings, setShowSettings, settings } = useSlotMachineContext();

  // Calculate current effective probability
  const effectiveProbability = calculateEffectiveProbability(settings);
  const probabilityPercentage = (effectiveProbability * 100).toFixed(2);

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleDismissWinner = () => {
    // Check if it was a bonus spin before dismissing
    const wasBonus = winType === 'small';
    setWinType(null);

    // Trigger auto-spin after dismissing bonus message
    if (wasBonus && !isSpinning) {
      setTimeout(() => spin(), 100);
    }
  };

  return (
    <div className="slot-machine">
      {/* Landscape warning for mobile in portrait mode */}
      <LandscapeWarning />

      {/* Zeus levitating animation (fixed position) */}
      <Zeus />

      {/* Mute button (bottom-left) */}
      <MuteButton />

      {/* Settings hover zone (bottom-right) - invisible trigger area */}
      <div className="settings-hover-zone"></div>

      {/* Settings button (bottom-right) - invisible until hover */}
      <button
        className="settings-button"
        onClick={handleOpenSettings}
        aria-label="Open settings"
        title="Settings"
      >
        ⚙️
      </button>

      {/* Header image - replaces title */}
      <HeaderImage />

      {/* Reels container */}
      <div className="reels-container">
        {reelStates.map((reelState, index) => (
          <Reel
            key={index}
            isSpinning={reelState.isSpinning}
            slowMotion={reelState.slowMotion}
            finalResult={reelState.result}
            reelIndex={index}
          />
        ))}
      </div>

      {/* Spin button */}
      <SpinButton onClick={spin} disabled={isSpinning} />

      {/* Probability display */}
      <div className="probability-display">
        Jackpot Probability: {probabilityPercentage}%
      </div>

      {/* Winner display */}
      <WinnerDisplay winType={winType} onDismiss={handleDismissWinner} />

      {/* Settings modal */}
      {showSettings && (
        <SettingsModal
          isOpen={showSettings}
          onClose={handleCloseSettings}
        />
      )}
    </div>
  );
}
