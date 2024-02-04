import RangeInput from "./RangeInput";
import CheckBox from "./CheckBox";
import categories from "../categories.json";
import useFilters from "../hooks/useFilters.js";
import "./styles/Filters.css";
import { PiSnowflake } from "react-icons/pi";
import { FaMoon } from "react-icons/fa6";
import useTheme from "../hooks/useTheme.js";

export default function Filters() {
  const {
    price,
    setPriceFilter,
    searchedCategories,
    interchangeSearchedCategories,
  } = useFilters();

  const { isLight, interchangeTheme } = useTheme();

  function handleOnChange() {
    interchangeTheme();
  }

  return (
    <section className="show-filters">
      <input className="hamburger-input" role="show-filters" type="checkbox" id="toggle-filters" />
      <label className="toggle-filters" htmlFor="toggle-filters">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <div className="filters">
        <h1 className="filters-title">Price range</h1>
        <RangeInput onChange={setPriceFilter} price={price} />
        <h1 className="filters-title">Categories</h1>
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
          <input
            checked={isLight}
            onChange={handleOnChange}
            className="theme-checkbox"
            id="theme"
            type="checkbox"
          />
          <span className="theme-mark"></span>
          <PiSnowflake className="theme-icon" />
          <FaMoon className="theme-icon"/>
        </label>
      </div>
    </section>
  );
}
