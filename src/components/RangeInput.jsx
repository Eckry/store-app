import "./styles/RangeInput.css";

export default function RangeInput({ price, onChange }) {
  function handleMinChange(e) {
    onChange({ id: "min", event: e });
  }

  function handleMaxChange(e) {
    onChange({ id: "max", event: e });
  }

  const minPos = (price.min / 1000) * 100;
  const maxPos = (price.max / 1000) * 100;

  return (
    <div className="information-container">
      <div className="wrapper">
        <div className="range-container">
          <input
            className="input"
            onChange={handleMinChange}
            value={price.min}
            type="range"
            min={0}
            max={1000}
          />
          <input
            className="input"
            onChange={handleMaxChange}
            value={price.max}
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
      <div className="price-information-container">
        <p className="price min" style={{ left: `${minPos - 7}%` }}>
          {price.min}
        </p>
        <p className="price max" style={{ left: `${maxPos - 7}%` }}>
          {price.max}
        </p>
      </div>
    </div>
  );
}
