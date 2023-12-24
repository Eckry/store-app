import "./styles/Preview.css";
import { FaStar } from "react-icons/fa";

function getStars(rate) {
  const fullStars = Math.floor(rate);
  const decimalPart = (rate * 10) % 10;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar className="star" key={i}/>);
  }

  if (decimalPart !== 0) {
    stars.push(
      <FaStar
        className="star"
        key={decimalPart}
        style={{
          clipPath: `polygon(0 0, ${decimalPart * 10}% 0, ${
            decimalPart * 10
          }% 100%, 0 100%)`,
        }}
      />
    );
  }
  return stars;
}

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
            <p className="description">{product.description}</p>
            <p className="category">{product.category}</p>
          </div>
        </div>
      </div>
      <div className="rating-container">
        <h1>{product.price}</h1>
        <p className="rating">
          <span className="stars-container">
            {getStars(product.rating.rate)}
          </span>
          <FaStar className="gray-star"/>
          <FaStar className="gray-star"/>
          <FaStar className="gray-star"/>
          <FaStar className="gray-star"/>
          <FaStar className="gray-star"/>
        </p>
      </div>
      <button onClick={handleAddProductToShoppingCart}>ADD TO CART</button>
      <button className="return-button" onClick={handleSetCurrentPreview}>
        {"<-"}
      </button>
    </div>
  );
}
