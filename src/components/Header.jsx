import "./styles/Header.css";

export default function Header({ children, shoppingCart, onClick }) {

  function handleOnClick(){
    onClick();
  }

  return (
    <header className="header">
      <div className="shopping-cart-container" onClick={handleOnClick}>
        {children}
        {shoppingCart.length ? <div className="number-of-products-container">
          {shoppingCart.length}
        </div> : null}
      </div>
    </header>
  );
}
