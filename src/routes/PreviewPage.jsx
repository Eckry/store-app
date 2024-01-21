import "./styles/Preview.css";
import { useParams } from "react-router-dom";
import useFilters from "../hooks/useFilters";
import useCart from "../hooks/useCart";
import Stars from "../components/Stars";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";

export default function PreviewPage() {
  const { filteredProducts } = useFilters();
  const { addProduct } = useCart();
  const { id } = useParams();

  const previewIndex = filteredProducts.findIndex(
    (product) => product.id === Number(id)
  );

  let prev = filteredProducts[previewIndex - 1];
  let next = filteredProducts[previewIndex + 1];
  const product = filteredProducts[previewIndex];

  function handleAddProductToShoppingCart() {
    addProduct(product);
  }
  return (
    <>
      <header className="preview-header">
        <Link to={"/store-app/home"} className="continue-shopping">
          <IoReturnUpBackOutline className="io-icon" /> Continue shopping
        </Link>
      </header>
      <div className="preview-container">
        <div className="image-and-description-container">
          <img
            className="preview-image"
            src={`../${product.image}`}
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
          <h1 className="product-price">${product.price}</h1>
          <Stars stars={product.rating.rate} count={product.rating.count} />
        </div>

        <button
          className="add-to-cart-button"
          onClick={handleAddProductToShoppingCart}
        >
          Add to cart
        </button>
      </div>
      <div className="nav-buttons-container">
        <Link
          to={`/store-app/preview/${prev?.id}`}
          className={prev ? "nav-button" : "disabled"}
        >
          <FaLongArrowAltLeft />
        </Link>
        <Link
          to={`/store-app/preview/${next?.id}`}
          className={next ? "nav-button" : "disabled"}
        >
          <FaLongArrowAltRight />
        </Link>
      </div>
    </>
  );
}
