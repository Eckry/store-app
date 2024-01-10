import "./styles/Header.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

export default function Header({
  interchangeShowCart,
  notification,
  interchangeShowFilters,
  showCart,
  currentPreview,
  setFilteredProducts,
}) {
  function handleOnClick() {
    interchangeShowCart();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const query = event.target.elements.word.value;
    setFilteredProducts(query);
  }

  const isCurrentPreviewActive = Object.keys(currentPreview).length !== 0;

  const style = { display: notification ? "flex" : "none" };
  const toggleFilters = { display: isCurrentPreviewActive ? "none" : "block" };

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
          name="word"
          type="text"
        />
        <button className="text-filter-button" type="submit">
          <FaSearch />
        </button>
      </form>
      <label
        style={toggleFilters}
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
    </header>
  );
}
