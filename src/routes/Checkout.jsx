import Footer from "../components/Footer";
import "./styles/Checkout.css"
import { Outlet, Link, useLocation } from "react-router-dom";
import { AddressProvider } from "../context/AddressContext";
export default function Checkout() {
  const location = useLocation();
  const {product} = location.state

  return (
    <AddressProvider>
      <header>
        <Link to={"/store-app/"}>Go to main page</Link>
        <Link state={{product}} to={"/store-app/checkout/data"}>Go to checkout</Link>
      </header>
      <main className="checkout-container">
        <Outlet />
        <article className="checkout-product">
          <img className="checkout-image" src={`../${product.image}`} alt="" />
          <p className="checkout-price">{product.price}</p>
        </article>
      </main>
      <Footer />
    </AddressProvider>
  );
}
