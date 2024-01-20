import "./styles/Preview.css";
import Stars from "./Stars";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

export default function Preview({ preview }) {
  const { addProduct } = useCart();

  function handleAddProductToShoppingCart() {
    addProduct(preview);
  }

  const { prev, next, product } = preview;

  return (
    <>
      <div className="preview-container">
        <div className="image-and-description-container">
          <img
            className="preview-image"
            src={`../${product.image}`}
            alt="product image"
          />
          <div className="description-container">
            <h1 className="title" title={product.title}>
              {product.title}
            </h1>
            <h4 className="subtitle">Description</h4>
            <p className="description">{product.description}</p>
            <p className="category">{product.category}</p>
          </div>
        </div>
        <div className="rating-container">
          <h1 className="product-price">{product.price}$</h1>
          <Stars stars={product.rating.rate} count={product.rating.count} />
        </div>

        <button
          className="add-to-cart-button"
          onClick={handleAddProductToShoppingCart}
        >
          Add to cart
        </button>
        <Link to={"/store-app/"} className="return-button">
          <IoReturnUpBackOutline className="io-icon" />
        </Link>
      </div>
      <div className="nav-buttons-container">
        <Link
          to={`/store-app/preview/${prev?.id}`}
          className={prev ? "nav-button" : "disabled"}
        >
          <FaLongArrowAltLeft />
        </Link>
        <Link
          to={`/store-app/preview/${next?.id}`}
          className={next ? "nav-button" : "disabled"}
        >
          <FaLongArrowAltRight />
        </Link>
      </div>
    </>
  );
}
