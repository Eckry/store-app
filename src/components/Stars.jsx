import { FaStar } from "react-icons/fa";

export default function Stars({ stars, count }) {
  function getStars(rate) {
    const fullStars = Math.floor(rate);
    const decimalPart = (rate * 10) % 10;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar className="star" key={i} />);
    }

    if (decimalPart !== 0) {
      stars.push(
        <FaStar
          className="star"
          key={fullStars}
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
  return (
    <div className="rating">
      <span className="stars-container">{getStars(stars)}</span>
      <div className="gray-stars">
        <FaStar className="gray-star" />
        <FaStar className="gray-star" />
        <FaStar className="gray-star" />
        <FaStar className="gray-star" />
        <FaStar className="gray-star" />
      </div>
      <p className="rating-count">({count})</p>
    </div>
  );
}
