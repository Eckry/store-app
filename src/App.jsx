import "./App.css";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "./constants.json";
import { useEffect } from "react";
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

function MainContent({
  currentPreview,
  addProductToShoppingCart,
  setCurrentPreview,
  goPrevPreview,
  goNextPreview,
  showPrev,
  showNext,
  filteredProducts,
  currentPage,
}) {
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
            addProductToShoppingCart={addProductToShoppingCart}
          />
        ))}
    </main>
  );
}

function CarouselButtons({
  setPrevPage,
  currentPage,
  setPageNumber,
  setNextPage,
  numberOfPages,
}) {
  if (numberOfPages <= 0) {
    return;
  }

  return (
    <div className="carousel-buttons">
      <PageButton onClick={setPrevPage} value="">
        <FaCaretLeft />
      </PageButton>
      {Array(numberOfPages)
        .fill(0)
        .map((_, idx) => (
          <PageButton
            onClick={setPageNumber}
            currentPage={currentPage}
            value={idx}
            key={idx}
          >
            {idx + 1}
          </PageButton>
        ))}
      <PageButton onClick={setNextPage} value="">
        <FaCaretRight />
      </PageButton>
    </div>
  );
}

function App() {
  const {
    currentPage,
    currentPreview,
    shoppingCart,
    showCart,
    productSelectedInCart,
    notification,
    showPrev,
    showNext,
    numberOfPages,
    showFilters,
    setFilteredProducts,
    deleteFromShoppingCart,
    updateQuantity,
    setProductSelectedInCart,
    interchangeShowCart,
    addProductToShoppingCart,
    setCurrentPreview,
    setNextPage,
    setPrevPage,
    setPageNumber,
    goPrevPreview,
    goNextPreview,
    interchangeShowFilters,
  } = useStore();

  useEffect(() => {
    function handleKeyPress(e) {
      switch (e.key) {
        case "ArrowLeft":
          setPrevPage();
          break;
        case "ArrowRight":
          setNextPage();
          break;
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const isPreviewClosed = Object.keys(currentPreview).length === 0;

  const { getFilteredProducts } = useFilters();
  const filteredProducts = getFilteredProducts();

  return (
    <>
      <Header
        interchangeShowCart={interchangeShowCart}
        notification={notification}
        showCart={showCart}
        interchangeShowFilters={interchangeShowFilters}
        currentPreview={currentPreview}
        showFilters={showFilters}
      />
      {isPreviewClosed ? (
        <MainContent
          currentPreview={currentPreview}
          addProductToShoppingCart={addProductToShoppingCart}
          setCurrentPreview={setCurrentPreview}
          goPrevPreview={goPrevPreview}
          goNextPreview={goNextPreview}
          showPrev={showPrev}
          showNext={showNext}
          filteredProducts={filteredProducts}
          currentPage={currentPage}
        />
      ) : (
        <Preview
          product={currentPreview}
          addProductToShoppingCart={addProductToShoppingCart}
          setCurrentPreview={setCurrentPreview}
          goPrevPreview={goPrevPreview}
          goNextPreview={goNextPreview}
          showPrev={showPrev}
          showNext={showNext}
        />
      )}
      {isPreviewClosed && (
        <CarouselButtons
          setPrevPage={setPrevPage}
          setNextPage={setNextPage}
          currentPage={currentPage}
          setPageNumber={setPageNumber}
          numberOfPages={numberOfPages}
        />
      )}
      {showCart ? (
        <Cart
          deleteFromShoppingCart={deleteFromShoppingCart}
          updateQuantity={updateQuantity}
          setProductSelectedInCart={setProductSelectedInCart}
          products={shoppingCart}
          productSelectedInCart={productSelectedInCart}
          interchangeShowCart={interchangeShowCart}
        />
      ) : null}
      <Footer />
    </>
  );
}

export default App;
