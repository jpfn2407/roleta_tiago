import { IMAGES } from '../utils/constants.js';
import '../styles/HeaderImage.css';

/**
 * HeaderImage component - replaces the "Slot Machine" h1 title
 * Displays the header.png image at the top of the page
 */
export function HeaderImage() {
  return (
    <div className="header-image-container">
      <img
        src={IMAGES.header}
        alt="Slot Machine"
        className="header-image"
      />
    </div>
  );
}
