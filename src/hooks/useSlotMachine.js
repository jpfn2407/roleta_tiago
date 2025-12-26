import { useCallback } from 'react';
import { useSlotMachineContext } from '../context/SlotMachineContext.jsx';
import { calculateEffectiveProbability, generateReelResults } from '../utils/probabilityEngine.js';
import { shouldTriggerSlowMotion, getWinType } from '../utils/reelLogic.js';
import { SPIN_DURATIONS } from '../utils/constants.js';

/**
 * Custom hook that orchestrates the slot machine spin sequence
 * Handles sequential reel stopping, slow-motion suspense, and win detection
 */
export function useSlotMachine() {
  const {
    settings,
    isSpinning,
    setIsSpinning,
    reelStates,
    setReelStates,
    setCurrentResults,
    setWinType,
    incrementProgressiveCounter,
    resetProgressiveCounter
  } = useSlotMachineContext();

  /**
   * Helper function to create a promise that resolves after a delay
   */
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * Main spin function - orchestrates the entire spin sequence
   */
  const spin = useCallback(async () => {
    if (isSpinning) return; // Prevent double-clicking

    // 1. Calculate effective probability with progressive mode
    const effectiveProbability = calculateEffectiveProbability(settings);

    // 2. Generate results for all 3 reels
    const results = generateReelResults(effectiveProbability);

    // 3. Start all reels spinning
    setIsSpinning(true);
    setWinType(null); // Clear previous win
    setReelStates([
      { isSpinning: true, slowMotion: false, result: results[0] },
      { isSpinning: true, slowMotion: false, result: results[1] },
      { isSpinning: true, slowMotion: false, result: results[2] }
    ]);

    // 4. Stop Reel 1 after 2 seconds
    await sleep(SPIN_DURATIONS.REEL_1);
    setReelStates(prev => [
      { ...prev[0], isSpinning: false },
      prev[1],
      prev[2]
    ]);

    // 5. Stop Reel 2 after 3 seconds total (1 more second)
    await sleep(SPIN_DURATIONS.REEL_2 - SPIN_DURATIONS.REEL_1);
    setReelStates(prev => [
      prev[0],
      { ...prev[1], isSpinning: false },
      prev[2]
    ]);

    // 6. Check if first two reels match - enable slow-motion if they do
    const shouldSlowMo = shouldTriggerSlowMotion(results[0], results[1]);

    if (shouldSlowMo) {
      // Enable slow-motion on reel 3 for suspense
      setReelStates(prev => [
        prev[0],
        prev[1],
        { ...prev[2], slowMotion: true }
      ]);
    }

    // 7. Stop Reel 3 after either 4s (normal) or 6s (suspense) total
    const reel3Duration = shouldSlowMo
      ? SPIN_DURATIONS.REEL_3_SUSPENSE
      : SPIN_DURATIONS.REEL_3_NORMAL;

    await sleep(reel3Duration - SPIN_DURATIONS.REEL_2);

    setReelStates(prev => [
      prev[0],
      prev[1],
      { ...prev[2], isSpinning: false, slowMotion: false }
    ]);

    // 8. Detect win type
    const winResult = getWinType(results);
    setCurrentResults(results);
    setWinType(winResult);
    setIsSpinning(false);

    // 9. Update progressive counter
    if (winResult === 'max') {
      // Max prize - reset counter
      resetProgressiveCounter();
    } else {
      // Small win or loss - increment counter
      incrementProgressiveCounter();
    }

  }, [
    isSpinning,
    settings,
    setIsSpinning,
    setReelStates,
    setCurrentResults,
    setWinType,
    incrementProgressiveCounter,
    resetProgressiveCounter
  ]);

  return {
    spin,
    isSpinning,
    reelStates
  };
}
