/**
 * Checks if the first two reels match, which should trigger slow-motion on the third reel
 *
 * @param {number} reel1Result - Image ID for reel 1
 * @param {number} reel2Result - Image ID for reel 2
 * @returns {boolean} True if reels match and should trigger suspense
 */
export function shouldTriggerSlowMotion(reel1Result, reel2Result) {
  return reel1Result === reel2Result;
}

/**
 * Checks if all three reels match (any triple match)
 *
 * @param {Array<number>} results - Array of 3 image IDs [reel1, reel2, reel3]
 * @returns {boolean} True if all three match
 */
export function isWinner(results) {
  const [reel1, reel2, reel3] = results;
  return reel1 === reel2 && reel2 === reel3;
}

/**
 * Determines the type of win based on results
 *
 * @param {Array<number>} results - Array of 3 image IDs [reel1, reel2, reel3]
 * @returns {'max' | 'small' | null} Win type:
 *   - 'max': Max prize (triple winner_tiago, image ID 0)
 *   - 'small': Small win (triple of any other image)
 *   - null: No win
 */
export function getWinType(results) {
  if (!isWinner(results)) {
    return null;
  }

  // Image ID 0 is winner_tiago (max prize)
  return results[0] === 0 ? 'max' : 'small';
}
