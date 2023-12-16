import "./styles/Header.css";

export default function Header({ children, shoppingCart, onClick, notification, showCart }) {

  function handleOnClick(){
    onClick();
  }

  const style = { display: notification ? "flex" : "none"}

  return (
    <header className="header">
      <button className="shopping-cart-container" onClick={handleOnClick}>
        {children}
        {shoppingCart.length ? <span style={style} className="number-of-products-container">
          !
        </span> : null}
      </button>
    </header>
  );
}
