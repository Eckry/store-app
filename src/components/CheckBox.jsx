import "./styles/CheckBox.css";
import useFilters from "../hooks/useFilters";

export default function CheckBox({
  category,
  searchedCategories,
  interchangeSearchedCategories
}) {
  function handleOnChange(event) {
    interchangeSearchedCategories(event.target.value);
  }

  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input
          checked={searchedCategories[category]}
          onChange={handleOnChange}
          type="checkbox"
          value={category}
        />
        <span></span>
        {category}
      </label>
    </div>
  );
}
