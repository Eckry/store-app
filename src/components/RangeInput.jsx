import "./styles/RangeInput.css";

export default function RangeInput({ price, onChange }) {
  function handleMinChange(e) {
    onChange({ id: "min", event: e });
  }

  function handleMaxChange(e) {
    onChange({ id: "max", event: e });
  }

  const minPos = (price.min / 10) ;
  const maxPos = (price.max / 10) ;

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

          <div className="control" style={{ left: `calc(${minPos}% - 1px)` }}>{price.min}</div>
          <div className="rail">
            <div
              className="inner-rail"
              style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
            ></div>
          </div>
          <div className="control" style={{ left: `calc(${maxPos}% - 18px)` }}>{price.max}</div>
        </div>
      </div>
    </div>
  );
}
