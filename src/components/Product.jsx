import "./styles/Product.css";

export const Product = ({ name, price, link }) => {
  return (
    <div className="product-container">
      <img src={link} className="product-image" />
      <div className="product-information">
        <p className="product-price">{price} $</p>
        <p className="product-name">{name.split("").slice(0, 15)}...</p>
      </div>
    </div>
  );
};
