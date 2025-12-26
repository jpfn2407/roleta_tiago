import { IMAGES } from '../utils/constants.js';
import '../styles/Zeus.css';

/**
 * Zeus component - displays levitating Zeus character
 * Fixed position on the right side, always visible
 */
export function Zeus() {
  return (
    <div className="zeus-container">
      <img
        src={IMAGES.zeus}
        alt="Zeus"
        className="zeus-image"
      />
    </div>
  );
}
