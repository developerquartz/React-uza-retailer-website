import { Button } from "react-bootstrap";

export default function AddToCart({
  onDecrement,
  onIncrement,
  value,
  onChange,
  min = 1,
  disabled = false,
  className=""
}) {
  return (
    <div className={`add-to-cart-wrapper ${className}`}>
      <Button onClick={() => onDecrement()}>-</Button>
      <div className="div_output2">
        <input
          type="text"
          className="form-control text-center cart-input"
          value={value}
          onChange={(event) => {
            onChange(parseInt(event.target.value));
          }}
          min={min}
          onKeyUp={(e) => {
            if (e.keyCode === 38) {
              onIncrement();
            } else if (e.keyCode === 40) {
              onDecrement();
            }
          }}
        />
      </div>
      <Button onClick={() => onIncrement()} disabled={disabled}>+</Button>
    </div>
  );
}
