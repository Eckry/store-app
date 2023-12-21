import { useEffect } from "react";
import "./App.css";
import { ShoppingCartIcon, ShoppingCartIconRed } from "./components/Icons";
import Product from "./components/Product";
import CheckBox from "./components/CheckBox";
import RangeInput from "./components/RangeInput";
import PageButton from "./components/PageButton";
import CarouselItem from "./components/CarouselItem";
import useStore from "./hooks/useStore";
import Preview from "./components/Preview";
import Header from "./components/Header";
import Cart from "./components/Cart";

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

  return (
    <main className="container">
      {filteredProducts.length ? (
        filteredProducts.map((products, idx) => (
          <CarouselItem key={idx} currentPage={currentPage}>
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                setCurrentPreview={setCurrentPreview}
                addProductToShoppingCart={addProductToShoppingCart}
              />
            ))}
          </CarouselItem>
        ))
      ) : (
        <div className="container-if-no-products">
          <h1 className="empty-title">Empty</h1>
        </div>
      )}
    </main>
  );
}

function CarouselButtons({
  setPrevPage,
  currentPage,
  setPageNumber,
  filteredProducts,
  setNextPage,
}) {
  return (
    <div className="carousel-buttons">
      <PageButton onClick={setPrevPage} value="">
        {"<-"}
      </PageButton>
      {filteredProducts.map((_, idx) => (
        <PageButton
          value={idx}
          currentPage={currentPage}
          onClick={setPageNumber}
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
  searchedCategories,
  setSearchedCategories,
}) {
  return (
    <div className="filters">
      <h3 className="filters-title">Price range</h3>
      <div className="price-range-container">
        <RangeInput onChange={setPriceFilter} price={price} />
      </div>
      <h3 className="filters-title">Category</h3>
      <div className="checkboxes-container">
        {Object.keys(searchedCategories).map((category) => (
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
        />
      </div>
      <Filters
        setPriceFilter={setPriceFilter}
        price={price}
        searchedCategories={searchedCategories}
        setSearchedCategories={setSearchedCategories}
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
