export default function CheckBox({ category, setSearchedCategories }) {
  function handleOnChange(event) {
    setSearchedCategories(event.target.value);
  }

  return (
    <div>
      <input onChange={handleOnChange} type="checkbox" value={category} />
      <label>{category}</label>
    </div>
  );
}
