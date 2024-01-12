import "./App.css";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "./constants.json";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import { FaRegFaceSadCry } from "react-icons/fa6";
import Product from "./components/Product";
import PageButton from "./components/PageButton";
import useStore from "./hooks/useStore";
import Preview from "./components/Preview";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import useFilters from "./hooks/useFilters";
import usePreview from "./hooks/usePreview";
import useCart from "./hooks/useCart";

function MainContent({ currentPage, setCurrentPreview }) {
  const { addProduct } = useCart();
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
            addProduct={addProduct}
          />
        ))}
    </main>
  );
}

function CarouselButtons({ currentPage, setCurrentPage }) {
  const { filteredProducts } = useFilters();

  const numberOfPages = Math.ceil(
    filteredProducts.length / NUMBER_OF_PRODUCTS_PER_PAGE
  );
  if (numberOfPages <= 0) {
    return;
  }

  return (
    <div className="carousel-buttons">
      <PageButton
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        value="prev"
      >
        <FaCaretLeft />
      </PageButton>
      {Array.from({ length: numberOfPages }).map((_, idx) => (
        <PageButton
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          value={idx}
          key={idx}
        >
          {idx + 1}
        </PageButton>
      ))}
      <PageButton
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        value="next"
      >
        <FaCaretRight />
      </PageButton>
    </div>
  );
}

function App() {
  const {
    currentPage,
    showCart,
    showFilters,
    interchangeShowCart,
    setCurrentPage,
    interchangeShowFilters,
  } = useStore();

  const { filteredProducts } = useFilters();
  const { preview, setCurrentPreview } = usePreview(filteredProducts);

  const isPreviewClosed = preview.product === undefined;
  return (
    <>
      <Header
        interchangeShowCart={interchangeShowCart}
        showCart={showCart}
        interchangeShowFilters={interchangeShowFilters}
        showFilters={showFilters}
      />
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
      {showCart && <Cart interchangeShowCart={interchangeShowCart} />}
      <Footer />
    </>
  );
}

export default App;
