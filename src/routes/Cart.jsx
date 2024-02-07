import "./styles/Cart.css";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Stars from "../components/Stars";
import { BiPurchaseTag } from "react-icons/bi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import useCart from "../hooks/useCart.js";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Image from "../components/Image.jsx";

export default function Cart() {
  const {
    cart,
    addProduct,
    removeProduct,
    productSelected,
    deleteProduct,
    selectProduct,
    setNotification,
  } = useCart();

  useEffect(() => {
    setNotification(false);
  }, []);

  function handleChangeProductSelectedInCart(product) {
    selectProduct(product);
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
        <Link to="/" className="continue-shopping-empty">
          <IoReturnUpBackOutline className="io-icon" /> Continue shopping
        </Link>
      </div>
    );
  return (
    <main className="cart-container">
      <article className="product-selected-container">
        <Image
          image={productSelected.image}
          alt={productSelected.title}
          className="product-selected-image"
          route="cartImage"
        />
        <section className="product-selected-information">
          <h1 className="product-selected-title">{productSelected.title}</h1>
          <section>
            <h2 className="cart-description-title">Description</h2>
            <p className="product-selected-description">
              {productSelected.description}
            </p>
            <p className="category">{productSelected.category}</p>
          </section>
          <section className="cart-rating">
            <p className="cart-price">{productSelected.price}$</p>
            <Stars
              stars={productSelected.rating.rate}
              count={productSelected.rating.count}
            />
          </section>
        </section>
      </article>
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
          <Link
            title="Buy cart"
            to="/checkout/data"
            className="buy-product-anchor"
          >
            <BiPurchaseTag />
          </Link>
          <button
            title="Remove product from cart"
            className="trash-button"
            onClick={handleDelete}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
      <section className="other-products">
        {onlyOnProduct ? (
          <p className="cart-placeholder">
            If you buy other products, they will be shown here
          </p>
        ) : (
          cart.map((product) => {
            if (product.id === productSelected.id) return;
            return (
              <Image
                route="otherImage"
                image={product.image}
                alt={product.title}
                key={product.id}
                className="other-products-image"
                onClick={() => handleChangeProductSelectedInCart(product)}
              />
            );
          })
        )}
      </section>
      <Link to="/" className="continue-shopping margin-top">
        <IoReturnUpBackOutline className="io-icon" /> Continue shopping
      </Link>
    </main>
  );
}
