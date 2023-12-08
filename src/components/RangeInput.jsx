import "./styles/RangeInput.css"

export default function RangeInput({id}) {
  return (
    <div className="range-container">
      <input id={id} />
      <label htmlFor={id}>{id}</label>
    </div>
  );
}
