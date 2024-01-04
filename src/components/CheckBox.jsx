import "./styles/CheckBox.css";

export default function CheckBox({
  category,
  setSearchedCategories,
  searchedCategories,
}) {
  function handleOnChange(event) {
    setSearchedCategories(event.target.value);
  }

  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input checked={searchedCategories.includes(category)} onChange={handleOnChange} type="checkbox" value={category} />
        <span></span>
        {category}
      </label>
    </div>
  );
}
