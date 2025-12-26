import { useState, useEffect, useRef } from 'react';
import { SLOT_IMAGES, ANIMATION_SPEEDS } from '../utils/constants.js';
import '../styles/Reel.css';

/**
 * Individual reel component that displays a vertical strip of images
 * Handles spinning animation with normal and slow-motion modes
 *
 * @param {boolean} isSpinning - Whether the reel is currently spinning
 * @param {boolean} slowMotion - Whether to use slow-motion animation
 * @param {number} finalResult - The final image ID when stopped
 * @param {number} reelIndex - Index of this reel (0, 1, or 2)
 */
export function Reel({ isSpinning, slowMotion, finalResult, reelIndex }) {
  // Display 3 images: top (blurred), center (focus), bottom (blurred)
  const [displayedImages, setDisplayedImages] = useState([0, 1, 2]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isSpinning) {
      // Rapidly cycle through random images while spinning
      const speed = slowMotion ? ANIMATION_SPEEDS.SLOW_MOTION : ANIMATION_SPEEDS.NORMAL;

      intervalRef.current = setInterval(() => {
        // Generate 3 random images for the visual strip
        setDisplayedImages([
          Math.floor(Math.random() * SLOT_IMAGES.length),
          Math.floor(Math.random() * SLOT_IMAGES.length),
          Math.floor(Math.random() * SLOT_IMAGES.length)
        ]);
      }, speed);
    } else {
      // Stopped - show final result in center with neighbors
      clearInterval(intervalRef.current);

      if (finalResult !== null) {
        // Show final result in center position
        const prevImage = (finalResult - 1 + SLOT_IMAGES.length) % SLOT_IMAGES.length;
        const nextImage = (finalResult + 1) % SLOT_IMAGES.length;

        setDisplayedImages([prevImage, finalResult, nextImage]);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isSpinning, slowMotion, finalResult]);

  return (
    <div className={`reel ${isSpinning ? 'reel-spinning' : ''} ${slowMotion ? 'reel-slow-motion' : ''}`}>
      <div className="reel-container">
        {/* Top image (blurred) */}
        <div className="reel-image reel-image-top">
          <img
            src={SLOT_IMAGES[displayedImages[0]].src}
            alt={SLOT_IMAGES[displayedImages[0]].name}
          />
        </div>

        {/* Center image (focus - winning position) */}
        <div className="reel-image reel-image-center">
          <img
            src={SLOT_IMAGES[displayedImages[1]].src}
            alt={SLOT_IMAGES[displayedImages[1]].name}
          />
        </div>

        {/* Bottom image (blurred) */}
        <div className="reel-image reel-image-bottom">
          <img
            src={SLOT_IMAGES[displayedImages[2]].src}
            alt={SLOT_IMAGES[displayedImages[2]].name}
          />
        </div>
      </div>
    </div>
  );
}
