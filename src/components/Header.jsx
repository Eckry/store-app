import "./styles/Header.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Filters from "./Filters";
import useFilters from "../hooks/useFilters";

export default function Header({
  interchangeShowCart,
  notification,
  interchangeShowFilters,
  showCart,
  currentPreview,
  showFilters,
}) {
  const {setQuery} = useFilters();

  function handleOnClick() {
    interchangeShowCart();
  }

  function handleSubmit(event) {
    event.preventDefault();
    setQuery(event.target.elements.input.value);
  }

  const style = { display: notification ? "flex" : "none" };

  return (
    <header className="header">
      <button
        disabled={showCart}
        className="shopping-cart-container"
        onClick={handleOnClick}
      >
        <FaShoppingCart />
        <span style={style} className="number-of-products-container">
          !
        </span>
      </button>
      <form className="filters-form" onSubmit={handleSubmit} action="submit">
        <input
          placeholder="Filter products..."
          className="text-filter"
          type="text"
          name="input"
        />
        <button className="text-filter-button" type="submit">
          <FaSearch />
        </button>
      </form>
      <label
        htmlFor="toggle-filters"
        className="toggle-filters"
      >
        <input
          onClick={interchangeShowFilters}
          type="checkbox"
          id="toggle-filters"
        />
        <span></span>
        <span></span>
        <span></span>
      </label>
        <Filters
          showFilters={showFilters}
        />
    </header>
  );
}
