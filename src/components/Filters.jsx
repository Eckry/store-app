import RangeInput from "./RangeInput";
import CheckBox from "./CheckBox";
import categories from "../categories.json";
import useFilters from "../hooks/useFilters";
import "./styles/Filters.css";

export default function Filters({ showFilters}) {
  const {
    price,
    setPriceFilter,
    searchedCategories,
    interchangeSearchedCategories,
  } = useFilters();


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
            key={category}
            searchedCategories={searchedCategories}
            interchangeSearchedCategories={interchangeSearchedCategories}
          />
        ))}
      </div>
    </div>
  );
}
