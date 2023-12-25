import { useEffect } from "react";
import "./App.css";
import { ShoppingCartIcon, ShoppingCartIconRed } from "./components/Icons";
import Product from "./components/Product";
import CheckBox from "./components/CheckBox";
import RangeInput from "./components/RangeInput";
import PageButton from "./components/PageButton";
import useStore from "./hooks/useStore";
import Preview from "./components/Preview";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { NUMBER_OF_PRODUCTS_PER_PAGE } from "./constants.json";
import categories from "./categories.json";

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

function Filters({
  setPriceFilter,
  price,
  setSearchedCategories,
  showFilters
}) {

  return (
    <div className={showFilters ? "filters" : "hide-filters"}>
      <h3 className="filters-title">Price range</h3>
      <div className="price-range-container">
        <RangeInput onChange={setPriceFilter} price={price} />
      </div>
      <h3 className="filters-title">Category</h3>
      <div className="checkboxes-container">
        {categories.map((category) => (
          <CheckBox
            category={category}
            setSearchedCategories={setSearchedCategories}
            key={category}
          />
        ))}
      </div>
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
    interchangeShowFilters
  } = useStore();

  useEffect(() => {
    setFilteredProducts();
  }, [price, searchedCategories]);

  return (
    <>
      <Header
        shoppingCart={shoppingCart}
        onClick={interchangeShowCart}
        notification={notification}
        showCart={showCart}
        interchangeShowFilters={interchangeShowFilters}
      >
        {showCart ? <ShoppingCartIconRed /> : <ShoppingCartIcon />}
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
      />
      {showCart ? (
        <Cart
          deleteFromShoppingCart={deleteFromShoppingCart}
          updateQuantity={updateQuantity}
          setProductSelectedInCart={setProductSelectedInCart}
          products={shoppingCart}
          productSelectedInCart={productSelectedInCart}
        />
      ) : null}
    </>
  );
}

export default App;
