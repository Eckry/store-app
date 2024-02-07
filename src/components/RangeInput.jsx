import "./styles/RangeInput.css";

export default function RangeInput({ price, onChange }) {
  function handleMinChange(e) {
    onChange(e, "min");
  }

  function handleMaxChange(e) {
    onChange(e, "max");
  }

  const minPos = price.min / 10;
  const maxPos = price.max / 10;

  return (
    <div className="wrapper">
      <div className="range-container">
        <input
          className="input"
          onChange={handleMinChange}
          value={price.min}
          type="range"
          min={0}
          max={1000}
          id="range-min"
        />
        <input
          className="input"
          onChange={handleMaxChange}
          value={price.max}
          type="range"
          min={0}
          max={1000}
          id="range-max"
        />
      </div>
      <div className="control-wrapper">
        <div className="control" style={{ left: `calc(${minPos}% - 1px)` }}>
          {price.min}
        </div>
        <div className="rail">
          <div
            className="inner-rail"
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          ></div>
        </div>
        <div className="control" style={{ left: `calc(${maxPos}% - 18px)` }}>
          {price.max}
        </div>
      </div>
    </div>
  );
}
