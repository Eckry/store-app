import "./styles/Header.css";

export default function Header({
  children,
  shoppingCart,
  onClick,
  notification,
  interchangeShowFilters,
  showCart
}) {
  function handleOnClick() {
    onClick();
  }

  const style = { display: notification ? "flex" : "none" };

  return (
    <header className="header">
      <label htmlFor="toggle-filters" className="toggle-filters">
        <input
          onClick={interchangeShowFilters}
          type="checkbox"
          id="toggle-filters"
        />
        <span></span>
        <span></span>
        <span></span>
      </label>
      <button disabled={showCart} className="shopping-cart-container" onClick={handleOnClick}>
        {children}
        {shoppingCart.length ? (
          <span style={style} className="number-of-products-container">
            !
          </span>
        ) : null}
      </button>
    </header>
  );
}
