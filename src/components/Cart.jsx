import "./styles/Cart.css";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Stars from "./Stars";
import { BiPurchaseTag } from "react-icons/bi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Cart() {
  const {
    cart,
    addProduct,
    removeProduct,
    productSelected,
    deleteProduct,
    setProductSelected,
    setNotification,
  } = useCart();

  useEffect(() => {
    setNotification(false);
  }, []);

  function handleChangeProductSelectedInCart(product) {
    setProductSelected(product);
  }

  function handleBuyProduct() {
    addProduct(productSelected);
  }

  function handleRemove() {
    removeProduct(productSelected);
  }

  function handleDelete() {
    deleteProduct(productSelected);
  }

  const onlyOnProduct = cart.length === 1;

  if (!cart.length)
    return (
      <div className="cart-container-empty">
        <MdOutlineRemoveShoppingCart />
        <h1 className="empty-title">Your cart is empty!</h1>
        <Link to="/store-app/home" className="continue-shopping-empty">
          <IoReturnUpBackOutline className="io-icon"/> Continue shopping
        </Link>
      </div>
    );
  return (
    <div className="cart-container">
      <div className="product-selected-container">
        <img
          draggable="false"
          className="product-selected-image"
          src={productSelected.image}
          alt={productSelected.title}
        />
        <div className="product-selected-information">
          <h1 className="product-selected-title">{productSelected.title}</h1>
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
      <div className="cart-buttons">
        <div className="cart-buttons-container">
          <button onClick={handleRemove} className="sell-button">
            <FaChevronLeft />
          </button>
          <p className="total">{productSelected.quantity}</p>
          <button onClick={handleBuyProduct} className="buy-button">
            <FaChevronRight />
          </button>
        </div>
        <div className="buy-and-trash-buttons">
          <Link to="/store-app/checkout/data" className="buy-product-anchor">
            <BiPurchaseTag />
          </Link>
          <button className="trash-button" onClick={handleDelete}>
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
      <div className="other-products">
        {onlyOnProduct ? (
          <span className="cart-placeholder">
            If you buy other products, they will be shown here
          </span>
        ) : (
          cart.map((product) => {
            if (product.id === productSelected.id) return;
            return (
              <img
                draggable="false"
                id={product.id}
                onClick={() => handleChangeProductSelectedInCart(product)}
                src={product.image}
                className="other-products-image"
                key={product.id}
                alt={product.title}
              />
            );
          })
        )}
      </div>
      <Link to="/store-app/home" className="continue-shopping margin-top">
        <IoReturnUpBackOutline className="io-icon"/> Continue shopping
      </Link>
    </div>
  );
}
