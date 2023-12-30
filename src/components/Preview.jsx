import "./styles/Preview.css";
import Stars from "./Stars";

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
    <div className="preview-container">
      <div className="image-description-container">
        <div className="image-container">
          <button disabled={!showPrev} onClick={handleGoPrevPreview}>
            PREV
          </button>
          <img
            className="preview-image"
            src={product.image}
            alt="product image"
          />
          <button disabled={!showNext} onClick={handleGoNextPreview}>
            NEXT
          </button>
        </div>
        <div className="description-container">
          <div className="title-container">
            <h1 className="title">{product.title}</h1>
            <h4 className="subtitle">Description</h4>
            <p className="description">{product.description}</p>
            <p className="category">{product.category}</p>
          </div>
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
        ADD TO CART
      </button>
      <button className="return-button" onClick={handleSetCurrentPreview}>
        {"<-"}
      </button>
    </div>
  );
}
