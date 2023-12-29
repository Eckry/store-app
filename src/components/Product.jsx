import "./styles/Product.css";

export default function Product({
  product,
  setCurrentPreview,
  addProductToShoppingCart,
}) {
  function handleOnClickToViewProduct() {
    setCurrentPreview(product);
  }

  function handleOnClickToBuyProduct() {
    addProductToShoppingCart(product);
  }

  return (
    <div className="product-container">
      <img src={product.image} className="product-image" />
      <div className="product-information">
        <div className="price-and-name-container">
          <p className="product-price">{product.price}$</p>
          <p className="product-name">
            {product.title}
          </p>
        </div>
        <div className="buttons-container">
          <button
            className="preview-button"
            onClick={handleOnClickToViewProduct}
          >
            SEE PREVIEW
          </button>
          <button className="add-button" onClick={handleOnClickToBuyProduct}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
