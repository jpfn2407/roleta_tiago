import { useEffect } from 'react';

/**
 * Winner display component
 * Shows different messages and animations based on win type
 *
 * @param {'max' | 'small' | null} winType - Type of win
 * @param {Function} onDismiss - Handler function when display is dismissed
 */
export function WinnerDisplay({ winType, onDismiss }) {
  useEffect(() => {
    if (winType) {
      // Auto-dismiss after timeout
      const timeout = winType === 'max' ? 3000 : 1500;
      const timer = setTimeout(() => {
        if (onDismiss) {
          onDismiss();
        }
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [winType, onDismiss]);

  if (!winType) return null;

  const isMaxPrize = winType === 'max';

  return (
    <div className={`winner-display ${isMaxPrize ? 'winner-max' : 'winner-small'}`}>
      <div className="winner-content">
        {isMaxPrize ? (
          <>
            <div className="winner-icon">🎉</div>
            <h2 className="winner-title">MAX PRIZE!</h2>
            <p className="winner-message">TIAGO WINS!</p>
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
            <div className="winner-icon-small">✓</div>
            <p className="winner-message-small">Nice! Three of a kind</p>
          </>
        )}
      </div>
    </div>
  );
}
