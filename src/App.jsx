import { useEffect } from "react";
import "./App.css";
import { FaShoppingCart } from "react-icons/fa";
import Product from "./components/Product";
import PageButton from "./components/PageButton";
import useStore from "./hooks/useStore";
import Preview from "./components/Preview";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Filters from "./components/Filters";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "./constants.json";

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
  if (Object.keys(currentPreview).length)
    return (
        <Preview
          product={currentPreview}
          addProductToShoppingCart={addProductToShoppingCart}
          setCurrentPreview={setCurrentPreview}
          goPrevPreview={goPrevPreview}
          goNextPreview={goNextPreview}
          showPrev={showPrev}
          showNext={showNext}
        />
    );

  if (!filteredProducts.length) {
    return (
      <main className="container-if-no-products">
        <h1 className="empty-title">Empty</h1>
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
        {"<-"}
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
        {"->"}
      </PageButton>
    </div>
  );
}

function App() {
  const {
    currentPage,
    price,
    searchedCategories,
    filteredProducts,
    currentPreview,
    shoppingCart,
    showCart,
    productSelectedInCart,
    notification,
    showPrev,
    showNext,
    numberOfPages,
    showFilters,
    deleteFromShoppingCart,
    updateQuantity,
    setProductSelectedInCart,
    interchangeShowCart,
    addProductToShoppingCart,
    setCurrentPreview,
    setFilteredProducts,
    setPriceFilter,
    setSearchedCategories,
    setNextPage,
    setPrevPage,
    setPageNumber,
    goPrevPreview,
    goNextPreview,
    interchangeShowFilters,
  } = useStore();

  useEffect(() => {
    setFilteredProducts();
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
  }, [price, searchedCategories]);

  return (
    <>
      <Header
        shoppingCart={shoppingCart}
        onClick={interchangeShowCart}
        notification={notification}
        showCart={showCart}
        interchangeShowFilters={interchangeShowFilters}
        showFilters={showFilters}
      >
        <FaShoppingCart />
      </Header>
      <div className="bar">
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
        <CarouselButtons
          setPrevPage={setPrevPage}
          currentPage={currentPage}
          setPageNumber={setPageNumber}
          filteredProducts={filteredProducts}
          setNextPage={setNextPage}
          numberOfPages={numberOfPages}
        />
      </div>
      <Filters
        setPriceFilter={setPriceFilter}
        price={price}
        setSearchedCategories={setSearchedCategories}
        showFilters={showFilters}
        currentPreview={currentPreview}
        searchedCategories={searchedCategories}
      />
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
    </>
  );
}

export default App;
