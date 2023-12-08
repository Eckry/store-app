import "./styles/RangeInput.css";
import products from "../products.json";

export default function RangeInput({
  id,
  onChange,
  setFilteredProducts,
  value,
}) {
  function handleChange(event) {
    onChange(event.target.value)
  }

  return (
    <div className="range-container">
      <input
        id={id}
        onMouseMove={handleChange}
        type="range"
        min={0}
        max={1000}
      />
      <label htmlFor={id}>{id}</label>
    </div>
  );
}
