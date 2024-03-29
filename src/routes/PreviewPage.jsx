import "./styles/Preview.css";
import useFilters from "../hooks/useFilters.js";
import useCart from "../hooks/useCart.js";
import Stars from "../components/Stars";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import Image from "../components/Image.jsx";

export default function PreviewPage() {
  const { filteredProducts } = useFilters();
  const { addProduct } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");

  const previewIndex = filteredProducts.findIndex(
    (product) => product.id === Number(id)
  );

  let prev = filteredProducts[previewIndex - 1];
  let next = filteredProducts[previewIndex + 1];
  const product = filteredProducts[previewIndex];

  function handleAddProductToShoppingCart() {
    addProduct(product);
  }

  function handleGoPrevPreview() {
    setSearchParams({ id: prev.id });
  }

  function handleGoNextPreview() {
    setSearchParams({ id: next.id });
  }

  return (
    <>
      <header className="preview-header">
        <Link to={"/"} className="continue-shopping">
          <IoReturnUpBackOutline className="io-icon" /> Continue shopping
        </Link>
      </header>
      <article className="preview-container">
        <section className="image-and-description-container">
          <Image
            image={product.image}
            alt={product.title}
            className="preview-image"
            route="previewImage"
          />
          <div className="description-container">
            <h1 className="title" title={product.title}>
              {product.title}
            </h1>
            <h2 className="subtitle">Description</h2>
            <p className="description">{product.description}</p>
            <p className="category">{product.category}</p>
          </div>
        </section>
        <section className="rating-container">
          <h1 className="product-price">${product.price}</h1>
          <Stars stars={product.rating.rate} count={product.rating.count} />
        </section>

        <button
          className="add-to-cart-button"
          onClick={handleAddProductToShoppingCart}
        >
          Add to cart
        </button>
      </article>
      <nav className="nav-buttons-container">
        <button
          onClick={handleGoPrevPreview}
          aria-label="prev"
          className={prev ? "nav-button" : "disabled"}
        >
          <FaLongArrowAltLeft />
        </button>
        <button
          aria-label="next"
          onClick={handleGoNextPreview}
          className={next ? "nav-button" : "disabled"}
        >
          <FaLongArrowAltRight />
        </button>
      </nav>
    </>
  );
}
