import { useState, useEffect, useRef } from 'react';
import { SLOT_IMAGES } from '../utils/constants.js';
import '../styles/Reel.css';

/**
 * Individual reel component with continuous scroll animation
 * Handles spinning with normal and slow-motion modes
 *
 * @param {boolean} isSpinning - Whether the reel is currently spinning
 * @param {boolean} slowMotion - Whether to use slow-motion animation
 * @param {number} finalResult - The final image ID when stopped (0-9)
 * @param {number} reelIndex - Index of this reel (0, 1, or 2)
 */
export function Reel({ isSpinning, slowMotion, finalResult, reelIndex }) {
  const [imageStrip, setImageStrip] = useState([]);
  const stripRef = useRef(null);

  // Generate ordered image strip when spinning starts
  useEffect(() => {
    if (isSpinning) {
      // Create ordered strip with all images in sequence (no duplicates within each cycle)
      // Calculate starting offset so finalResult appears naturally at position 22
      const numImages = SLOT_IMAGES.length; // 10 images
      const targetPosition = 22; // Where we want the final result to appear
      const numRepeats = 5; // Repeat the full sequence 5 times (50 images total)

      // Calculate what offset to start from so position 22 has the finalResult
      // Without offset, position 22 would have image (22 % 10) = 2
      // To have finalResult at position 22, we need to shift the entire sequence
      const naturalImageAtTarget = targetPosition % numImages; // 22 % 10 = 2
      const offset = (finalResult - naturalImageAtTarget + numImages) % numImages;

      const strip = [];
      for (let i = 0; i < numRepeats; i++) {
        for (let j = 0; j < numImages; j++) {
          // Start from offset and wrap around
          const imageIndex = (j + offset) % numImages;
          strip.push(imageIndex);
        }
      }

      setImageStrip(strip);

      // Reset transform when starting new spin
      if (stripRef.current) {
        stripRef.current.style.transition = 'none';
        stripRef.current.style.transform = 'translateY(0)';
      }
    }
  }, [isSpinning, finalResult]);

  // Stop animation and align to final result
  useEffect(() => {
    if (!isSpinning && finalResult !== null && finalResult !== undefined && stripRef.current && imageStrip.length > 0) {
      // Calculate position to center the final result
      // Detect if mobile (pointer: coarse) for different image dimensions
      const isMobile = window.matchMedia('(pointer: coarse)').matches;

      // Image height depends on device type
      const imageHeight = isMobile ? 140 : 180;
      const viewportCenter = isMobile ? 150 : 200; // Mobile reel is 300px tall, desktop is 400px
      const stripInitialTop = isMobile ? -2940 : -3760; // Adjust for smaller images on mobile

      const targetIndex = 22;
      const targetPosition = viewportCenter - (imageHeight / 2);

      const finalTranslateY = targetPosition - stripInitialTop - (targetIndex * imageHeight);

      // Remove animation class and apply smooth transition to final position
      stripRef.current.classList.remove('reel-strip-spinning', 'reel-strip-slow-motion');

      // Small delay to ensure animation class is removed before transition
      setTimeout(() => {
        if (stripRef.current) {
          stripRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
          stripRef.current.style.transform = `translateY(${finalTranslateY}px)`;
        }
      }, 50);
    }
  }, [isSpinning, finalResult, imageStrip]);

  // Determine CSS classes for animation
  const getStripClasses = () => {
    const classes = ['reel-strip'];

    if (isSpinning) {
      if (slowMotion) {
        classes.push('reel-strip-slow-motion');
      } else {
        classes.push('reel-strip-spinning');
      }
    }

    return classes.join(' ');
  };

  return (
    <div className={`reel ${isSpinning ? 'reel-spinning' : ''} ${slowMotion ? 'reel-slow-motion' : ''}`}>
      <div
        ref={stripRef}
        className={getStripClasses()}
      >
        {imageStrip.map((imageId, index) => (
          <div key={index} className="reel-strip-image">
            <img
              src={SLOT_IMAGES[imageId].src}
              alt={SLOT_IMAGES[imageId].name}
            />
          </div>
        ))}
      </div>

      {/* Blur overlays for top and bottom */}
      <div className="reel-blur-top"></div>
      <div className="reel-blur-bottom"></div>
    </div>
  );
}
