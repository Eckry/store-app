import Footer from "../components/Footer";
import "./styles/Checkout.css";
import { Outlet, Link } from "react-router-dom";
import { AddressProvider } from "../context/AddressContext";
import useCart from "../hooks/useCart";

function CheckoutProduct({ image, title, price, quantity }) {
  return (
    <article className="checkout-product">
      <img className="checkout-image" src={`../${image}`} alt="" />
      <div className="checkout-information">
        <p className="checkout-title">{title}</p>
        <p className="checkout-price">
          {quantity} x ${price}
        </p>
      </div>
    </article>
  );
}

export default function Checkout() {
  const { cart } = useCart();

  let totalPrice = 0;

  cart.forEach((product) => {
    totalPrice += product.price;
  });

  return (
    <AddressProvider>
      <header>
        <Link to={"/store-app/"}>Go to main page</Link>
        <Link state={{ cart }} to={"/store-app/checkout/data"}>
          Go to checkout
        </Link>
      </header>
      <main className="checkout-container">
        <Outlet />
        <section className="checkout-cart">
          {cart.map((product) => {
            return <CheckoutProduct key={product.id} {...product} />;
          })}
          <p>{totalPrice.toFixed(2)}</p>
        </section>
      </main>
      <Footer />
    </AddressProvider>
  );
}
