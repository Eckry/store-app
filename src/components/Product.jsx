import "./styles/Product.css";
import { Link } from "react-router-dom";
import Image from "./Image.jsx";

export default function Product({ product, addProduct }) {

  function handleOnClickToBuyProduct() {
    addProduct(product);
  }

  return (
    <article className="product-container">
      <Image
        image={product.image}
        alt={product.title}
        className="product-image"
        route="productImage"
      />
      <section className="product-information">
        <div className="price-and-name-container">
          <p className="product-price">${product.price}</p>
          <p className="product-name" title={product.title} >{product.title}</p>
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
