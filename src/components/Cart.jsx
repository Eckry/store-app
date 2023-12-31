import "./styles/Cart.css";
import { ShoppingCartIconRed } from "./Icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Stars from "./Stars";

export default function Cart({
  products,
  productSelectedInCart,
  setProductSelectedInCart,
  updateQuantity,
  deleteFromShoppingCart,
  interchangeShowCart,
}) {
  function handleChangeProductSelectedInCart(e) {
    const productId = e.target.id;
    const newProductSelectedInCart = products.find(
      (product) => product.id === parseInt(productId)
    );
    setProductSelectedInCart(newProductSelectedInCart);
  }

  function handleAddOneToQuantity() {
    updateQuantity({ product: productSelectedInCart, number: 1 });
  }

  function handleRemoveOneToQuantity() {
    updateQuantity({ product: productSelectedInCart, number: -1 });
  }

  function handleDeleteFromShoppingCart() {
    deleteFromShoppingCart();
  }

  function handleInterchangeShowCart() {
    interchangeShowCart();
  }
  if (!products.length)
    return (
      <div className="fixed empty">
        <button className="close-button" onClick={handleInterchangeShowCart}>
          <ShoppingCartIconRed />
        </button>
        <h1 className="empty-title">Empty</h1>
      </div>
    );

  return (
    <div className="fixed">
      <button className="close-button" onClick={handleInterchangeShowCart}>
        <ShoppingCartIconRed />
      </button>
      <div className="product-selected-container">
        <div className="image-and-buttons-container">
          <img
            draggable="false"
            className="product-selected-image"
            src={productSelectedInCart.image}
            alt=""
          />
          <div className="cart-buttons">
            <div className="cart-buttons-container">
              <button
                onClick={handleRemoveOneToQuantity}
                className="sell-button"
              >
                <FaChevronLeft />
              </button>
              <p className="total">{productSelectedInCart.quantity}</p>
              <button onClick={handleAddOneToQuantity} className="buy-button">
                <FaChevronRight />
              </button>
            </div>
            <button
              className="trash-button"
              onClick={handleDeleteFromShoppingCart}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        </div>
        <h1 className="product-selected-title">
          {productSelectedInCart.title}
        </h1>
        <div className="product-selected-information">
          <h4 className="cart-description">Description</h4>
          <p className="product-selected-description">
            {productSelectedInCart.description}
          </p>
          <p className="category">{productSelectedInCart.category}</p>
          <div className="rating-container cart-rating">
            <p className="cart-price">{productSelectedInCart.price}$</p>
            <Stars
              stars={productSelectedInCart.rating.rate}
              count={productSelectedInCart.rating.count}
            />
          </div>
        </div>
      </div>

      <div className="other-products">
        {products.map((product) => {
          return (
            <img
              draggable="false"
              id={product.id}
              onClick={(e) => handleChangeProductSelectedInCart(e)}
              src={product.image}
              className="other-products-image"
              key={product.id}
            />
          );
        })}
      </div>
    </div>
  );
}
