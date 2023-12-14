import "./styles/Cart.css";

export default function Cart({ products }) {
  return (
    <div className="cart-container">
      <div>
        <img src="" alt="" />
        <div>
          <h1></h1>
          <p></p>
          <p></p>
          <div>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
      <div>
        {products.map((product) => {
          return <img src={product.image} className="other-products-image" />;
        })}
      </div>
    </div>
  );
}
