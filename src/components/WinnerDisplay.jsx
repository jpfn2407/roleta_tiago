/**
 * Winner display component
 * Shows different messages and animations based on win type
 *
 * @param {'max' | 'small' | null} winType - Type of win
 * @param {Function} onDismiss - Handler function when display is dismissed
 */
export function WinnerDisplay({ winType, onDismiss }) {
  if (!winType) return null;

  const isMaxPrize = winType === 'max';

  const handleClick = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <div
      className={`winner-display ${isMaxPrize ? 'winner-max' : 'winner-small'}`}
      onClick={handleClick}
    >
      <div className="winner-content">
        {isMaxPrize ? (
          <>
            <div className="winner-icon">🎉</div>
            <h2 className="winner-title">JACKPOT!</h2>
            <p className="winner-click-hint">Click to continue</p>
            <div className="confetti">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="confetti-piece"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    backgroundColor: ['#ffd700', '#ff6b6b', '#4ecdc4', '#ff69b4'][Math.floor(Math.random() * 4)]
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="winner-icon">🎁</div>
            <h2 className="winner-title">BONUS SPIN!</h2>
            <p className="winner-message">and +1% Jackpot Probability!</p>
            <p className="winner-click-hint">Click to continue</p>
          </>
        )}
      </div>
    </div>
  );
}
