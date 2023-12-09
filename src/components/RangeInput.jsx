import "./styles/RangeInput.css";
import products from "../products.json";
import useDebounce from "../hooks/useDebounce";

export default function RangeInput({ setFilteredProducts, price, onChange }) {

  const debouncedMinPrice = useDebounce(price.min, 20);
  const debouncedMaxPrice = useDebounce(price.max, 20);

  function filterProducts() {
    const newFilteredProducts = products.filter((product) => {
      return product.price >= price.min && product.price <= price.max;
    });
    setFilteredProducts(newFilteredProducts);
  }

  function handleMinChange(e) {
    e.preventDefault();
    const newMinPrice = Math.min(e.target.value, price.max - 200);
    onChange(state => {return { min: newMinPrice, max: state.max }});

    filterProducts();
  }

  function handleMaxChange(e) {
    e.preventDefault();
    const newMaxPrice = Math.max(e.target.value, price.min + 200);
    onChange(state => {return { min: state.min, max: newMaxPrice }});

    filterProducts();
  }

  const minPos = (price.min / 1000) * 100;
  const maxPos = (price.max / 1000) * 100;

  return (
    <div className="wrapper">
      <div className="range-container">
        <input
          className="input"
          onChange={handleMinChange}
          value={debouncedMinPrice}
          type="range"
          min={0}
          max={1000}
        />
        <input
          className="input"
          onChange={handleMaxChange}
          value={debouncedMaxPrice}
          type="range"
          min={0}
          max={1000}
        />
      </div>
      <div className="control-wrapper">
        <div className="control" style={{ left: `${minPos}%` }}></div>
        <div className="rail">
          <div
            className="inner-rail"
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          ></div>
        </div>
        <div className="control" style={{ left: `${maxPos}%` }}></div>
      </div>
    </div>
  );
}
