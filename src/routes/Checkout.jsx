import "./styles/Checkout.css";
import Warning from "../components/Warning";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { AddressProvider } from "../context/AddressContext";
import useCart from "../hooks/useCart";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { useEffect } from "react";

function CheckoutProduct({ product }) {
  const { image, title, price, quantity } = product;
  const { deleteProduct } = useCart();

  function handleOnClick() {
    deleteProduct(product);
  }

  return (
    <article className="checkout-product">
      <img className="checkout-image" src={`../${image}`} alt="" />
      <div className="checkout-information">
        <p title={title} className="checkout-title">
          {title}
        </p>
        <p className="checkout-price">
          {quantity} x ${price}
        </p>
      </div>
      <div className="checkout-products-container">
        <button onClick={handleOnClick} className="checkout-product-trash">
          <FaRegTrashAlt />
        </button>
        <a className="checkout-product-link" href="">
          <FaLink />
        </a>
      </div>
    </article>
  );
}

export default function Checkout() {
  const location = useLocation();
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart.length) navigate("/cart");
  }, [cart]);

  const isOnData = /data/.test(location.pathname);
  const isOnShipping = /shipping/.test(location.pathname);
  const isOnPayment = /payment/.test(location.pathname);

  const classNames = {
    data: isOnShipping || isOnPayment ? "checked" : "",
    shipping: isOnPayment ? "checked" : "",
  };

  let totalPrice = 0;

  cart.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });

  const onlyOnProduct = cart.length === 1;
  const cartProductStyle = onlyOnProduct
    ? { gap: "0", width: "405px", gridTemplateColumns: "1fr" }
    : { gap: "1rem", width: "unset" };

  return (
    <AddressProvider>
      <header className="checkout-header">
        <Link className="continue-shopping" to={"/"}>
          <IoReturnUpBackOutline className="io-icon" /> Continue shopping
        </Link>
        <nav className="link-wrapper">
          <Link
            className={`checkout-link ${isOnData ? "highlighted" : ""}`}
            to={"/checkout/data"}
          >
            <span className={`checkout-check ${classNames.data}`}></span>
            Information
          </Link>
          <Link
            style={{ pointerEvents: isOnData ? "none" : "all" }}
            className={`checkout-link ${isOnShipping ? "highlighted" : ""}`}
            to={"/checkout/shipping"}
          >
            <span className={`checkout-check ${classNames.shipping}`}></span>
            Confirmation
          </Link>
          <Link
            style={{ pointerEvents: isOnData ? "none" : "all" }}
            className={`checkout-link ${isOnPayment ? "highlighted" : ""}`}
            to={"/checkout/payment"}
          >
            <span className="checkout-check"></span>
            Payment
          </Link>
        </nav>
      </header>
      <Warning />
      <main className="checkout-container">
        <Outlet />
        <aside className="checkout-cart">
          <div className="checkout-cart-products" style={cartProductStyle}>
            {cart.map((product) => {
              return <CheckoutProduct key={product.id} product={product} />;
            })}
          </div>
          <p>
            Total:{" "}
            <span className="checkout-price">${totalPrice.toFixed(2)}</span>
          </p>
        </aside>
      </main>
    </AddressProvider>
  );
}
