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
  );
}
