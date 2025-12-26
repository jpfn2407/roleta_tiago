// Image imports
import winnerTiago from '../assets/winner_tiago.png';
import borges from '../assets/borges.png';
import daniel from '../assets/daniel.png';
import david from '../assets/david.png';
import hugo from '../assets/hugo.png';
import joao from '../assets/joao.png';
import melo from '../assets/melo.png';
import picoito from '../assets/picoito.png';
import samuel from '../assets/samuel.png';
import tomas from '../assets/tomas.png';

// Slot images array - Index 0 is the MAX PRIZE winner
export const SLOT_IMAGES = [
  { id: 0, src: winnerTiago, name: 'winner_tiago' },
  { id: 1, src: borges, name: 'borges' },
  { id: 2, src: daniel, name: 'daniel' },
  { id: 3, src: david, name: 'david' },
  { id: 4, src: hugo, name: 'hugo' },
  { id: 5, src: joao, name: 'joao' },
  { id: 6, src: melo, name: 'melo' },
  { id: 7, src: picoito, name: 'picoito' },
  { id: 8, src: samuel, name: 'samuel' },
  { id: 9, src: tomas, name: 'tomas' }
];

// Timing constants for reel animations (in milliseconds)
export const SPIN_DURATIONS = {
  REEL_1: 2000,        // First reel stops after 2 seconds
  REEL_2: 3000,        // Second reel stops after 3 seconds
  REEL_3_NORMAL: 4000, // Third reel stops after 4 seconds (normal)
  REEL_3_SUSPENSE: 6000 // Third reel stops after 6 seconds (slow-motion suspense)
};

// Animation speeds (interval in milliseconds)
export const ANIMATION_SPEEDS = {
  NORMAL: 50,      // Fast spinning (50ms per image change)
  SLOW_MOTION: 200 // Slow-motion suspense (200ms per image change)
};

// Default game settings
export const DEFAULT_SETTINGS = {
  trueWinnerProbability: 0.1,      // 10% base probability for max prize
  progressiveMode: true,            // Progressive mode ON by default
  progressiveIncrementRate: 0.02,   // 2% increment per spin
  attemptsSinceMaxPrize: 0         // Counter starts at 0
};

// localStorage key for persisting settings
export const STORAGE_KEY = 'slotMachineSettings';

// Maximum effective probability cap
export const MAX_PROBABILITY = 0.95; // 95% cap

// Progressive increment rate bounds (for slider)
export const PROGRESSIVE_INCREMENT_BOUNDS = {
  MIN: 0.005,  // 0.5%
  MAX: 0.1     // 10%
};
