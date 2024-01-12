import "./styles/Cart.css";
import { MdClose, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Stars from "./Stars";
import { BiPurchaseTag } from "react-icons/bi";
import useCart from "../hooks/useCart";

export default function Cart({ interchangeShowCart }) {
  const {
    cart,
    addProduct,
    removeProduct,
    productSelected,
    deleteProduct,
    setProductSelected,
  } = useCart();

  function handleChangeProductSelectedInCart(product) {
    setProductSelected(product);
  }

  function handleBuyProduct() {
    addProduct(productSelected);
  }

  function handleRemove() {
    removeProduct(productSelected);
  }

  function handleDelete(){
    deleteProduct(productSelected)
  }

  function handleInterchangeShowCart() {
    interchangeShowCart();
  }

  if (!cart.length)
    return (
      <>
        <button className="close-button" onClick={handleInterchangeShowCart}>
          <MdClose />
        </button>
        <div className="fixed empty">
          <MdOutlineRemoveShoppingCart />
          <h1 className="empty-title">Your cart is empty!</h1>
        </div>
      </>
    );

  return (
    <>
      <button className="close-button" onClick={handleInterchangeShowCart}>
        <MdClose />
      </button>
      <div className="fixed">
        <div className="cart-container">
          <div className="product-selected-container">
            <div className="image-and-buttons-container">
              <img
                draggable="false"
                className="product-selected-image"
                src={productSelected.image}
                alt=""
              />
              <div className="cart-buttons">
                <div className="cart-buttons-container">
                  <button
                    onClick={handleRemove}
                    className="sell-button"
                  >
                    <FaChevronLeft />
                  </button>
                  <p className="total">{productSelected.quantity}</p>
                  <button onClick={handleBuyProduct} className="buy-button">
                    <FaChevronRight />
                  </button>
                </div>
                <div className="buy-and-trash-buttons">
                  <a href="" className="buy-product-anchor">
                    <BiPurchaseTag />
                  </a>
                  <button
                    className="trash-button"
                    onClick={handleDelete}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            </div>
            <div className="product-selected-information">
              <h1 className="product-selected-title">
                {productSelected.title}
              </h1>
              <div>
                <h4 className="cart-description-title">Description</h4>
                <p className="product-selected-description">
                  {productSelected.description}
                </p>
                <p className="category">{productSelected.category}</p>
              </div>
              <div className="cart-rating">
                <p className="cart-price">{productSelected.price}$</p>
                <Stars
                  stars={productSelected.rating.rate}
                  count={productSelected.rating.count}
                />
              </div>
            </div>
          </div>
          <div className="other-products">
            {cart.map((product) => {
              return (
                <img
                  draggable="false"
                  id={product.id}
                  onClick={() => handleChangeProductSelectedInCart(product)}
                  src={product.image}
                  className="other-products-image"
                  key={product.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
