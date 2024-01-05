import "./styles/Preview.css";
import Stars from "./Stars";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";

export default function Preview({
  product,
  addProductToShoppingCart,
  setCurrentPreview,
  goPrevPreview,
  goNextPreview,
  showPrev,
  showNext,
}) {
  function handleAddProductToShoppingCart() {
    addProductToShoppingCart(product);
  }

  function handleSetCurrentPreview() {
    setCurrentPreview({});
  }

  function handleGoPrevPreview() {
    goPrevPreview(product);
  }

  function handleGoNextPreview() {
    goNextPreview(product);
  }

  return (
    <>
      <div className="preview-container">
        <div className="image-and-description-container">
          <img
            className="preview-image"
            src={product.image}
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
        <button className="return-button" onClick={handleSetCurrentPreview}>
          <IoReturnUpBackOutline className="io-icon" />
        </button>
      </div>
      <div className="nav-buttons-container">
        <button
          className={`nav-button${!showPrev ? " disabled" : ""}`}
          disabled={!showPrev}
          onClick={handleGoPrevPreview}
        >
          <FaLongArrowAltLeft />
        </button>
        <button
          className={`nav-button${!showNext ? " disabled" : ""}`}
          disabled={!showNext}
          onClick={handleGoNextPreview}
        >
          <FaLongArrowAltRight />
        </button>
      </div>
    </>
  );
}
