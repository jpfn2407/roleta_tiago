import { useSlotMachineContext } from '../context/SlotMachineContext.jsx';
import { IMAGES } from '../utils/constants.js';
import '../styles/Zeus.css';

/**
 * Zeus component - displays levitating Zeus character
 * Fixed position on the right side, always visible
 * Switches to bonus image when first two reels match
 */
export function Zeus() {
  const { zeusBonusActive } = useSlotMachineContext();

  return (
    <div className="zeus-container">
      <img
        src={zeusBonusActive ? IMAGES.zeusBonus : IMAGES.zeus}
        alt="Zeus"
        className={`zeus-image ${zeusBonusActive ? 'electrocuted' : ''}`}
      />
    </div>
  );
}
