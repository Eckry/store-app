import "./styles/Header.css";

export default function Header({
  children,
  onClick,
  notification,
  interchangeShowFilters,
  showCart,
  currentPreview,
}) {
  function handleOnClick() {
    onClick();
  }

  const isCurrentPreviewActive = Object.keys(currentPreview).length !== 0;

  const style = { display: notification ? "flex" : "none" };
  const toggleFilters = { display: isCurrentPreviewActive ? "none" : "block" };

  return (
    <header className="header">
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
      <button
        disabled={showCart}
        className="shopping-cart-container"
        onClick={handleOnClick}
      >
        {children}
        <span style={style} className="number-of-products-container">
          !
        </span>
      </button>
    </header>
  );
}
