import { Reel } from './Reel.jsx';
import { SpinButton } from './SpinButton.jsx';
import { WinnerDisplay } from './WinnerDisplay.jsx';
import { SettingsModal } from './SettingsModal.jsx';
import { useSlotMachine } from '../hooks/useSlotMachine.js';
import { useSlotMachineContext } from '../context/SlotMachineContext.jsx';
import '../styles/SlotMachine.css';

/**
 * Main slot machine container component
 * Coordinates all 3 reels, spin button, winner display, and settings
 */
export function SlotMachine() {
  const { spin, isSpinning, reelStates } = useSlotMachine();
  const { winType, setWinType, showSettings, setShowSettings } = useSlotMachineContext();

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleDismissWinner = () => {
    setWinType(null);
  };

  return (
    <div className="slot-machine">
      {/* Settings button */}
      <button
        className="settings-button"
        onClick={handleOpenSettings}
        aria-label="Open settings"
        title="Settings"
      >
        ⚙️
      </button>

      {/* Title */}
      <h1 className="slot-machine-title">Slot Machine</h1>

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
