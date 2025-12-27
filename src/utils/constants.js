// Slot machine image imports
import winnerTiago from '../assets/images/winner_tiago.png';
import borges from '../assets/images/borges.png';
import daniel from '../assets/images/daniel.png';
import david from '../assets/images/david.png';
import hugo from '../assets/images/hugo.png';
import joao from '../assets/images/joao.png';
import melo from '../assets/images/melo.png';
import picoito from '../assets/images/picoito.png';
import samuel from '../assets/images/samuel.png';
import tomas from '../assets/images/tomas.png';

// Additional visual assets
import zeusImage from '../assets/images/zeus.png';
import zeusBonusImage from '../assets/images/zeus_bonus.png';
import backgroundImage from '../assets/images/background.png';
import headerImage from '../assets/images/header.png';

// Sound assets
import backgroundMusic from '../assets/sounds/background_music.mp3';
import winSound from '../assets/sounds/win.mp3';
import slowmoSound from '../assets/sounds/slowmo.mp3';
import lockSound from '../assets/sounds/lock.mp3';
import powerSound from '../assets/sounds/power.mp3';

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
  REEL_2: 3500,        // Second reel stops after 3.5 seconds (increased for suspense)
  REEL_3_NORMAL: 5000, // Third reel stops after 5 seconds (normal)
  REEL_3_SUSPENSE: 7500 // Third reel stops after 7.5 seconds (slow-motion suspense)
};

// Animation speeds (interval in milliseconds)
export const ANIMATION_SPEEDS = {
  NORMAL: 50,      // Fast spinning (50ms per image change)
  SLOW_MOTION: 200 // Slow-motion suspense (200ms per image change)
};

// Default game settings
export const DEFAULT_SETTINGS = {
  trueWinnerProbability: 0.005,    // 0.5% base probability for max prize
  progressiveMode: true,            // Progressive mode ON by default
  progressiveIncrementRate: 0.005,   // 0.5% increment per spin
  smallWinProbability: 0.2,        // 20% probability for small wins (bonus spins)
  maxProbabilityCap: 0.1,          // 10% maximum jackpot probability cap
  attemptsSinceMaxPrize: 0         // Counter starts at 0
};

// Bonus increment when small win occurs
export const BONUS_INCREMENT = 0.005; // 0.5% added to base probability on small wins

// localStorage key for persisting settings
export const STORAGE_KEY = 'slotMachineSettings';

// Maximum effective probability cap
export const MAX_PROBABILITY = 0.95; // 95% cap

// Progressive increment rate bounds (for slider)
export const PROGRESSIVE_INCREMENT_BOUNDS = {
  MIN: 0.005,  // 0.5%
  MAX: 0.1     // 10%
};

// Small win probability bounds (for slider)
export const SMALL_WIN_PROBABILITY_BOUNDS = {
  MIN: 0,      // 0%
  MAX: 0.5     // 50%
};

// Max probability cap bounds (for slider)
export const MAX_PROBABILITY_CAP_BOUNDS = {
  MIN: 0.01,   // 1%
  MAX: 0.95    // 95%
};

// Additional images for visual enhancements
export const IMAGES = {
  zeus: zeusImage,
  zeusBonus: zeusBonusImage,
  background: backgroundImage,
  header: headerImage
};

// Sound files
export const SOUNDS = {
  backgroundMusic,
  win: winSound,
  slowmo: slowmoSound,
  lock: lockSound,
  power: powerSound
};

// Sound durations (in milliseconds)
export const SOUND_DURATIONS = {
  WIN: 3000,     // 3 seconds
  SLOWMO: 5000   // 5 seconds
};
