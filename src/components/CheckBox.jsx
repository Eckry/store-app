import "./styles/CheckBox.css";

export default function CheckBox({
  category,
  interchangeSearchedCategories,
  searchedCategories,
}) {

  function handleOnChange(event) {
    interchangeSearchedCategories(event.target.value);
  }

  return (
    <div className="checkbox-container">
      <label id="category-filter" className="checkbox-label">
        <input
          onChange={handleOnChange}
          type="checkbox"
          value={category}
          checked={searchedCategories[category] || false}
        />
        <span></span>
        {category}
      </label>
    </div>
  );
}
