import "./styles/Product.css";

export default function Product({ product, onClick}) {

  function handleOnClick(){
    onClick(product);
  }

  return (
    <div className="product-container" onClick={handleOnClick}>
      <img src={product.image} className="product-image" />
      <div className="product-information">
        <p className="product-price">{product.price} $</p>
        <p className="product-name">{product.title.split("").slice(0, 15)}...</p>
      </div>
    </div>
  );
}
