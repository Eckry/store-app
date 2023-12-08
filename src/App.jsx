import { useState } from "react";
import "./App.css";
import { ShoppingCartIcon } from "./Components/Icons";
import { Product } from "./components/Product";
import CheckBox from "./components/CheckBox";
import RangeInput from "./components/RangeInput";
import products from "./products.json";
import categories from "./categories.json";

let categoriesMap = {};
categories.forEach((category) => {
  categoriesMap[category] = true;
});

function App() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchedCategories, setSearchedCategories] = useState(categoriesMap);

  return (
    <>
      <header className="header">
        <ShoppingCartIcon />
      </header>
      <main className="container">
        <div className="grid">
          {filteredProducts.map((product) => (
            <Product
              key={product.id}
              name={product.title}
              link={product.image}
              price={product.price}
            />
          ))}
        </div>
      </main>
      <div className="filters">
        <h3 className="filters-title">Price range</h3>
        <div className="price-range-container">
          <RangeInput
            id="min"
            value={minPrice}
            onChange={setMinPrice}
            setFilteredProducts={setFilteredProducts}
          />
          <RangeInput
            id="max"
            value={maxPrice}
            onChange={setMaxPrice}
            setFilteredProducts={setFilteredProducts}
          />
        </div>
        <h3 className="filters-title">Category</h3>
        <div className="checkboxes-container">
          {Object.keys(searchedCategories).map((category) => (
            <CheckBox
              category={category}
              setFilteredProducts={setFilteredProducts}
              setSearchedCategories={setSearchedCategories}
              searchedCategories={searchedCategories}
              categories={categories}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
