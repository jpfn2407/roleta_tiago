/**
 * Spin button component
 * Large, prominent button that triggers the slot machine spin
 *
 * @param {Function} onClick - Handler function when button is clicked
 * @param {boolean} disabled - Whether the button is disabled (during spin)
 */
export function SpinButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`spin-button ${disabled ? 'spin-button-disabled' : ''}`}
      aria-label="Spin the slot machine"
    >
      {disabled ? 'SPINNING...' : 'SPIN'}
    </button>
  );
}
