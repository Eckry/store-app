import "./styles/CheckBox.css"

export default function CheckBox({ category, setSearchedCategories }) {
  function handleOnChange(event) {
    setSearchedCategories(event.target.value);
  }

  return (
    <div>
      <input onChange={handleOnChange} type="checkbox" value={category} />
      <label className="checkbox-text">{category}</label>
    </div>
  );
}
