import "./styles/Product.css";
import useCart from "../hooks/useCart.js";
import { Link } from "react-router-dom";
import Image from "./Image.jsx";

export default function Product({ product }) {
  const { addProduct } = useCart();

  function handleOnClickToBuyProduct() {
    addProduct(product);
  }

  return (
    <article className="product-container">
      <Image image={product.image} alt={product.title} />
      <section className="product-information">
        <div className="price-and-name-container">
          <p className="product-price">${product.price}</p>
          <p className="product-name">{product.title}</p>
        </div>
        <div className="buttons-container">
          <Link to={`/preview/?id=${product.id}`} className="product-button">
            See preview
          </Link>
          <button
            className="product-button"
            onClick={handleOnClickToBuyProduct}
          >
            Add to cart
          </button>
        </div>
      </section>
    </article>
  );
}
