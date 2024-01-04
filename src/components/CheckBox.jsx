import "./styles/CheckBox.css";

export default function CheckBox({ category, setSearchedCategories }) {
  function handleOnChange(event) {
    setSearchedCategories(event.target.value);
  }

  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input onChange={handleOnChange} type="checkbox" value={category} />
        <span></span>
        {category}
      </label>
    </div>
  );
}
