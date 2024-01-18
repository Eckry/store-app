import Footer from "../components/Footer";
import "./styles/Checkout.css";
import { Outlet, Link, useLocation } from "react-router-dom";
import { AddressProvider } from "../context/AddressContext";
import useCart from "../hooks/useCart";
import { FaLongArrowAltLeft } from "react-icons/fa";

function CheckoutProduct({ image, title, price, quantity }) {
  return (
    <article className="checkout-product">
      <img className="checkout-image" src={`../${image}`} alt="" />
      <div className="checkout-information">
        <p title={title} className="checkout-title">{title}</p>
        <p className="checkout-price">
          {quantity} x ${price}
        </p>
      </div>
    </article>
  );
}

export default function Checkout() {
  const location = useLocation();
  const { cart } = useCart();

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

  return (
    <AddressProvider>
      <header>
        <Link className="continue-shopping" to={"/store-app/"}>
          <FaLongArrowAltLeft /> Continue shopping
        </Link>
        <div className="link-wrapper">
          <Link
            className={`checkout-link ${isOnData ? "highlighted" : ""}`}
            to={"/store-app/checkout/data"}
          >
            <span className={`checkout-check ${classNames.data}`}></span>
            Information
          </Link>
          <Link
            style={{ pointerEvents: isOnData ? "none" : "all" }}
            className={`checkout-link ${isOnShipping ? "highlighted" : ""}`}
            to={"/store-app/checkout/shipping"}
          >
            <span className={`checkout-check ${classNames.shipping}`}></span>
            Confirmation
          </Link>
          <Link
            style={{ pointerEvents: isOnData ? "none" : "all" }}
            className={`checkout-link ${isOnPayment ? "highlighted" : ""}`}
            to={"/store-app/checkout/payment"}
          >
            <span className="checkout-check"></span>
            Payment
          </Link>
        </div>
      </header>
      <main className="checkout-container">
        <Outlet />
        <section className="checkout-cart">
          <div className="checkout-cart-products">
            {cart.map((product) => {
              return <CheckoutProduct key={product.id} {...product} />;
            })}
          </div>
          <p className="checkout-total-price">
            Total price: <span className="checkout-price">${totalPrice.toFixed(2)}</span>
          </p>
        </section>
      </main>
      <Footer />
    </AddressProvider>
  );
}
