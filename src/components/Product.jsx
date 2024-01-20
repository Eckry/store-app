import "./styles/Product.css";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

export default function Product({ product, setCurrentPreview }) {
  const { addProduct } = useCart();

  function handleOnClickToViewProduct() {
    setCurrentPreview(product.id);
  }

  function handleOnClickToBuyProduct() {
    addProduct(product);
  }

  return (
    <div className="product-container">
      <img src={product.image} className="product-image" />
      <div className="product-information">
        <div className="price-and-name-container">
          <p className="product-price">{product.price}$</p>
          <p className="product-name">{product.title}</p>
        </div>
        <div className="buttons-container">
          <Link
            to={`/store-app/preview/${product.id}`}
            className="preview-button"
          >
            See preview
          </Link>
          <button className="add-button" onClick={handleOnClickToBuyProduct}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
