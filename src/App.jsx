import { useState } from "react";
import "./App.css";
import { ShoppingCartIcon } from "./Components/Icons";
import { Product } from "./components/Product";
import { useEffect } from "react";
import CheckBox from "./components/CheckBox";
import RangeInput from "./components/RangeInput";
import products from "./products.json";
import categories from "./categories.json";

let searchedCategories = {};
categories.forEach((category) => {
  searchedCategories[category] = true;
});

function App() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [filteredProducts, setFilteredProducts] = useState(products);

  function handleOnChange(event) {
    let counter = 0
    Object.keys(searchedCategories).map((category) => {
      if (category === event.target.value) {
        searchedCategories[category] = !searchedCategories[category];
      }
      if(searchedCategories[category]) counter++
    });
    if(counter != 4) setFilteredProducts(products.filter((product) => !searchedCategories[product.category]))
    if(counter === 4) setFilteredProducts(products)
  }

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
          <RangeInput id="min" />
          <RangeInput id="max" />
        </div>
        <h3 className="filters-title">Category</h3>
        <div className="checkboxes-container">
          {Object.keys(searchedCategories).map((category) => (
            <CheckBox
              category={category}
              onChange={handleOnChange}
              categories={categories}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
