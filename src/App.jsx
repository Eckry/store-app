import { useEffect, useState } from "react";
import "./App.css";
import ShoppingCartIcon from "./components/Icons";
import Product from "./components/Product";
import CheckBox from "./components/CheckBox";
import RangeInput from "./components/RangeInput";
import PageButton from "./components/PageButton";
import CarouselItem from "./components/CarouselItem";
import useFilters from "./hooks/useFilters";

function App() {
  const {
    currentPage,
    price,
    searchedCategories,
    filteredProducts,
    setFilteredProducts,
    setPriceFilter,
    setSearchedCategories,
    setNextPage,
    setPrevPage,
    setPageNumber,
  } = useFilters();

  useEffect(() => {
    setFilteredProducts();
  }, [price, searchedCategories]);

  return (
    <>
      <header className="header">
        <ShoppingCartIcon />
      </header>
      <div className="bar">
        <main className="container">
          {filteredProducts.map((products, idx) => (
            <CarouselItem key={idx} currentPage={currentPage}>
              {products.map((product) => (
                <Product
                  key={product.id}
                  name={product.title}
                  link={product.image}
                  price={product.price}
                />
              ))}
            </CarouselItem>
          ))}
        </main>
        <div className="carousel-buttons">
          <PageButton onClick={setPrevPage} value={""}>
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
          <PageButton onClick={setNextPage} value={""}>
            {"->"}
          </PageButton>
        </div>
      </div>
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
      </div>{" "}
    </>
  );
}

export default App;
