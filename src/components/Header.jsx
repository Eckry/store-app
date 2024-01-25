import "./styles/Header.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Filters from "./Filters";
import useFilters from "../hooks/useFilters";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

export default function Header({ interchangeShowCart, showCart }) {
  const { setQuery } = useFilters();
  const { notification } = useCart();

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
      <Link to="/cart" className="shopping-cart-container">
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
        <button className="text-filter-button" type="submit">
          <FaSearch />
        </button>
      </form>
      <Filters />
    </header>
  );
}
