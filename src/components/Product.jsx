import "./styles/Product.css";

export default function Product({ product, setCurrentPreview, addProductToShoppingCart }) {
  function handleOnClickToViewProduct() {
    setCurrentPreview(product);
  }

  function handleOnClickToBuyProduct(){
    addProductToShoppingCart(product);
  }

  return (
    <div className="product-container" >
      <img src={product.image} className="product-image" />
      <div className="product-information">
        <div className="important-information">
          <button className="preview-button" onClick={handleOnClickToViewProduct}>WATCH</button>
          <p className="product-price">{product.price} $</p>
          <button onClick={handleOnClickToBuyProduct}>BUY</button>
        </div>
        <p className="product-name">
          {product.title.split("").slice(0, 15)}...
        </p>
      </div>
    </div>
  );
}
