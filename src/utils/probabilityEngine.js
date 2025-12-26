import { SLOT_IMAGES, MAX_PROBABILITY } from './constants.js';

/**
 * Calculates the effective probability for winning the max prize
 * based on progressive mode settings
 *
 * @param {Object} settings - Game settings
 * @param {number} settings.trueWinnerProbability - Base probability (0-1)
 * @param {boolean} settings.progressiveMode - Whether progressive mode is enabled
 * @param {number} settings.progressiveIncrementRate - Increment rate per spin (0-1)
 * @param {number} settings.attemptsSinceMaxPrize - Number of spins since last max prize
 * @returns {number} Effective probability capped at MAX_PROBABILITY
 */
export function calculateEffectiveProbability(settings) {
  const {
    trueWinnerProbability,
    progressiveMode,
    progressiveIncrementRate,
    attemptsSinceMaxPrize
  } = settings;

  let effectiveProbability = trueWinnerProbability;

  if (progressiveMode && attemptsSinceMaxPrize > 0) {
    const progressiveBonus = attemptsSinceMaxPrize * progressiveIncrementRate;
    effectiveProbability = trueWinnerProbability + progressiveBonus;
  }

  // Cap at maximum probability
  return Math.min(effectiveProbability, MAX_PROBABILITY);
}

/**
 * Generates the results for all 3 reels based on probability
 *
 * @param {number} maxPrizeProbability - Effective probability of max prize win (0-1)
 * @returns {Array<number>} Array of 3 image IDs [reel1, reel2, reel3]
 */
export function generateReelResults(maxPrizeProbability) {
  const shouldWinMaxPrize = Math.random() < maxPrizeProbability;

  if (shouldWinMaxPrize) {
    // All three reels show winner_tiago (image ID 0)
    return [0, 0, 0];
  }

  // Check if we should create a "near miss" for suspense (15% chance)
  const createNearMiss = Math.random() < 0.15;

  if (createNearMiss) {
    // First two reels match, third is different
    const matchImageId = getRandomImageId();
    let differentImageId = getRandomImageId();

    // Ensure third is actually different
    while (differentImageId === matchImageId) {
      differentImageId = getRandomImageId();
    }

    return [matchImageId, matchImageId, differentImageId];
  }

  // Small chance of other triple matches (small wins) - 5% chance
  const createSmallWin = Math.random() < 0.05;

  if (createSmallWin) {
    // All three match, but not winner_tiago
    const imageId = getRandomImageId(1); // Exclude winner_tiago (id 0)
    return [imageId, imageId, imageId];
  }

  // Complete random loss - ensure they don't all match
  let results = [
    getRandomImageId(),
    getRandomImageId(),
    getRandomImageId()
  ];

  // If by chance they all match, change the third one
  if (results[0] === results[1] && results[1] === results[2]) {
    results[2] = (results[2] + 1) % SLOT_IMAGES.length;
  }

  return results;
}

/**
 * Gets a random image ID from available images
 *
 * @param {number} minId - Minimum ID to include (default 0)
 * @returns {number} Random image ID
 */
function getRandomImageId(minId = 0) {
  const maxId = SLOT_IMAGES.length - 1;
  return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
}
