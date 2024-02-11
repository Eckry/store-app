import "./styles/Header.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Filters from "./Filters";
import useFilters from "../hooks/useFilters.js";
import useCart from "../hooks/useCart.js";
import { Link } from "react-router-dom";

export default function Header() {
  const { setQuery, ...filters } = useFilters();
  const { notification } = useCart();

  function handleSubmit(event) {
    event.preventDefault();
    setQuery(event.target.elements.input.value);
  }

  const style = { display: notification ? "flex" : "none" };

  return (
    <header className="header">
      <Link to="/cart" className="shopping-cart-container" aria-label="Go to cart">
        <FaShoppingCart />
        <span style={style} className="number-of-products-container">
          !
        </span>
      </Link>
      <form className="filters-form" onSubmit={handleSubmit} action="submit">
        <input
          placeholder="Filter products..."
          className="text-filter"
          type="text"
          name="input"
        />
        <button aria-label="search" className="text-filter-button" type="submit">
          <FaSearch />
        </button>
      </form>
      <Filters filters={filters}/>
    </header>
  );
}
