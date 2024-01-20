import "../App.css";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "../constants.json";
import { FaRegFaceSadCry } from "react-icons/fa6";
import Product from "../components/Product";
import useStore from "../hooks/useStore";
import Preview from "../components/Preview";
import Header from "../components/Header";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import CarouselButtons from "../components/CarouselButtons";
import useFilters from "../hooks/useFilters";
import usePreview from "../hooks/usePreview";

function MainContent({ currentPage, setCurrentPreview }) {
  const { filteredProducts } = useFilters();

  if (!filteredProducts.length) {
    return (
      <main className="container-if-no-products">
        <FaRegFaceSadCry />
        <h1 className="empty-title">We don't have that yet</h1>
      </main>
    );
  }

  return (
    <main className="container">
      {filteredProducts
        .slice(
          NUMBER_OF_PRODUCTS_PER_PAGE * currentPage,
          NUMBER_OF_PRODUCTS_PER_PAGE * (currentPage + 1)
        )
        .map((product) => (
          <Product
            key={product.id}
            product={product}
            setCurrentPreview={setCurrentPreview}
          />
        ))}
    </main>
  );
}

export default function Root() {
  const { currentPage, showCart, interchangeShowCart, setCurrentPage } =
    useStore();

  const { filteredProducts } = useFilters();
  const { preview, setCurrentPreview } = usePreview(filteredProducts);

  const isPreviewClosed = preview.product === undefined;
  return (
    <>
      <Header interchangeShowCart={interchangeShowCart} showCart={showCart} />
      {isPreviewClosed ? (
        <MainContent
          currentPage={currentPage}
          setCurrentPreview={setCurrentPreview}
        />
      ) : (
        <Preview preview={preview} setCurrentPreview={setCurrentPreview} />
      )}
      {isPreviewClosed && (
        <CarouselButtons
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      <Footer />
    </>
  );
}
