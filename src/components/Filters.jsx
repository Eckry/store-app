import RangeInput from "./RangeInput";
import CheckBox from "./CheckBox";
import categories from "../categories.json";
import "./styles/Filters.css";

export default function Filters({
  setPriceFilter,
  price,
  setSearchedCategories,
  showFilters,
  currentPreview,
  searchedCategories
}) {
  const displayFilters = Object.keys(currentPreview).length !== 0;

  if (displayFilters) return;

  return (
    <div className={showFilters ? "filters" : "filters-hide"}>
      <h3 className="filters-title">Price range</h3>
      <div className="price-range-container">
        <RangeInput onChange={setPriceFilter} price={price} />
      </div>
      <h3 className="filters-title">Categories</h3>
      <div className="checkboxes-container">
        {categories.map((category) => (
          <CheckBox
            category={category}
            setSearchedCategories={setSearchedCategories}
            key={category}
            searchedCategories={searchedCategories}
          />
        ))}
      </div>
    </div>
  );
}
