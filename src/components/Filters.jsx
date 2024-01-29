import RangeInput from "./RangeInput";
import CheckBox from "./CheckBox";
import categories from "../categories.json";
import useFilters from "../hooks/useFilters";
import "./styles/Filters.css";

export default function Filters() {
  const {
    price,
    setPriceFilter,
    searchedCategories,
    interchangeSearchedCategories,
  } = useFilters();

  return (
    <div className="show-filters">
      <input className="hamburger-input" type="checkbox" id="toggle-filters" />
      <label className="toggle-filters" htmlFor="toggle-filters">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <div className="filters">
        <h3 className="filters-title">Price range</h3>
        <RangeInput onChange={setPriceFilter} price={price} />
        <h3 className="filters-title">Categories</h3>
        <div className="checkboxes-container">
          {categories.map((category) => (
            <CheckBox
              category={category}
              key={category}
              searchedCategories={searchedCategories}
              interchangeSearchedCategories={interchangeSearchedCategories}
            />
          ))}
        </div>
        <label htmlFor="theme" className="theme-label">
          <input className="theme-checkbox" id="theme" type="checkbox"/>
          <span className="theme-mark"></span>
        </label>
      </div>
    </div>
  );
}
