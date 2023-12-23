import "./styles/Cart.css";

export default function Cart({
  products,
  productSelectedInCart,
  setProductSelectedInCart,
  updateQuantity,
  deleteFromShoppingCart,
}) {
  function handleChangeProductSelectedInCart(productId) {
    const newProductSelectedInCart = products.find(
      (product) => product.id === parseInt(productId)
    );
    setProductSelectedInCart(newProductSelectedInCart);
  }

  function handleAddOneToQuantity (){
    updateQuantity({product: productSelectedInCart, number: 1})
  }

  function handleRemoveOneToQuantity(){
    updateQuantity({product: productSelectedInCart, number: -1});
  }

  function handleDeleteFromShoppingCart(){
    deleteFromShoppingCart();
  }
  if (!products.length)
    return (
      <div className="cart-container empty">
        <h1 className="empty-title">Empty</h1>
      </div>
    );
    
  return (
    <div className="cart-container">
      <div className="product-selected-container">
        <img
          className="product-selected-image"
          src={productSelectedInCart.image}
          alt=""
        />
        <div>
          <h1>{productSelectedInCart.title}</h1>
          <p>{productSelectedInCart.description}</p>
          <p>{productSelectedInCart.category}</p>
          <div>
            <p>{productSelectedInCart.price}</p>
            <p>{productSelectedInCart.rate}</p>
            <button onClick={handleRemoveOneToQuantity} className="sell-button">-</button>
            <p>total: {productSelectedInCart.quantity}</p>
            <button onClick={handleAddOneToQuantity} className="buy-button">+</button>
            <button onClick={handleDeleteFromShoppingCart}>TRASH</button>
          </div>
        </div>
      </div>
      <div>
        {products.map((product) => {
          return (
            <img
              id={product.id}
              onClick={(e) => handleChangeProductSelectedInCart(e.target.id)}
              src={product.image}
              className="other-products-image"
              key={product.id}
            />
          );
        })}
      </div>
    </div>
  );
}
