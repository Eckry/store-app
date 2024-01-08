import "./styles/Header.css";

export default function Header({
  children,
  onClick,
  notification,
  interchangeShowFilters,
  showCart,
  currentPreview,
  setFilteredProducts
}) {
  function handleOnClick() {
    onClick();
  }

  function handleSubmit(event){
    event.preventDefault();
    const query = event.target.elements.word.value
    if(query === "") return;
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
        {children}
        <span style={style} className="number-of-products-container">
          !
        </span>
      </button>
      <form onSubmit={handleSubmit} action="submit">
        <input className="text-filter" name="word" type="text" />
        <button className="text-filter-button" type="submit"></button>
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
